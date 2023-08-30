import React, { FC } from 'react';
import Layout from '../../components/Layout';
import { useContractReads } from 'wagmi';
import { predictionMarket } from '../../constants/abi/predictionMarket';
import { Address, ContractFunctionConfig } from 'viem';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../constants';

interface Props {
  marketAddress: `0x${string}`;
}

export const Market: FC<Props> = props => {
  const { marketAddress } = props;

  const contracts = [
    {
      abi: predictionMarket.abi,
      address: marketAddress,
      functionName: 'getDescription',
    },
    {
      abi: predictionMarket.abi,
      address: marketAddress,
      functionName: 'getCutoffDate',
    },
  ];

  const { data, error, isLoading } = useContractReads<any[], boolean, any>({ contracts });

  return (
    <Layout>
      {marketAddress}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : data ? (
        <div>
          <div>Description: {data[0].result}</div>
          <div>Cutoff Date: {dayjs(Number(data[1].result)).format(DATE_FORMAT)}</div>
          <div>Cutoff Timestamp: {Number(data[1].result)}</div>
        </div>
      ) : null}
    </Layout>
  );
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
