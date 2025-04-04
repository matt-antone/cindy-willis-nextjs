import { cn } from '@/lib/utils';
import * as React from 'react';
import Footer from './Footer';
import Header from './Header';

interface ILayoutProps {
  children: React.ReactNode;
  hasStickyHeader?: boolean;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children, hasStickyHeader = false }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header isSticky={hasStickyHeader} />
      <div className={cn("pb-36 relative animate-fade-in", hasStickyHeader ? "" : "")}>
        {children}
      </div>
      <Footer showLogo />
    </div>
  );
};

export default Layout;
