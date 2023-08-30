import { Button, DatePicker, Form, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useContractRead, usePublicClient } from 'wagmi';
import Layout from '../components/Layout';
import { ModalCreateMarket } from '../components/ModalCreateMarket';
import { ModalExistMarketAlert } from '../components/ModalExistMarketAlert';
import { ZERO_ADDRESS } from '../constants';
import { predictionMarketFactory } from '../constants/abi/predictionMarketFactory';

interface CreateMarketForm {
  cutoffDate: Dayjs;
  decisionDate: Dayjs;
  decisionProvider: `0x${string}`;
  description: string;
}

const Home: NextPage = () => {
  const publicClient = usePublicClient();
  const [isExistMarketModalOpen, setIsExistMarketModalOpen] = useState(false);
  const [isCreateMarketModalOpen, setIsCreateMarketModalOpen] = useState(false);
  const [form, setForm] = useState<CreateMarketForm>();
  const [existMarketAddress, setExistMarketAddress] = useState<`0x${string}`>();

  const onFinish = async (values: CreateMarketForm) => {
    const cutoffDate = values.cutoffDate.millisecond(0);
    const decisionDate = values.decisionDate.millisecond(0);

    const marketAddress = await publicClient.readContract<typeof predictionMarketFactory.abi, string>({
      address: predictionMarketFactory.address,
      abi: predictionMarketFactory.abi,
      functionName: 'getMarket',
      args: [values.description, BigInt(cutoffDate.valueOf())],
    });
    if (marketAddress !== ZERO_ADDRESS) {
      if (marketAddress) {
        setExistMarketAddress(marketAddress);
        setIsExistMarketModalOpen(true);
      }
    } else {
      setForm({ ...values, decisionDate, cutoffDate });
      setIsCreateMarketModalOpen(true);
    }
  };

  return (
    <Layout>
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
        <Form.Item<CreateMarketForm> label="Cutoff Date" name="cutoffDate" rules={[{ required: true }]}>
          <DatePicker showTime />
        </Form.Item>

        <Form.Item<CreateMarketForm> label="Decision Date" name="decisionDate" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item<CreateMarketForm> label="Decision Provider" name="decisionProvider" rules={[{ required: true, pattern: /^0x[a-fA-F0-9]{40}$/ }]}>
          <Input />
        </Form.Item>
        <Form.Item<CreateMarketForm> label="Description" name="description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={false} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {existMarketAddress && <ModalExistMarketAlert marketAddress={existMarketAddress} isModalOpen={isExistMarketModalOpen} setIsModalOpen={setIsExistMarketModalOpen} />}
      {form && (
        <ModalCreateMarket
          isModalOpen={isCreateMarketModalOpen}
          setIsModalOpen={setIsCreateMarketModalOpen}
          cutoffDate={form.cutoffDate}
          decisionDate={form.decisionDate}
          description={form.description}
          decisionProvider={form.decisionProvider}
        />
      )}
    </Layout>
  );
};

export default Home;
