import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { media } from "sanity-plugin-media";
import { structure } from "./sanity.structure";

export default defineConfig({
  name: 'default',
  title: 'walkerscayresorts.com',

  projectId: 'b9d6znpl',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
