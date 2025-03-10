import { home } from './types/home-type';
import { page } from './types/page-type';
import { post } from './types/post-type';
import { blockContent } from './types/blockContent';
import { settings } from './types/settings-type';
import * as blocks from './blocks'

export const schemaTypes = [
  home,
  page,
  post,
  blockContent,
  settings,
  ...Object.values(blocks)
]
