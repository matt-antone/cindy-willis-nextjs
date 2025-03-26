import { defineField } from "sanity";

export const name = defineField({
  title: "Name",
  name: "name",
  type: "object",
  description: 'Enter the full name of the person. This will display in the profile.',
  validation: Rule => Rule.required(),
  fields: [
    {
      title: "Prefix",
      name: "prefix",
      type: "string",
      description: "Title or prefix (e.g., Dr., Mr., Mrs., etc.)",
    },
    {
      title: "First Name",
      name: "firstName",
      type: "string",
      description: "The person's first or given name",
    },
    {
      title: "Middle Name",
      name: "middleName",
      type: "string",
      description: "The person's middle name or names",
    },
    {
      title: "Last Name",
      name: "lastName",
      type: "string",
      description: "The person's last name or family name",
    },
    {
      title: "Suffix",
      name: "suffix",
      type: "string",
      description: "Suffix or post-nominal letters (e.g., Jr., Sr., PhD, etc.)",
    },
  ],
})