'use client';

import dynamic from 'next/dynamic';

const Navigation = dynamic(
  () => import('./Navigation').then((mod) => mod.Navigation),
  { ssr: false }
);

export const NavigationWrapper = () => {
  return <Navigation />;
};
