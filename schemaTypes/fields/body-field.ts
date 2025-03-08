import { defineField } from 'sanity';

export const body = defineField({
  name: 'body',
  title: 'Body',
  description: 'Add content to the page',
  type: 'blockContent',
})