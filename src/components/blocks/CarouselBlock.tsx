import { BlockContent } from '@/types/types.sanity';
import { getImageData } from '@/lib/utils';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import SanityImage from '../SanityImage';
import { PortableText } from '@portabletext/react';

type Slide = {
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    _type: 'image';
    _key: string;
  },
  _key: string;
  body: any[];
}

interface ICarouselBlockProps {
  images: Slide[]
}

const CarouselBlock: React.FunctionComponent<ICarouselBlockProps> = async (props) => {
  console.log({ props });
  return (
    <Carousel className='w-full not-prose' opts={{ loop: true }}>
      <CarouselContent>
        {props.images.map(async (slide) => {
          // console.log({ slide });
          const imageData = await getImageData(slide.image.asset);
          console.log({ imageData });
          return (
            <CarouselItem key={slide._key} className='relative p-0'>
              <SanityImage
                image={slide.image}
                priority={true}
                className='object-cover my-0 w-full mr-2'
              />
              <div className='p-4 absolute bg-black/50 prose prose-white w-full top-0 bottom-0 left-4 -right-4'>
                <PortableText value={slide.body} />
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

  );
};

export default CarouselBlock;
