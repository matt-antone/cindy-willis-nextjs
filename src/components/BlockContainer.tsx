import { cn } from '@/lib/utils';
import * as React from 'react';

interface IBlockContainerProps {
  children: React.ReactNode;
  className?: string;
}

const BlockContainer: React.FunctionComponent<IBlockContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("w-full flex flex-col gap-[var(--layout-gap)]", className)}>
      {children}
    </div>
  );
};

export default BlockContainer;
