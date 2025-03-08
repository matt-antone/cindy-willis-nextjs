import { defineField } from "sanity";

export const date = defineField({
  name: "date",
  title: "Date",
  type: "datetime",
  validation: (Rule: any) => Rule.required(),
  options: {
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'HH:mm',
    timeStep: 15,
  },
  initialValue: () => new Date().toISOString(),
})  