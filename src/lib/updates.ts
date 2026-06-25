import type { BlogEntry } from "./content";
import { blogCardDescription, entrySlug, isPublished, sortByDate } from "./content";

export interface UpdateItem {
  date: string;
  title: string;
  description: string;
  url: string;
  type: string;
}

function dateKey(date: Date | string) {
  return new Date(date).toISOString().slice(0, 10);
}

function compactText(text: string, maxLength = 86) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const characters = Array.from(normalized);
  if (characters.length <= maxLength) return normalized;
  return `${characters.slice(0, maxLength).join("").trimEnd().replace(/[，,。.!！？；：、\s]+$/u, "")}...`;
}

export function buildUpdates(posts: BlogEntry[]): UpdateItem[] {
  const articleItems = sortByDate(posts.filter(isPublished)).map((post) => ({
    date: dateKey(post.data.pubDate),
    title: `发布文章：${post.data.title}`,
    description: compactText(blogCardDescription(post)),
    url: `/blog/${entrySlug(post)}/`,
    type: "article",
    sortTime: post.data.pubDate.valueOf(),
  }));

  return articleItems.map(({ sortTime, ...item }) => item);
}
