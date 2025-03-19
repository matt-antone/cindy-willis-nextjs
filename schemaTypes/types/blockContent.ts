import { defineType } from 'sanity'
import * as blocks from "../blocks"

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  options: {
    search: {
      weight: 9,
    },
  },
  of: [
    {
      type: 'image',
    },
    {
      type: 'block',
    },
    { type: 'youtube' },
    { type: 'bento2' },
    { type: 'slideshow' },
    { type: 'features' }
  ],
})
