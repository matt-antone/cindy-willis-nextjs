import * as React from "react";
import NextImage from "next/image";
import createImageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client';
import type { Imageblock } from "@/types/types.sanity";
export type IImageProps = Imageblock;

export const ImageBlock: React.FunctionComponent<IImageProps> = async (props) => {
  if (!props.asset) return null;
  const imageUrl = createImageUrlBuilder(client).image(props).width(800).dpr(2).auto('format').fit('max').url();
  const imageData = await client.fetch(`*[_id == $id][0]`, { id: props.asset._ref }, {
    next: {
      revalidate: 60 * 60 * 24 * 30, // 30 days
      tags: [props.asset._ref, "image"],
    },
  });

  return (
    <NextImage
      src={imageUrl}
      alt={imageData.altText || ""}
      width={imageData.metadata?.dimensions?.width}
      height={imageData.metadata?.dimensions?.height}
      className="mx-auto"
    />
  );
};
