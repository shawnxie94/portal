import type { BlogEntry } from "./content";
import { blogCardDescription, entrySlug, isPublished } from "./content";
import { stripMarkdownLinks } from "./markdown";

export interface UpdateItem {
  date: string;
  title: string;
  description: string;
  url: string;
  type: string;
}

interface ProjectUpdateSource {
  slug?: string;
  name: string;
  description: string;
  url: string;
  repo?: string;
  articleUrl?: string;
  updatedAt?: string;
}

interface AffUpdateSource {
  slug: string;
  name: string;
  type: string;
  description: string;
  updatedAt: string;
}

interface BuildUpdatesInput {
  posts: BlogEntry[];
  projects?: ProjectUpdateSource[];
  affItems?: AffUpdateSource[];
}

interface SortableUpdateItem extends UpdateItem {
  sortTime: number;
  priority: number;
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

function toTime(date: Date | string) {
  return new Date(date).valueOf();
}

function buildArticleUpdates(posts: BlogEntry[]): SortableUpdateItem[] {
  return posts.filter(isPublished).flatMap((post) => {
    const articleItem = {
      date: dateKey(post.data.pubDate),
      title: post.data.title,
      description: compactText(blogCardDescription(post)),
      url: `/blog/${entrySlug(post)}/`,
      type: "文章",
      sortTime: post.data.pubDate.valueOf(),
      priority: 10,
    };

    if (!post.data.updatedDate || post.data.updatedDate.valueOf() <= post.data.pubDate.valueOf()) {
      return [articleItem];
    }

    return [
      {
        date: dateKey(post.data.updatedDate),
        title: post.data.title,
        description: `文章内容更新：${compactText(blogCardDescription(post), 76)}`,
        url: `/blog/${entrySlug(post)}/`,
        type: "更新",
        sortTime: post.data.updatedDate.valueOf(),
        priority: 20,
      },
      articleItem,
    ];
  });
}

function buildProjectUpdates(projects: ProjectUpdateSource[] = []): SortableUpdateItem[] {
  return projects
    .filter((project) => project.updatedAt)
    .map((project) => ({
      date: dateKey(project.updatedAt as string),
      title: project.name,
      description: compactText(project.description),
      url: `/projects/#${project.slug ?? project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
      type: "项目",
      sortTime: toTime(project.updatedAt as string),
      priority: 30,
    }));
}

function buildAffUpdates(affItems: AffUpdateSource[] = []): SortableUpdateItem[] {
  return affItems.map((item) => ({
    date: dateKey(item.updatedAt),
    title: item.name,
    description: `${item.type}：${compactText(stripMarkdownLinks(item.description), 72)}`,
    url: `/aff/${item.slug}/`,
    type: "推广",
    sortTime: toTime(item.updatedAt),
    priority: 25,
  }));
}

export function buildUpdates(input: BuildUpdatesInput | BlogEntry[]): UpdateItem[] {
  const source = Array.isArray(input) ? { posts: input } : input;
  const items = [
    ...buildArticleUpdates(source.posts),
    ...buildProjectUpdates(source.projects),
    ...buildAffUpdates(source.affItems),
  ];

  return items
    .sort((a, b) => b.sortTime - a.sortTime || b.priority - a.priority || a.title.localeCompare(b.title, "zh-CN"))
    .map(({ sortTime, priority, ...item }) => item);
}
