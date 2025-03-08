import { defineType } from 'sanity'
import * as fields from '../fields'
import { MdLocationCity } from "react-icons/md";

export const model = defineType({
  name: 'model',
  title: 'Models',
  type: 'document',
  description: 'Add a model to the site.',
  icon: MdLocationCity,
  fields: [
    fields.date,
    fields.title,
    fields.body,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'gallery.0.asset',
    },
  },
})
