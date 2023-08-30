import { Button, DatePicker, Form, Input } from 'antd';
import { Dayjs } from 'dayjs';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import Layout from '../components/Layout';
import { ModalCreateMarket } from '../components/ModalCreateMarket';
import { ModalExistMarketAlert } from '../components/ModalExistMarketAlert';
import { ZERO_ADDRESS } from '../constants';
import { predictionMarketFactory } from '../constants/abi/predictionMarketFactory';
import { CreateMarketForm } from '../types/market';

interface CreateMarketFormRaw {
  cutoffDate: Dayjs;
  decisionDate: Dayjs;
  decisionProvider: `0x${string}`;
  description: string;
}

const Home: NextPage = () => {
  const [isExistMarketModalOpen, setIsExistMarketModalOpen] = useState(false);
  const [isCreateMarketModalOpen, setIsCreateMarketModalOpen] = useState(false);
  const [form, setForm] = useState<CreateMarketForm>();
  const [existMarketAddress, setExistMarketAddress] = useState<`0x${string}`>();

  const { isLoading, error } = useContractRead<typeof predictionMarketFactory.abi, string, `0x${string}`>({
    address: form ? predictionMarketFactory.address : undefined,
    abi: form ? predictionMarketFactory.abi : undefined,
    functionName: form ? 'getMarket' : undefined,
    args: form ? [form.description, form.cutoffDate] : undefined,
    enabled: !!form,
    onSettled: address => {
      if (!address) {
        return;
      }
      if (address !== ZERO_ADDRESS) {
        setExistMarketAddress(address);
        setIsExistMarketModalOpen(true);
      } else {
        setIsCreateMarketModalOpen(true);
      }
    },
  });

  const onFinish = (values: CreateMarketFormRaw) => {
    setForm({
      description: values.description,
      decisionProvider: values.decisionProvider,
      cutoffDate: BigInt(values.cutoffDate.millisecond(0).valueOf()),
      decisionDate: BigInt(values.decisionDate.millisecond(0).valueOf()),
    });
  };

  return (
    <Layout>
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
        <Form.Item<CreateMarketFormRaw> label="Cutoff Date" name="cutoffDate" rules={[{ required: true }]}>
          <DatePicker showTime />
        </Form.Item>

        <Form.Item<CreateMarketFormRaw> label="Decision Date" name="decisionDate" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item<CreateMarketFormRaw> label="Decision Provider" name="decisionProvider" rules={[{ required: true, pattern: /^0x[a-fA-F0-9]{40}$/ }]}>
          <Input />
        </Form.Item>
        <Form.Item<CreateMarketFormRaw> label="Description" name="description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {existMarketAddress && <ModalExistMarketAlert marketAddress={existMarketAddress} isModalOpen={isExistMarketModalOpen} setIsModalOpen={setIsExistMarketModalOpen} />}
      {form && <ModalCreateMarket isModalOpen={isCreateMarketModalOpen} setIsModalOpen={setIsCreateMarketModalOpen} {...form} />}
    </Layout>
  );
};

export default Home;
