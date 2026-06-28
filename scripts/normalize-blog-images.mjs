import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "src/content/blog");
const publicBlogImageDir = path.join(root, "public/images/blog");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const renderedImagePattern =
  /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)|<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;

const markdownFiles = await listMarkdownFiles(contentDir);
const moved = [];
const removedDuplicates = [];
const missing = [];

for (const markdownFile of markdownFiles) {
  const slug = path.basename(markdownFile, ".md");
  const source = await readFile(markdownFile, "utf8");
  const codeRanges = fencedCodeRanges(source);
  const replacements = [];

  for (const match of source.matchAll(renderedImagePattern)) {
    if (isInsideRanges(match.index, codeRanges)) continue;

    const raw = match[0];
    const markdownAlt = match[1];
    const markdownUrl = match[2];
    const htmlUrl = match[3];
    const imageUrl = markdownUrl ?? htmlUrl;
    if (!isRelativeImageUrl(imageUrl)) continue;

    const sourcePath = path.resolve(path.dirname(markdownFile), decodeURIComponent(imageUrl));
    if (!(await isFile(sourcePath))) {
      missing.push({ markdownFile, imageUrl });
      continue;
    }

    const localPath = await moveImage(sourcePath, slug);
    const replacement = markdownUrl ? `![${markdownAlt ?? ""}](${localPath})` : raw.replace(imageUrl, localPath);
    replacements.push({ start: match.index, end: match.index + raw.length, replacement });
  }

  if (replacements.length > 0) {
    await writeFile(markdownFile, applyReplacements(source, replacements));
  }
}

if (moved.length > 0) {
  console.log(`Normalized ${moved.length} blog image(s):`);
  for (const item of moved) {
    console.log(`- ${path.relative(root, item.from)} -> ${item.to}`);
  }
} else {
  console.log("No blog images needed normalization.");
}

if (removedDuplicates.length > 0) {
  console.log(`Removed ${removedDuplicates.length} duplicate source image(s):`);
  for (const item of removedDuplicates) {
    console.log(`- ${path.relative(root, item.from)} -> ${item.to}`);
  }
}

if (missing.length > 0) {
  console.error("");
  console.error("Missing relative image source(s):");
  for (const item of missing) {
    console.error(`- ${path.relative(root, item.markdownFile)}: ${item.imageUrl}`);
  }
  process.exitCode = 1;
}

async function moveImage(sourcePath, slug) {
  const buffer = await readFile(sourcePath);
  const extension = normalizedExtension(path.extname(sourcePath));
  const base = fileBase(path.basename(sourcePath, path.extname(sourcePath)));
  const hash = createHash("sha1").update(buffer).digest("hex").slice(0, 8);
  const fileName = `${base}-${hash}${extension}`;
  const targetDir = path.join(publicBlogImageDir, slug);
  const targetPath = path.join(targetDir, fileName);
  const localPath = `/images/blog/${slug}/${fileName}`;

  await mkdir(targetDir, { recursive: true });

  if (path.resolve(sourcePath) !== path.resolve(targetPath)) {
    if (!(await isFile(targetPath))) {
      await rename(sourcePath, targetPath);
      moved.push({ from: sourcePath, to: localPath });
    } else {
      await unlink(sourcePath);
      removedDuplicates.push({ from: sourcePath, to: localPath });
    }
  }

  return localPath;
}

function isRelativeImageUrl(url) {
  if (!url) return false;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(url)) return false;
  return imageExtensions.has(normalizedExtension(path.extname(url.split(/[?#]/)[0])));
}

function fileBase(input) {
  return input.replace(/[^A-Za-z0-9._-]/g, "-").replace(/^-+|-+$/g, "") || "image";
}

function normalizedExtension(extension) {
  const lower = extension.toLowerCase();
  if (lower === ".jpeg") return ".jpg";
  return lower;
}

function applyReplacements(source, replacements) {
  let updated = "";
  let cursor = 0;
  for (const replacement of replacements.sort((a, b) => a.start - b.start)) {
    updated += source.slice(cursor, replacement.start);
    updated += replacement.replacement;
    cursor = replacement.end;
  }
  return updated + source.slice(cursor);
}

function fencedCodeRanges(source) {
  const ranges = [];
  const pattern = /^ {0,3}(```|~~~)/gm;
  let open;
  let match;

  while ((match = pattern.exec(source))) {
    if (open === undefined) {
      open = match.index;
    } else {
      ranges.push([open, pattern.lastIndex]);
      open = undefined;
    }
  }

  if (open !== undefined) ranges.push([open, source.length]);
  return ranges;
}

function isInsideRanges(index, ranges) {
  return ranges.some(([start, end]) => index >= start && index < end);
}

async function listMarkdownFiles(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    items.map(async (item) => {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) return listMarkdownFiles(fullPath);
      if (item.isFile() && item.name.endsWith(".md")) return [fullPath];
      return [];
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
