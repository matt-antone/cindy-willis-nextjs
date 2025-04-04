import * as React from "react";
import type { PageProps } from "@/types/types.custom";
import type { Post } from "@/types/types.sanity";
import Container from "@/components/Container";
import LayoutHeader from "@/components/LayoutHeader";
import Layout from "@/components/Layout";
import Content from "@/components/Content";
import Main from "@/components/Main";
import queries, { getQueryTags, QueryTypes } from "@/sanity/queries";
import { client } from "@/sanity/lib/client";
import Prose from "@/components/Prose";
import { NextRoutes } from "@/types/types.custom";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { tryCatch } from "@/lib/tryCatch";

const SearchPage: React.FunctionComponent<PageProps> = async (props) => {
  const params = await props.searchParams;
  const perPage = 5;
  const queryString = params.s as string || "";
  const page = parseInt(params.page as string) || 1;
  const start = (perPage * page) - perPage;
  const end = (perPage * page) - 1 > 0 ? (perPage * page) - 1 : 0;

  const { data, error } = await tryCatch(client.fetch(queries.search.keyword, { queryString, start, end }, {
    next: {
      revalidate: 60 * 60 * 24,
      tags: [...getQueryTags(QueryTypes.Search), queryString || "unknown"],
    },
  }))

  if (error) {
    throw new Error("Failed to fetch search results")
  }

  function getPath(type: NextRoutes) {
    // capitalize the first letter of type to create keyof NextRoutes
    const key = type.charAt(0).toUpperCase() + type.slice(1) as keyof typeof NextRoutes;
    return NextRoutes[key];
  }

  return (
    <Layout>
      <Container>
        <LayoutHeader title={"Search"} subtitle={`${data.total} results found for ${params.s ? `"${params.s}"` : "unknown"}`} />
        <Content>
          <Main>
            <div className="flex flex-col gap-8">
              {data.results.map((item: Post) => {
                const path = getPath(item._type as NextRoutes);
                const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}/${item.slug}`;
                return (
                  <Prose key={`${item.slug}-${item._type}`} className="bg-gray-100 p-4 rounded-md">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <Link href={url}>Read more</Link>
                  </Prose>
                )
              })}
              <Pagination
                queryString={queryString}
                total={data.total}
                currentPage={page}
                perPage={perPage}
                path={"/search"}
              />
            </div>
          </Main>
        </Content>
      </Container>
    </Layout>
  );
};

export default SearchPage;
