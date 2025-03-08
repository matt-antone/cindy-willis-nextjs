import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { media } from "sanity-plugin-media";
import { structure } from "./sanity.structure";

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_PROJECT_NAME || 'Sanity Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',

  plugins: [structureTool({ structure }), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
