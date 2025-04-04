import { default as white } from './white';
import { default as black } from './black';

export default {
  white,
  black,
} as const;

export const createSingleColorProse = (color: string) => {
  return {
    css: {
      '--tw-prose-body': color,
      '--tw-prose-headings': color,
      '--tw-prose-lead': color,
      '--tw-prose-links': color,
      '--tw-prose-bold': color,
      '--tw-prose-counters': color,
      '--tw-prose-bullets': color,
      '--tw-prose-hr': color,
      '--tw-prose-quotes': color,
      '--tw-prose-quote-borders': color,
      '--tw-prose-captions': color,
      '--tw-prose-code': color,
      '--tw-prose-pre-code': color,
      '--tw-prose-pre-bg': color,
      '--tw-prose-th-borders': color,
      '--tw-prose-td-borders': color,
      '--tw-prose-invert-body': color,
      '--tw-prose-invert-headings': color,
      '--tw-prose-invert-lead': color,
      '--tw-prose-invert-links': color,
      '--tw-prose-invert-bold': color,
      '--tw-prose-invert-counters': color,
      '--tw-prose-invert-bullets': color,
      '--tw-prose-invert-hr': color,
      '--tw-prose-invert-quotes': color,
      '--tw-prose-invert-quote-borders': color,
      '--tw-prose-invert-captions': color,
      '--tw-prose-invert-code': color,
      '--tw-prose-invert-pre-code': color,
      '--tw-prose-invert-pre-bg': color,
      '--tw-prose-invert-th-borders': color,
      '--tw-prose-invert-td-borders': color,
    },
  };
};