import * as React from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import createImageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client';
import type { Bento2 } from '@/types/types.sanity';

const Bento2Block: React.FunctionComponent<Bento2> = async (props) => {
  const { content, image, reverse } = props;
  if (!image) return null;
  const imageUrl = createImageUrlBuilder(client).image(image).width(500).height(500).fit('max').url();

  return (
    <div className={`flex items-center flex-col md:flex-row md:gap-16 ${reverse ? 'flex-col-reverse md:flex-row-reverse' : 'flex-col-reverse md:flex-row'}`}>
      <div className="basis-1/2">
        {content && <PortableText value={content} />}
      </div>
      <div className="basis-1/2">
        {image && imageUrl && <Image src={imageUrl} alt={"Bento Image"} width={500} height={500} />}
      </div>
    </div>
  );
};

export default Bento2Block;
