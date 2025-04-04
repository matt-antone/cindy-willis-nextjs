import { cn } from '@/lib/utils';
import * as React from 'react';

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FunctionComponent<IContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("container mx-auto max-w-4xl px-8 relative", className)}>
      {children}
    </div>
  );
};

export default Container;
