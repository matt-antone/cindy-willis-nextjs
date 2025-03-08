import { home } from './types/home-type';
import { page } from './types/page-type';
import { model } from './types/models-type';
import { unit } from './types/units';
import { finish } from './types/finishes-type';
import { blockContent } from './types/blockContent';
import { settings } from './types/settings-type';
import * as blocks from './blocks'
console.log(blocks)
export const schemaTypes = [
  home,
  page,
  model,
  unit,
  finish,
  blockContent,
  settings,
  ...Object.values(blocks)
]
