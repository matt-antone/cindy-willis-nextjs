import { defineType } from 'sanity'
import * as fields from '../fields'
import { RiPaintFill } from "react-icons/ri";

export const finish = defineType({
  name: 'finish',
  title: 'Finishes',
  type: 'document',
  description: 'Add a finish to the site.',
  icon: RiPaintFill,
  fields: [
    fields.title,
    fields.body,
    fields.image,
    fields.gallery,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})