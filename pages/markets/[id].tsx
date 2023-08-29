import React, { FC } from 'react';
import Layout from '../../components/Layout';
import { useContractRead } from 'wagmi';
import predictionMarket from '../../constants/abi/predictionMarket.json';

interface Props {
  marketAddress: `0x${string}`;
}

export const Market: FC<Props> = props => {
  const { marketAddress } = props;

  const { data, isError, isLoading, error } = useContractRead({
    address: marketAddress,
    abi: predictionMarket,
    functionName: 'getState',
  });

  console.log('data', data);
  console.log('isLoading', isLoading);
  console.log('error', error);

  return <Layout>{marketAddress}</Layout>;
};

export default Market;

export async function getStaticProps({ params }) {
  return {
    props: {
      marketAddress: params.id,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}
