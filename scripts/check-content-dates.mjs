import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "src/content/blog");
const today = startOfDayInShanghai(new Date());
const files = await listMarkdownFiles(contentDir);
const issues = [];
let missingUpdatedDateCount = 0;

for (const file of files) {
  const source = await readFile(file, "utf8");
  const frontmatter = parseFrontmatter(source);
  if (!frontmatter) {
    issues.push({ file, message: "缺少 frontmatter。" });
    continue;
  }

  const pubDate = parseDate(frontmatter.pubDate);
  const updatedDate = frontmatter.updatedDate ? parseDate(frontmatter.updatedDate) : undefined;

  if (!pubDate) {
    issues.push({ file, message: "pubDate 缺失或格式无效。" });
    continue;
  }

  if (pubDate > today && frontmatter.draft !== "true") {
    issues.push({ file, message: `pubDate ${frontmatter.pubDate} 晚于当前日期，非草稿文章不应未来发布。` });
  }

  if (!updatedDate) {
    missingUpdatedDateCount += 1;
    continue;
  }

  if (updatedDate < pubDate) {
    issues.push({ file, message: `updatedDate ${frontmatter.updatedDate} 早于 pubDate ${frontmatter.pubDate}。` });
  }

  if (updatedDate > today) {
    issues.push({ file, message: `updatedDate ${frontmatter.updatedDate} 晚于当前日期。` });
  }
}

if (issues.length > 0) {
  console.error(`Content date check failed with ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- ${path.relative(root, issue.file)}: ${issue.message}`);
  }
  process.exit(1);
}

if (missingUpdatedDateCount > 0) {
  console.warn(`Content date check passed. ${missingUpdatedDateCount}/${files.length} article(s) do not set updatedDate.`);
} else {
  console.log(`Content date check passed for ${files.length} article(s).`);
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return undefined;

  const data = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!field) continue;
    data[field[1]] = field[2].replace(/^["']|["']$/g, "").trim();
  }

  return data;
}

function parseDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00+08:00`);
  return Number.isNaN(date.valueOf()) ? undefined : date;
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

function startOfDayInShanghai(date) {
  const shanghaiDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return new Date(`${shanghaiDate}T00:00:00+08:00`);
}
