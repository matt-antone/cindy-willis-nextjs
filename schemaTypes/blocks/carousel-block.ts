import { defineField, defineType } from "sanity";
import { IoImagesOutline } from "react-icons/io5";
import { SlideshowPreview } from "../../components/slideshow-preview";

export const carousel = defineType({
  name: "carousel",
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
              type: "blockContent",
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
    defineField({
      name: "interval",
      title: "Slide interval",
      type: "number",
      description: "Time in seconds between slide transitions",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(15),
      hidden: ({ document }) => !document?.autoplay,
    }),
  ],
  preview: {
    select: {
      title: "title",
      images: "images",
      image0: "images.0.asset.url",
      image1: "images.1.asset.url",
      image2: "images.2.asset.url",
      image3: "images.3.asset.url",
      image4: "images.4.asset.url",
      image5: "images.5.asset.url",
      image6: "images.6.asset.url",
    },
    prepare({ title, images }) {
      console.log({ images })
      const imageArray: string[] = []
      Object.keys(images).forEach((key) => {
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
    preview: SlideshowPreview,
  },
});