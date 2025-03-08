import { defineType } from 'sanity'
import * as fields from '../fields'
import { FaHome } from "react-icons/fa";


export const unit = defineType({
  name: 'unit',
  title: 'Units',
  type: 'document',
  description: 'Add a unit to the site.',
  icon: FaHome,
  initialValue: {
    isPenthouse: false,
    details: {
      bedrooms: 2,
      bathrooms: 2,
    },
  },
  fields: [
    {
      name: 'unitId',
      title: 'Unit ID',
      type: 'number',
    },
    {
      name: "isPenthouse",
      title: "Is Penthouse",
      type: "boolean",
      description: "If the unit is a penthouse.",
    },
    {
      name: 'details',
      title: 'Details',
      type: 'object',
      fields: [
        {
          name: 'isPenthouse',
          title: 'Is Penthouse',
          type: 'boolean',
          description: 'If the unit is a penthouse.',
        },
        {
          name: "isSold",
          title: "Is Sold",
          type: "boolean",
          description: "If the unit is sold.",
        },
        {
          name: 'sqft',
          title: 'Square Footage',
          type: 'number',
          description: 'Square footage of the unit.',
        },
        {
          name: 'patioSqFt',
          title: 'Patio Square Footage',
          type: 'number',
        },
        {
          name: 'bedrooms',
          title: 'Bedrooms',
          type: 'number',
        },
        {
          name: 'bathrooms',
          title: 'Bathrooms',
          type: 'number',
        },
        {
          name: 'model',
          title: 'Model',
          type: 'reference',
          to: [{ type: 'model' }],
        },
      ],
      options: {
        columns: 2,
      },
    },
    {
      name: 'floor',
      title: 'Floor Location',
      type: 'image',
      description: 'Image of the floor location of the unit.',
    },
    {
      name: 'floorPlan',
      title: 'Floor Plan',
      type: 'image',
      description: 'Image of the floor plan of the unit.',
    },
    {
      name: "finishes",
      title: "Finishes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "finish" }] }],
      description: "Finishes of the unit.",
    },
    {
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      description: 'PDF of the unit.',
    },
  ],
  preview: {
    select: {
      title: 'unitId',
      subtitle: 'details.sqft',
      details: 'details',
    },
    prepare(selection) {
      const { title, subtitle, details } = selection
      return {
        title,
        subtitle: `${details.sqft}sqft, patio: ${details.patioSqFt}sqft, ${details.bedrooms}bd / ${details.bathrooms}ba`,
      }
    },
  },
})
