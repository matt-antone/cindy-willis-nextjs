import { cn } from '@/lib/utils';
import * as React from 'react';

interface IProseProps {
  children?: React.ReactNode;
  color?: string;
  className?: string;
}

const Prose: React.FunctionComponent<IProseProps> = ({ children, color, className }) => {
  // if you want to use dark mode: dark:prose-invert 
  return (
    <div className={cn(`prose ${color ? `prose-${color}` : ''} max-w-none`, className)}>
      {children}
    </div>
  );
};

export default Prose;
