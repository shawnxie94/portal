import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "src/content/blog");
const imageDir = path.join(root, "public/images/blog");
const reportPath = path.join(root, "docs/blog-image-migration-report.md");

const timeoutMs = Number(process.env.IMAGE_DOWNLOAD_TIMEOUT_MS ?? 8_000);
const concurrency = Number(process.env.IMAGE_DOWNLOAD_CONCURRENCY ?? 16);
const proxyTemplate = process.env.IMAGE_PROXY_TEMPLATE ?? "";
const imagePattern = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)|<img\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["'][^>]*>/gi;

async function main() {
  const files = await listMarkdownFiles(contentDir);
  const downloads = [];
  const reused = [];
  const failures = [];

  await mkdir(imageDir, { recursive: true });

  for (const file of files) {
    const slug = path.basename(file, ".md");
    const source = await readFile(file, "utf8");
    const matches = [...source.matchAll(imagePattern)];
    if (matches.length === 0) continue;

    const replacements = await mapLimit(matches, concurrency, async (match) => {
      const [raw, markdownAlt, markdownUrl, htmlUrl] = match;
      const url = markdownUrl ?? htmlUrl;

      try {
        const result = await downloadImage(url, slug);
        if (result.status === "reused") {
          reused.push({ slug, url, localPath: result.localPath });
        } else {
          downloads.push({ slug, url, localPath: result.localPath });
        }
        if (markdownUrl) return `![${markdownAlt ?? ""}](${result.localPath})`;
        return raw.replace(url, result.localPath);
      } catch (error) {
        failures.push({ slug, url, reason: error.message });
        return raw;
      }
    });

    const updated = replaceMatches(source, matches, replacements);
    if (updated !== source) {
      await writeFile(file, updated);
    }
  }

  const updatedFiles = await listMarkdownFiles(contentDir);
  const remainingRemoteImages = await countRemoteImages(updatedFiles);
  const localImageCount = await countFiles(imageDir);

  await writeReport({ files, downloads, reused, failures, remainingRemoteImages, localImageCount });
  console.log(`Scanned ${files.length} blog articles.`);
  console.log(`Downloaded ${downloads.length} images.`);
  console.log(`Reused ${reused.length} existing images.`);
  console.log(`Remaining remote image references: ${remainingRemoteImages}.`);
  console.log(`Image failures: ${failures.length}.`);
}

async function listMarkdownFiles(dir) {
  const { readdir } = await import("node:fs/promises");
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

async function downloadImage(url, slug) {
  const existingPath = await findExistingLocalPath(url, slug);
  if (existingPath) return { localPath: existingPath, status: "reused" };

  const fetchUrl = proxiedUrl(url);
  const response = await fetch(fetchUrl, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      "User-Agent": "suibi-image-migrator/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`download failed with HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const extension = extensionFromUrlOrType(url, response.headers.get("content-type"), Boolean(proxyTemplate));
  const base = fileBase(url);
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 8);
  const fileName = `${base}-${hash}${extension}`;
  const targetDir = path.join(imageDir, slug);

  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, fileName), buffer);
  return { localPath: `/images/blog/${slug}/${fileName}`, status: "downloaded" };
}

async function findExistingLocalPath(url, slug) {
  const targetDir = path.join(imageDir, slug);
  const base = fileBase(url);
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 8);

  try {
    const files = await readdir(targetDir);
    const existing = files.find((file) => file.startsWith(`${base}-${hash}.`));
    return existing ? `/images/blog/${slug}/${existing}` : undefined;
  } catch {
    return undefined;
  }
}

function fileBase(url) {
  return path.basename(new URL(url).pathname, path.extname(new URL(url).pathname)).replace(/[^A-Za-z0-9._-]/g, "-") || "image";
}

function proxiedUrl(url) {
  if (!proxyTemplate) return url;
  return proxyTemplate
    .replaceAll("{url}", url)
    .replaceAll("{encodedUrl}", encodeURIComponent(url))
    .replaceAll("{urlNoProtocol}", url.replace(/^https?:\/\//, ""));
}

function extensionFromUrlOrType(url, type, preferContentType = false) {
  if (preferContentType) {
    return extensionFromType(type) ?? path.extname(new URL(url).pathname) ?? ".jpg";
  }

  const extension = path.extname(new URL(url).pathname);
  if (extension) return extension;
  return extensionFromType(type) ?? ".jpg";
}

function extensionFromType(type) {
  if (type?.includes("webp")) return ".webp";
  if (type?.includes("png")) return ".png";
  if (type?.includes("jpeg") || type?.includes("jpg")) return ".jpg";
  if (type?.includes("gif")) return ".gif";
  if (type?.includes("svg")) return ".svg";
  return undefined;
}

function replaceMatches(source, matches, replacements) {
  let updated = "";
  let lastIndex = 0;

  for (const [index, match] of matches.entries()) {
    updated += source.slice(lastIndex, match.index);
    updated += replacements[index];
    lastIndex = match.index + match[0].length;
  }

  return updated + source.slice(lastIndex);
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

async function countRemoteImages(files) {
  let count = 0;
  for (const file of files) {
    const source = await readFile(file, "utf8");
    count += [...source.matchAll(imagePattern)].length;
  }
  return count;
}

async function countFiles(dir) {
  try {
    const items = await readdir(dir, { withFileTypes: true });
    const counts = await Promise.all(
      items.map((item) => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) return countFiles(fullPath);
        return item.isFile() ? 1 : 0;
      }),
    );
    return counts.reduce((sum, count) => sum + count, 0);
  } catch {
    return 0;
  }
}

async function writeReport({ files, downloads, reused, failures, remainingRemoteImages, localImageCount }) {
  const lines = [
    "# 博客图片迁移报告",
    "",
    `生成时间：${new Date().toISOString()}`,
    "",
    "## 结果",
    "",
    `- 扫描文章：${files.length} 篇`,
    `- 本轮新下载：${downloads.length} 张`,
    `- 本轮复用本地文件：${reused.length} 张`,
    `- 本轮下载失败：${failures.length} 张`,
    `- 当前本地图片总数：${localImageCount} 张`,
    `- 当前剩余远程图片引用：${remainingRemoteImages} 处`,
    `- 代理模板：${proxyTemplate || "未使用"}`,
    "",
    "## 下载失败",
    "",
  ];

  if (failures.length === 0) {
    lines.push("- 无");
  } else {
    for (const failure of failures) {
      lines.push(`- \`${failure.slug}\`: ${failure.reason} - ${failure.url}`);
    }
  }

  lines.push("");
  await writeFile(reportPath, `${lines.join("\n")}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
