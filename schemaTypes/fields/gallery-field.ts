import { defineField } from 'sanity';

export const gallery = defineField({
  name: "gallery",
  title: "Gallery",
  type: "array",
  of: [{ type: "image" }],
  description: "Add images to the gallery. Metadata is stored in the Media Tab. Please enter the metadata there.",
  options: {
    sortable: true,
    layout: "grid",
  },
}); 