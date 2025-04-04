import type { Page } from "@/types/types.sanity";
import type { Metadata } from 'next'
import type { PageProps } from "@/types/types.custom";
import { client } from "@/sanity/lib/client";
import queries, { getRevalidation, QueryTypes } from "@/sanity/queries";
import Container from "@/components/Container";
import Content from "@/components/Content";
import Aside from "@/components/Aside";
import Main from "@/components/Main";
import Layout from "@/components/Layout";
import LayoutHeader from "@/components/LayoutHeader";
import SanityContent from "@/components/SanityContent";
import { notFound } from "next/navigation";
import { tryCatch } from "@/lib/tryCatch";

const revalidate = getRevalidation(QueryTypes.Posts)

export default async function Post({ params }: PageProps) {
  const { slug } = await params

  const { data, error } = await tryCatch(client.fetch(queries.posts.post, {
    slug
  }, revalidate))

  if (error) {
    throw new Error("Failed to fetch post")
  }

  // If the page is not found, return a 404 error
  if (!data) {
    return notFound()
  }

  return (
    <Layout>
      <Container>
        <LayoutHeader title={data?.title || "Untitled"} subtitle={data?.description || ""} />
        <Content hasAside>
          <Main hasAside>
            {data.body && <SanityContent content={data.body} />}
          </Main>
          <Aside>
            content aside
          </Aside>
        </Content>
      </Container>
    </Layout>
  );
}

// Generate Static Page Slugs
export async function generateStaticParams() {
  return await client.fetch<Page[]>(queries.posts.slugs);
}


export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const p = await params
  return await client.fetch(queries.posts.metadata, {
    slug: p.slug
  }, revalidate)
}