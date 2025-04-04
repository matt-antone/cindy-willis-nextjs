import { client } from "@/sanity/lib/client";
import queries from "@/sanity/queries";
import { Post, Page } from '@/types/types.sanity';

export type SitemapLink = {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

const getURL = (page: Page | Post, path: string = '') => {
  return {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${path}${page.slug?.current}`,
    lastModified: page._updatedAt || page.date,
    changeFrequency: 'monthly',
    priority: 0.8,
  } as SitemapLink;
}

export default async function sitemap(): Promise<SitemapLink[]> {
  const links: SitemapLink[] = [];
  const content = await client.fetch(queries.sitemap.links);
  Object.keys(content).forEach((key) => {
    content[key].forEach((page: Page | Post) => {
      links.push(getURL(page, key));
    });
  });
  return links;
}