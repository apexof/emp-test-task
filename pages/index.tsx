import dynamic from 'next/dynamic';
import React from 'react';

const HomePageContent = dynamic(() => import('../components/HomePageContent'), { ssr: false });

export default function HomePage() {
  return (
    <div>
      <HomePageContent />
    </div>
  );
}
