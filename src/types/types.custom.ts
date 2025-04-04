export type SanityNextQueries = {
  [key: string]: string
}

export interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{
    sortOrder?: string,
    page?: string | number | null
    s?: string | null
  }>
}

export type QueryImage = {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export enum NextRoutes {
  Page = "",
  Post = "/blog",
}

export enum SanityDocumentTypes {
  Page = "page",
  Post = "post",
}
