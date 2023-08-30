import React from 'react';
import { NextPage } from 'next';
import { useGetMarkets } from '../../hooks/useMarkets';
import { Alert, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Market } from '../../types/market';
import { shortenHash } from '../../utils/shortenHash';
import Link from 'next/link';
import Layout from '../../components/Layout';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../constants';

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
    render: (value: number) => {
      return dayjs(value).format(DATE_FORMAT);
    },
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

  return (
    <Layout>
      {isLoading ? (
        <div>Loading...</div>
      ) : markets && markets?.length > 0 ? (
        <Table dataSource={markets} columns={columns} />
      ) : error ? (
        <Alert message={error?.message} type="error" />
      ) : null}
    </Layout>
  );
};

export default MarketsPage;
