import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageDir = path.join(root, "public/images/blog");
const allowLossy = process.env.IMAGE_COMPRESS_LOSSY === "1";
const supportedExtensions = new Set(allowLossy ? [".avif", ".jpeg", ".jpg", ".png", ".webp"] : [".png"]);
const concurrency = Number(process.env.IMAGE_COMPRESS_CONCURRENCY ?? 4);
const minSavingsBytes = Number(process.env.IMAGE_COMPRESS_MIN_SAVINGS_BYTES ?? 4096);
const jpegQuality = Number(process.env.IMAGE_COMPRESS_JPEG_QUALITY ?? 82);
const webpQuality = Number(process.env.IMAGE_COMPRESS_WEBP_QUALITY ?? 82);
const avifQuality = Number(process.env.IMAGE_COMPRESS_AVIF_QUALITY ?? 55);

const files = await listImageFiles(imageDir);
const results = await mapLimit(files, concurrency, compressImage);
const compressed = results.filter((result) => result.status === "compressed");
const skipped = results.filter((result) => result.status === "skipped");
const failed = results.filter((result) => result.status === "failed");
const beforeBytes = compressed.reduce((sum, result) => sum + result.beforeBytes, 0);
const afterBytes = compressed.reduce((sum, result) => sum + result.afterBytes, 0);
const savedBytes = beforeBytes - afterBytes;

for (const result of compressed) {
  console.log(
    `- ${path.relative(root, result.file)}: ${formatBytes(result.beforeBytes)} -> ${formatBytes(result.afterBytes)}`,
  );
}

if (failed.length > 0) {
  console.error(`Image compression failed for ${failed.length} file(s):`);
  for (const result of failed) {
    console.error(`- ${path.relative(root, result.file)}: ${result.error}`);
  }
  process.exitCode = 1;
}

console.log(
  `Compressed ${compressed.length}/${files.length} image(s), saved ${formatBytes(savedBytes)}. Skipped ${skipped.length}. Lossy compression: ${allowLossy ? "on" : "off"}.`,
);

async function compressImage(file) {
  try {
    const input = await readFile(file);
    const metadata = await sharp(input, { animated: true }).metadata();
    if ((metadata.pages ?? 1) > 1) {
      return { file, status: "skipped", reason: "animated" };
    }

    const extension = normalizedExtension(path.extname(file));
    const output = await encodeImage(input, extension);
    if (!output || output.length + minSavingsBytes >= input.length) {
      return { file, status: "skipped", reason: "not-smaller" };
    }

    await writeFile(file, output);
    return {
      file,
      status: "compressed",
      beforeBytes: input.length,
      afterBytes: output.length,
    };
  } catch (error) {
    return { file, status: "failed", error: error.message };
  }
}

async function encodeImage(input, extension) {
  const image = sharp(input, { limitInputPixels: false }).rotate();

  if (extension === ".jpg") {
    return image.jpeg({ quality: jpegQuality, mozjpeg: true }).toBuffer();
  }

  if (extension === ".png") {
    return image.png({ compressionLevel: 9, effort: 10 }).toBuffer();
  }

  if (extension === ".webp") {
    return image.webp({ quality: webpQuality, effort: 6 }).toBuffer();
  }

  if (extension === ".avif") {
    return image.avif({ quality: avifQuality, effort: 6 }).toBuffer();
  }

  return undefined;
}

async function listImageFiles(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    items.map(async (item) => {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) return listImageFiles(fullPath);
      if (!item.isFile()) return [];
      const extension = normalizedExtension(path.extname(item.name));
      if (!supportedExtensions.has(extension)) return [];
      if (!(await isFile(fullPath))) return [];
      return [fullPath];
    }),
  );

  return files.flat().sort();
}

async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

function normalizedExtension(extension) {
  const lower = extension.toLowerCase();
  if (lower === ".jpeg") return ".jpg";
  return lower;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}
