import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const HomePageContent = dynamic(() => import('../components/HomePageContent'), { ssr: false });

const HomePage: NextPage = () => {
  return (
    <div>
      <HomePageContent />
    </div>
  );
};
export default HomePage;
