import type { CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;

const excerptMaxLength = 120;

export function sortByDate<T extends { data: { pubDate: Date } }>(items: T[]) {
  return items.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = getKey(item);
    const group = groups.get(key) ?? [];
    group.push(item);
    groups.set(key, group);
  }
  return groups;
}

export function isPublished<T extends { data: { draft?: boolean } }>(entry: T) {
  return entry.data.draft !== true;
}

export function entrySlug(entry: { id: string }) {
  return entry.id.replace(/\.mdx?$/, "");
}

function truncateText(text: string, maxLength = excerptMaxLength) {
  const characters = Array.from(text);
  if (characters.length <= maxLength) return text;
  const trimmed = characters.slice(0, maxLength).join("").trimEnd().replace(/[，,。.!！？；：、\s]+$/u, "");
  return `${trimmed}...`;
}

function stripMarkdownInline(text: string) {
  return text
    .replace(/!\[([^\]]*)\]\((?:[^)\n]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\((?:[^)\n]+)\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\\([\\`*_{}\[\]()#+\-.!>])/g, "$1")
    .replace(/[*_~`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeParagraph(paragraph: string) {
  const lines = paragraph
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^```/.test(line) && !/^~~~/.test(line) && !/^#{1,6}\s+/.test(line) && !/^>\s*/.test(line))
    .map((line) => line.replace(/^(?:[-*+]\s+|\d+\.\s+)/, ""));

  if (lines.length === 0) return "";
  const paragraphText = lines.join(" ");
  if (!paragraphText.replace(/!\[[^\]]*\]\((?:[^)\n]+)\)/g, "").trim()) return "";

  const text = stripMarkdownInline(paragraphText);
  if (!text) return "";
  if (!/[A-Za-z0-9\u4e00-\u9fff]/u.test(text)) return "";
  return text;
}

function isLeadLabel(text: string) {
  return Array.from(text).length <= 12 && /[:：]$/u.test(text);
}

export function excerptFromMarkdown(markdown: string, maxLength = excerptMaxLength) {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  if (!normalized) return "";

  let fallback = "";
  for (const paragraph of normalized.split(/\n{2,}/)) {
    const text = normalizeParagraph(paragraph);
    if (!text) continue;
    if (!fallback) fallback = text;
    if (!isLeadLabel(text)) return truncateText(text, maxLength);
  }

  return fallback ? truncateText(fallback, maxLength) : "";
}

export function blogCardDescription(entry: BlogEntry, maxLength = excerptMaxLength) {
  const manualDescription = entry.data.description?.trim();
  return manualDescription || (entry.body ? excerptFromMarkdown(entry.body, maxLength) : "") || "";
}
