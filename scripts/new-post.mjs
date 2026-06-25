import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "src/content/blog");
const args = process.argv.slice(2);
const shouldOpen = args.includes("--open") || process.env.OPEN_POST === "1";
const title = args.filter((arg) => arg !== "--open").join(" ").trim() || "未命名文章";

const today = formatDate(new Date());
const slug = title === "未命名文章" ? "draft" : slugify(title);
const fileName = `${today}-${slug}.md`;
const filePath = path.join(blogDir, fileName);

const content = `---
title: ${JSON.stringify(title)}
description: ""
pubDate: ${today}
category: "技术笔记"
tags: []
---

`;

await mkdir(blogDir, { recursive: true });
await writeFile(filePath, content, { flag: "wx" });

console.log(path.relative(root, filePath));

if (shouldOpen) {
  openFile(filePath);
}

function slugify(input) {
  const ascii = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (ascii && !/^[\u4e00-\u9fa5]+$/.test(ascii)) return ascii;
  return `post-${Date.now().toString(36)}`;
}

function openFile(target) {
  const editor = process.env.EDITOR;
  const command = editor || (process.platform === "darwin" ? "open" : "xdg-open");
  const commandArgs = editor ? [target] : [target];
  const child = spawn(command, commandArgs, {
    detached: true,
    stdio: "ignore",
  });

  child.unref();
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
