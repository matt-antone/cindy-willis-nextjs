import { defineType } from 'sanity'
import * as fields from '../fields'
import { RiPagesLine } from "react-icons/ri";

export const post = defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',
  description: 'Add a post to the site.',
  icon: RiPagesLine,
  fields: [
    fields.date,
    fields.title,
    fields.slug,
    fields.description,
    fields.categories,
    fields.tags,
    fields.body,
    fields.gallery,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'gallery.0.asset',
    },
  },
})
