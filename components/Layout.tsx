import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export const Layout: FC<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <div>
      <Head>
        <title>EMP</title>
        <meta name="description" content="EMP" />
      </Head>
      <header style={{ padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link href="/">Create Market</Link>&nbsp;&nbsp;&nbsp;
          <Link href="/markets">All Markets</Link>
        </div>
        <ConnectButton />
      </header>
      <main>{children}</main>
    </div>
  );
};
