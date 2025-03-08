import { defineType } from 'sanity'
import * as blocks from "../blocks"

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    // Image with alt text
    {
      type: 'image',
    },
    // Block with inline styles
    {
      type: 'block',
    },
    // Add custom block types
    { type: 'twoColumnList' },
    { type: 'youtube' },
    { type: 'vimeo' },
    // { type: 'linkImage' },
    { type: 'bento2' },
    { type: 'slideshow' },
  ],
})
