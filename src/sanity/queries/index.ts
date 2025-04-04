import home from "./home"
import pages from "./pages"
import posts from "./posts"
import search from "./search"
import settings from "./settings"
import sitemap from "./sitemap"

const queries = {
  home,
  pages,
  posts,
  search,
  settings,
  sitemap,
}

export default queries;


export const getQueryTags = (tag: QueryTypes) => {
  return [...CACHE_GROUPS[tag], ...CACHE_DEPENDENCIES[tag]];
}

export const getGroup = (tag: QueryTypes) => {
  return CACHE_GROUPS[tag];
}

export const getDependencies = (tag: QueryTypes) => {
  return CACHE_DEPENDENCIES[tag];
}

export const getRevalidation = (tag: QueryTypes) => {
  return {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
      tags: getQueryTags(tag),
    },
  }
}

export enum QueryTypes {
  Home = "home",
  Pages = "page",
  Posts = "post",
  Search = "search",
  Settings = "settings",
  Sitemap = "sitemap",
}

// The paths to revalidate when the query is updated
export const CACHE_PATHS: Record<QueryTypes, string[]> = {
  [QueryTypes.Home]: ['/'],
  [QueryTypes.Pages]: ['/map'],
  [QueryTypes.Posts]: ['/map', '/blog'],
  [QueryTypes.Search]: ['/search'],
  [QueryTypes.Settings]: [],
  [QueryTypes.Sitemap]: ['/map'],
}

// The groups of queries to revalidate when the query is updated.
export const CACHE_GROUPS: Record<QueryTypes, string> = {
  [QueryTypes.Home]: 'home',
  [QueryTypes.Pages]: 'pages',
  [QueryTypes.Posts]: 'posts',
  [QueryTypes.Search]: 'search',
  [QueryTypes.Settings]: 'settings',
  [QueryTypes.Sitemap]: 'sitemap',
}

// The dependencies of the query to revalidate when the query is updated.
// Example: If a post is updated, the home page and sitemap will need to be revalidated.
export const CACHE_DEPENDENCIES: Record<QueryTypes, string[]> = {
  [QueryTypes.Home]: ['posts'],
  [QueryTypes.Pages]: [],
  [QueryTypes.Posts]: [],
  [QueryTypes.Search]: [],
  [QueryTypes.Settings]: [],
  [QueryTypes.Sitemap]: ["pages", "posts"],
}
