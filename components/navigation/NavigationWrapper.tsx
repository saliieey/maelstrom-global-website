'use client';

import dynamic from 'next/dynamic';

const Navigation = dynamic(
  () => import('./Navigation').then((mod) => mod.Navigation),
  { 
    ssr: false,
    loading: () => (
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 md:h-[72px] lg:h-16 bg-neutral-900/80 backdrop-blur-md border-b border-white/10" />
    ),
  }
);

export const NavigationWrapper = () => {
  return <Navigation />;
};
