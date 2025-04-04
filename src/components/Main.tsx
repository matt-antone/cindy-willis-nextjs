import { cn } from '@/lib/utils';
import * as React from 'react';

interface IMainProps {
  children: React.ReactNode;
  hasAside?: boolean;
  className?: string;
}

const Main: React.FunctionComponent<IMainProps> = ({ children, hasAside = false, className }) => {
  return (
    <main className={cn("basis-full", hasAside ? "border-b md:border-b-0 md:border-r" : "", className)}>
      <div className={cn(hasAside ? "pb-(--layout-gap) md:pb-0 md:pr-(--layout-gap)" : "")}>
        {children}
      </div>
    </main>
  );
};

export default Main;
