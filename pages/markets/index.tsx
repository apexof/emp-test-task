import React from 'react';
import { NextPage } from 'next';
import { useGetMarkets } from '../../hooks/useMarkets';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Market } from '../../types/market';
import { shortenHash } from '../../utils/shortenHash';
import moment from 'moment';
import Link from 'next/link';
import Layout from '../../components/Layout';

const columns: ColumnsType<Market> = [
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: value => <Link href={`/markets/${value}`}>{shortenHash(value)}</Link>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Last Event Date',
    dataIndex: 'lastEventDate',
    key: 'lastEventDate',
    defaultSortOrder: 'descend',
    render: value => moment(value).format('DD.MM.YYYY'),
    sorter: (a, b) => a.lastEventDate - b.lastEventDate,
  },
  {
    title: 'Provider Address',
    dataIndex: 'providerAddress',
    key: 'providerAddress',
    render: value => shortenHash(value),
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Win Token',
    dataIndex: 'winToken',
    key: 'winToken',
  },
];

const MarketsPage: NextPage = () => {
  const { data: markets, error, isLoading } = useGetMarkets();

  if (isLoading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (markets) {
    return (
      <Layout>
        <Table dataSource={markets} columns={columns} />;
      </Layout>
    );
  }

  return (
    <Layout>
      <div>Error: {error?.message || 'unknown error'}</div>
    </Layout>
  );
};

export default MarketsPage;
