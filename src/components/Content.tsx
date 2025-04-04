import { cn } from '@/lib/utils';
import * as React from 'react';

interface IContentProps {
  children: React.ReactNode;
  hasAside?: boolean;
  className?: string;
}

const Content: React.FunctionComponent<IContentProps> = ({ children, hasAside = false, className }) => {
  return (
    <div id="content" className={cn(
      `w-full py-[var(--layout-gap)] flex flex-col`,
      hasAside ? 'md:flex-row gap-[var(--layout-gap)]' : '',
      className
    )}>
      {children}
    </div>
  );
};

export default Content;
