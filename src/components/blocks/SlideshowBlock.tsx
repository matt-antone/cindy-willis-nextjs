"use client";
import * as React from 'react';
import type { Slideshow, SanityImageHotspot, SanityImageCrop } from '@/types/types.sanity';
import Image from 'next/image';
import createImageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client';
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface SlideshowBlockProps extends Slideshow {
  className?: string
  autoplay?: boolean
}

const SlideshowBlock: React.FunctionComponent<SlideshowBlockProps> = (props) => {
  const { images, className, autoplay } = props;

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  )
  return (
    <div className="px-16">
      <Carousel opts={{ loop: true, }} className={className} plugins={autoplay ? [plugin.current] : []}>
        <CarouselContent >
          {images?.map((image: {
            asset?: { _ref: string; _type: "reference" }
            hotspot?: SanityImageHotspot
            crop?: SanityImageCrop
            _type: "image"
            _key: string
          }) => {
            const imageUrl = createImageUrlBuilder(client).image(image).width(640).height(360).fit('crop').dpr(2).url();
            return (
              <CarouselItem key={image._key}>
                <Image priority key={image._key} src={imageUrl} alt="Slideshow Image" width={640} height={360} className="w-full h-full object-cover" />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
        <CarouselIndicators />
      </Carousel>

    </div>


  );
};

export default SlideshowBlock;
