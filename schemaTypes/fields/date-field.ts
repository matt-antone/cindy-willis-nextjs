import { defineField } from "sanity";

export const date = defineField({
  name: "date",
  title: "Date",
  type: "datetime",
  description: "Select the date and time. This will be displayed in the specified format.",
  validation: (Rule: any) => Rule.required(),
  options: {
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'HH:mm',
    timeStep: 15,
  },
  initialValue: () => new Date().toISOString(),
})  