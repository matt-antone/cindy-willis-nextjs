import { defineField, defineType } from "sanity";
import { IoImagesOutline } from "react-icons/io5";
import CarouselPreview from "../../../components/carousel-preview";
import { ComponentType } from "react";

export const carouselBlock = defineType({
  name: "carouselBlock",
  title: "Carousel",
  type: "object",
  icon: IoImagesOutline,
  description: 'Add a collection of images with text that display as a carousel',
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional title for the carousel",
    }),

    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              type: "image",
              name: "image",
              title: "Image",
              options: {
                hotspot: true,
              },
            },
            {
              type: "basicBlockContent",
              name: "body",
              title: "Body",
              description: "Formatted text that appears in the carousel",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "autoplay",
      title: "Auto-play slideshow",
      type: "boolean",
      description: "Automatically advance through slides",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      images: "images",
    },
    prepare({ title, images }) {
      const imageArray: string[] = []
      images && Object.keys(images).forEach((key) => {
        console.log({ key, image: images[key] })
        if (images[key]) {
          imageArray.push(images[key])
        }
      })
      console.log({ imageArray })
      return {
        title: title || 'Slideshow',
        subtitle: imageArray.length === 1 ? '1 image' : `${imageArray.length} images`,
        images: imageArray,
      };
    },
  },
  components: {
    preview: CarouselPreview as ComponentType<any>,
  },
});