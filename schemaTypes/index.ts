import { home } from './types/home-type';
import { page } from './types/page-type';
import { post } from './types/post-type';
import { blockContent, basicBlockContent } from './types/blockContent';
import { settings } from './types/settings-type';
import * as blocks from './blocks'

export const schemaTypes = [
  home,
  page,
  post,
  blockContent,
  basicBlockContent,
  settings,
  ...Object.values(blocks)
]
