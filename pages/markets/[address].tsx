import { NextPage } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';

const MarketPageContent = dynamic(() => import('../../components/MarketPageContent'), { ssr: false });

const MarketPage: NextPage = () => {
  return (
    <div>
      <MarketPageContent />
    </div>
  );
};
export default MarketPage;
