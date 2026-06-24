import type { CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;

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
