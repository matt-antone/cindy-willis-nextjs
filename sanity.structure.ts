// ./structure/index.ts

import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Base')
    .items([
      S.documentTypeListItem('home').title(
        'Home',
      ).child(
        S.editor()
          .id('home')
          .schemaType('home')
          .documentId('home')
      ),
      // list all document types except 'siteSettings'
      ...S.documentTypeListItems().filter(
        (item) => !["home", "settings"].includes(item.getId() || "")
      ),
      S.divider(),
      // then add the 'sideSettings' type separate
      S.documentTypeListItem('settings').title(
        'Settings',
      ).child(
        S.editor()
          .id('settings')
          .schemaType('settings')
          .documentId('settings')
      ),
    ])
