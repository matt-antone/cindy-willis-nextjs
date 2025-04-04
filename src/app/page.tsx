import * as React from "react";
import type { Home } from "@/types/types.sanity";
import queries, { getRevalidation, QueryTypes } from "@/sanity/queries";
import { client } from "@/sanity/lib/client";

import Container from "@/components/Container";
import Content from "@/components/Content";
import Main from "@/components/Main";
import Layout from "@/components/Layout";
import SanityContent from '@/components/SanityContent';
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { tryCatch } from "@/lib/tryCatch";

const revalidate = getRevalidation(QueryTypes.Home)

export default async function Home() {

  const { data, error } = await tryCatch(client.fetch(queries.home.page, {}, revalidate));
  if (error) {
    throw new Error("Failed to fetch home page")
  }
  const { data: posts, error: postsError } = await tryCatch(client.fetch(queries.posts.homePosts, {}, revalidate));
  if (postsError) {
    throw new Error("Failed to fetch home posts")
  }

  // If the home page is not found, return a 404 error
  if (!data) {
    return notFound()
  }
  return (
    <Layout hasStickyHeader>
      <div className="relative">
        <Container>
          <Content>
            <Main>
              {data.body && <SanityContent content={data.body} />}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post: { _id: string, slug: string, title: string, description: string, gallery: { src: string }[] }) => {
                  const image = post.gallery && post.gallery.length > 0 ? post.gallery[0].src : null;
                  return image && (
                    <Link href={`/blog/${post.slug}`} key={post._id} className="flex flex-col gap-4">
                      <article key={post._id} className="flex flex-col gap-4">
                        <header className="flex flex-col gap-4">
                          {post.gallery && post.gallery.length > 0 && (
                            <div className="relative w-full">
                              <Image src={`${post.gallery[0].src || ""}?w=400&h=400&fit=crop&dpr=2&auto=format`} alt={post.title || ""} width={400} height={400} className="" />
                            </div>
                          )}
                          <h2 className="text-2xl font-bold">{post.title}</h2>
                        </header>
                        <p className="text-sm text-gray-500">{post.description}</p>
                      </article>
                    </Link>
                  )
                })}
              </div>
            </Main>
          </Content>
        </Container>
      </div>
    </Layout>
  );
}

export async function generateMetadata() {
  return await client.fetch(queries.home.metadata, {}, revalidate);
}