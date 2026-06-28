import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "src/content/blog");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const renderedImagePattern =
  /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)|<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>|url\(["']?([^"')]+)["']?\)/gi;

const markdownFiles = await listMarkdownFiles(contentDir);
const contentImages = await listImageFiles(contentDir);
const issues = [];

for (const imagePath of contentImages) {
  issues.push({
    file: imagePath,
    message: "图片不应放在 src/content/blog 下，请运行 npm run images:normalize 后提交 public/images/blog 下的文件。",
  });
}

for (const markdownFile of markdownFiles) {
  const source = await readFile(markdownFile, "utf8");
  const codeRanges = fencedCodeRanges(source);

  for (const match of source.matchAll(renderedImagePattern)) {
    if (isInsideRanges(match.index, codeRanges)) continue;

    const imageUrl = match[1] ?? match[2] ?? match[3];
    if (!isImageLikeUrl(imageUrl)) continue;

    if (/^https?:\/\//i.test(imageUrl)) {
      issues.push({
        file: markdownFile,
        message: `渲染图片仍使用远程地址：${imageUrl}`,
      });
      continue;
    }

    if (isRelativeImageUrl(imageUrl)) {
      issues.push({
        file: markdownFile,
        message: `渲染图片仍使用相对路径：${imageUrl}。请运行 npm run images:normalize。`,
      });
      continue;
    }

    if (imageUrl.startsWith("/images/")) {
      const localPath = path.join(root, "public", decodeURIComponent(imageUrl));
      if (!(await isFile(localPath))) {
        issues.push({
          file: markdownFile,
          message: `本地图片文件不存在：${imageUrl}`,
        });
      }
    }
  }
}

if (issues.length > 0) {
  console.error(`Blog image check failed with ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- ${path.relative(root, issue.file)}: ${issue.message}`);
  }
  process.exit(1);
}

console.log(`Blog image check passed for ${markdownFiles.length} article(s).`);

function isImageLikeUrl(url) {
  if (!url) return false;
  if (/^data:/i.test(url)) return false;
  if (/^https?:\/\//i.test(url)) return true;
  return imageExtensions.has(normalizedExtension(path.extname(url.split(/[?#]/)[0])));
}

function isRelativeImageUrl(url) {
  if (!url) return false;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(url)) return false;
  return imageExtensions.has(normalizedExtension(path.extname(url.split(/[?#]/)[0])));
}

function normalizedExtension(extension) {
  const lower = extension.toLowerCase();
  if (lower === ".jpeg") return ".jpg";
  return lower;
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

async function listImageFiles(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    items.map(async (item) => {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) return listImageFiles(fullPath);
      if (item.isFile() && imageExtensions.has(normalizedExtension(path.extname(item.name)))) return [fullPath];
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
