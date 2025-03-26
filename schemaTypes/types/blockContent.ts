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
  options: {
    search: {
      weight: 9,
    },
  },
  of: blockTypes,
})
