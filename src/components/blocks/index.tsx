import type { Imageblock, Slideshow, Bento2, Youtube, Features } from "@/types/types.sanity";
import { v4 as uuidv4 } from 'uuid';
import { ImageBlock } from "./ImageBlock";
import Bento2Block from "./Bento2Block";
import SlideshowBlock from "./SlideshowBlock";
import FeaturesBlock from "./FeaturesBlock";
import YouTube from "./YouTube";
import GalleryBlock from "./GalleryBlock";
import { GalleryBlock as GalleryBlockType } from "@/types/types.sanity";
interface IBlock {
  children?: React.ReactNode
}

const Block = ({ children }: IBlock) => {
  return <div id={uuidv4()} className="my-16">{children}</div>
}

export const components = {
  types: {
    image: ({ value }: { value: Imageblock }) => {
      return (
        <Block>
          <ImageBlock {...value} />
        </Block>
      );
    },
    features: ({ value }: { value: Features }) => {
      return (
        <Block>
          <FeaturesBlock {...value} />
        </Block>
      );
    },
    slideshow: ({ value }: { value: Slideshow }) => {
      const id = uuidv4()
      return value && (
        <div id={id} className="mb-16">
          <SlideshowBlock {...value} />
        </div>
      )
    },
    bento2: ({ value }: { value: Bento2 }) => {
      const id = uuidv4()
      return value && (
        <div id={id} className="mb-16">
          <Bento2Block {...value} />
        </div>
      )
    },
    youtube: async ({ value }: { value: Youtube }) => {
      const id = uuidv4()
      return (
        <div id={id} className="aspect-video mx-auto mb-16 max-w-[640px]">
          <YouTube value={value} />
        </div>
      );
    },
    galleryBlock: ({ value }: { value: GalleryBlockType }) => {
      return (
        <Block>
          <GalleryBlock value={value} />
        </Block>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode, value?: { href?: string } }) => {
      const rel = value?.href && !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value?.href || "#"}
          rel={rel}
          className="underline underline-offset-2 decoration-yellow decoration-2"
        >
          {children}
        </a>
      );
    },
  },
};
