import * as React from 'react';
import type { TypedObject } from 'sanity';
import { PortableText } from '@portabletext/react';
import Prose from './Prose';
import { components } from './blocks'

interface ISanityContentProps {
  content: TypedObject
}

const SanityContent: React.FunctionComponent<ISanityContentProps> = ({ content }) => {
  return (
    <Prose>
      <PortableText value={content} components={components} />
    </Prose>
  );
};

export default SanityContent;
