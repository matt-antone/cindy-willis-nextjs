import type { PageProps } from "@/types/types.custom";
import type { Post } from "@/types/types.sanity";
import { client } from "@/sanity/lib/client";
import queries, { getRevalidation, QueryTypes } from "@/sanity/queries";
import Container from "@/components/Container";
import Content from "@/components/Content";
import Aside from "@/components/Aside";
import Main from "@/components/Main";
import Layout from "@/components/Layout";
import LayoutHeader from "@/components/LayoutHeader";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { tryCatch } from "@/lib/tryCatch";
const revalidate = getRevalidation(QueryTypes.Posts)

export default async function Blog({ searchParams }: PageProps) {
  const params = await searchParams;
  const perPage = 10;
  const page = parseInt(params.page as string) || 1;
  const start = (perPage * page) - perPage;
  const end = (perPage * page) - 1 > 0 ? (perPage * page) - 1 : 0;

  const { data, error } = await tryCatch(client.fetch(queries.posts.postsPage, {
    start,
    end
  }, revalidate))
  if (error) {
    throw new Error("Failed to fetch posts")
  }

  return data && (
    <Layout>
      <Container>
        <LayoutHeader title={"Blog"} subtitle={`${data.total} posts`} />
        <Content hasAside>
          <Main hasAside>
            <div className="flex flex-col gap-8">
              {
                data.posts.map((post: Post, index: number) => (
                  <Link href={`/blog/${post.slug}`} key={post.slug?.current || `post-${page}-${index}`}>
                    <article className="flex flex-col gap-2">
                      <header>
                        <h2 className="text-2xl font-bold">{post.title}</h2>
                        <p className="text-sm text-muted-foreground">{post.description}</p>
                      </header>
                    </article>
                  </Link>
                ))
              }
              <Pagination
                queryString={""}
                total={data.total}
                currentPage={page}
                perPage={perPage}
                path={"/blog"}
              />
            </div>
          </Main>
          <Aside>
            content aside
          </Aside>
        </Content>
      </Container>
    </Layout>
  );
}