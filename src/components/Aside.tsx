import { cn } from '@/lib/utils';
import * as React from 'react';

interface IAsideProps {
  children: React.ReactNode;
  className?: string;
}

const Aside: React.FunctionComponent<IAsideProps> = ({ children, className }) => {
  return (
    <aside className={cn("basis-1/4", className)}>
      {children}
    </aside>
  );
};

export default Aside;
