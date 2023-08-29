import Head from 'next/head';
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta name="description" content="EMP" />
      </Head>
      <header>
        <ConnectButton />
      </header>
      <main>{children}</main>
    </div>
  );
}