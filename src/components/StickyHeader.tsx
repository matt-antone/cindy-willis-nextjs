import { cn } from '@/lib/utils';
import * as React from 'react';

interface IStickyHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const StickyHeader: React.FunctionComponent<IStickyHeaderProps> = ({ children, className }) => {
  return (
    <header className={cn("sticky top-0 z-50 w-full", className)}>
      {children}
    </header>
  );
};

export default StickyHeader;