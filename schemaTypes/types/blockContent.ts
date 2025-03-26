import { defineType } from 'sanity'
import * as blocks from "../blocks"

let blockTypes = [];
blockTypes.push({
  type: 'image',
})
blockTypes.push({
  type: 'block',
})
blockTypes.push(...Object.keys(blocks).map((block) => ({ type: block })))

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  description: 'A flexible content area that can contain various types of blocks including text, images, and custom components.',
  options: {
    search: {
      weight: 9,
    },
  },
  of: blockTypes,
})
