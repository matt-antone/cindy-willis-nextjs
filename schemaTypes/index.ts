import { home } from './types/home-type';
import { page } from './types/page-type';
import { blockContent } from './types/blockContent';
import { settings } from './types/settings-type';
import * as blocks from './blocks'

export const schemaTypes = [
  home,
  page,
  blockContent,
  settings,
  ...Object.values(blocks)
]
