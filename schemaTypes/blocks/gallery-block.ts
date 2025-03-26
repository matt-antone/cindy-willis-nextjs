import { defineField, defineType } from "sanity";
import { IoImagesOutline } from "react-icons/io5";
import { GalleryPreview } from "../../components/gallery-preview";

export const galleryBlock = defineType({
  name: "galleryBlock",
  title: "Gallery Block",
  type: "object",
  icon: IoImagesOutline,
  description: 'Add a collection of images with text that display as a carousel',
  fields: [
    defineField({
      name: "usePageGallery",
      title: "Use Page Gallery",
      type: "boolean",
      description: "If true, the gallery will use the page gallery",
      initialValue: false,
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      hidden: ({ parent }) => parent.usePageGallery,
      options: {
        sortable: true,
        layout: "grid",
      },
      of: [{ type: "image" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      images: "images",
      pageGallery: "^",
      usePageGallery: "usePageGallery",
      image0: "images.0.asset.url",
      image1: "images.1.asset.url",
      image2: "images.2.asset.url",
      image3: "images.3.asset.url",
      image4: "images.4.asset.url",
      image5: "images.5.asset.url",
      image6: "images.6.asset.url",
    },

    prepare(props) {
      const { title, images, pageGallery, usePageGallery } = props;
      console.log(props)
      const imageArray: string[] = []
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          imageArray.push(images[key])
        }
      })
      // console.log({ imageArray, pageGallery })
      return {
        title: title || 'Slideshow',
        subtitle: imageArray.length === 1 ? '1 image' : `${imageArray.length} images`,
        images: imageArray,
        otherImages: images,
        usePageGallery: usePageGallery,
      };
    },
  },
  components: {
    preview: GalleryPreview,
  },
});