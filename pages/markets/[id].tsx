import { Alert } from 'antd';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { useContractReads } from 'wagmi';
import Layout from '../../components/Layout';
import { DATE_FORMAT } from '../../constants';
import { predictionMarket } from '../../constants/abi/predictionMarket';

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
        <Alert message={error?.message} type="error" />
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
