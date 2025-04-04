import * as React from 'react';

const SkipToContent: React.FunctionComponent = () => {
  return (
    <a href="#content" className="sr-only focus:not-sr-only">
      Skip to content
    </a>
  );
};

export default SkipToContent;
