import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../data/profile";
import { entrySlug, isPublished, sortByDate } from "../lib/content";

export async function GET(context) {
  const posts = sortByDate((await getCollection("blog")).filter(isPublished));

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${entrySlug(post)}/`,
      categories: [post.data.category, ...post.data.tags].filter(Boolean),
    })),
  });
}
