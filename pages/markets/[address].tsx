import { Alert } from 'antd';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { useContractReads } from 'wagmi';
import Layout from '../../components/Layout';
import { DATE_FORMAT } from '../../constants';
import { predictionMarket } from '../../constants/abi/predictionMarket';
import { useRouter } from 'next/router';
import { ContractFunctionConfig } from 'viem';

const functionNames = ['getDescription', 'getCutoffDate', 'getState'];

const getContracts = (marketAddress: `0x${string}`): ContractFunctionConfig[] => {
  const contracts = functionNames.map(functionName => ({
    abi: predictionMarket.abi,
    address: marketAddress,
    functionName,
  }));
  return contracts;
};

interface Props {
  marketAddress: `0x${string}`;
}

export const Market: FC<Props> = props => {
  const { marketAddress } = props;
  const contracts = getContracts(marketAddress);

  const { data, error, isLoading } = useContractReads<any[], boolean, any>({ contracts });

  return (
    <Layout>
      {marketAddress}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <Alert message={error?.message} type="error" />
      ) : data ? (
        <div>
          <div>Description: {data[0].result}</div>
          <div>Cutoff Date: {dayjs(Number(data[1].result)).format(DATE_FORMAT)}</div>
          <div>Cutoff Timestamp: {Number(data[1].result)}</div>
          <div>State: {Number(data[2].result)}</div>
        </div>
      ) : null}
    </Layout>
  );
};

export default Market;

export async function getStaticProps({ params }) {
  return {
    props: {
      marketAddress: params.address,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}
