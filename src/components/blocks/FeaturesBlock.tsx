import * as React from 'react';
import { client } from '@/sanity/lib/client';
import createImageUrlBuilder from '@sanity/image-url';
import { Features } from '@/types/types.sanity';
import Image from 'next/image';
import { SanityImageAsset } from '@/types/types.sanity';

const width = 150;
const height = 150;

const columns = [
  "md:grid-cols-1",
  "md:grid-cols-2",
  "md:grid-cols-3",
  "md:grid-cols-4",
  "md:grid-cols-5",
  "md:grid-cols-6",
  "md:grid-cols-7",
]

const FeaturesBlock: React.FunctionComponent<Features> = async (props) => {
  return props?.features && (
    <div className={`grid grid-cols-1 ${columns[props?.features?.length - 1 || 0]} gap-4`}>
      {props.features?.map(async (feature) => {
        const imageUrl = feature.icon ? createImageUrlBuilder(client).image(feature.icon).width(width).height(height).fit('max').dpr(2).auto('format').url() : null;
        const imageData: SanityImageAsset | null = feature.icon?.asset ? (await client.fetch(`*[_id == "${feature.icon.asset._ref}"]`))[0] : null;
        return (
          <div key={feature._key} className="text-center flex flex-col items-center justify-center gap-2 not-prose">
            {
              feature.icon && imageUrl && imageData && (
                <div className="w-full flex items-center justify-center my-0">
                  <Image src={imageUrl} alt={imageData.altText || feature.title || ''} width={width} height={height} />
                </div>
              )
            }
            <h3 className="text-lg font-bold">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        )
      })}
    </div>
  );
};

export default FeaturesBlock;
