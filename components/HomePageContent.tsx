import { readContract } from '@wagmi/core';
import { Alert, Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import { polygonMumbai } from 'wagmi/chains';
import { Layout } from '../components/Layout';
import { ModalCreateMarket } from '../components/ModalCreateMarket';
import { ModalExistMarketAlert } from '../components/ModalExistMarketAlert';
import { ZERO_ADDRESS } from '../constants';
import { predictionMarketFactory } from '../constants/abi/predictionMarketFactory';
import { CreateMarketForm } from '../types/market';
import { SwitchNetworkBtnWrap } from './SwitchNetworkBtnWrap';

const HomePage: NextPage = () => {
  const [isExistMarketModalOpen, setIsExistMarketModalOpen] = useState(false);
  const [isCreateMarketModalOpen, setIsCreateMarketModalOpen] = useState(false);
  const [form, setForm] = useState<CreateMarketForm>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [existMarketAddress, setExistMarketAddress] = useState<`0x${string}`>();

  const onFinish = async (values: CreateMarketForm) => {
    const cutoffDate = values.cutoffDate.millisecond(0);
    const decisionDate = values.decisionDate.millisecond(0);
    setIsLoading(true);
    try {
      const address = await readContract({
        address: predictionMarketFactory.address,
        abi: predictionMarketFactory.abi,
        functionName: 'getMarket',
        args: [values.description, BigInt(cutoffDate.valueOf())],
      });

      if (address !== ZERO_ADDRESS) {
        setExistMarketAddress(address);
        setIsExistMarketModalOpen(true);
      } else {
        setForm({
          description: values.description,
          decisionProvider: values.decisionProvider,
          cutoffDate,
          decisionDate,
        });
        setIsCreateMarketModalOpen(true);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} onFinish={onFinish} autoComplete="off">
        <Form.Item<CreateMarketForm> label="Cutoff Date" name="cutoffDate" rules={[{ required: true }]}>
          <DatePicker showTime={{ defaultValue: dayjs().hour(0).minute(0).second(0) }} />
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
          <SwitchNetworkBtnWrap targetChain={polygonMumbai}>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Submit
            </Button>
          </SwitchNetworkBtnWrap>
        </Form.Item>
        {error && <Alert message={error?.message} type="error" />}
      </Form>

      {existMarketAddress && <ModalExistMarketAlert marketAddress={existMarketAddress} isModalOpen={isExistMarketModalOpen} setIsModalOpen={setIsExistMarketModalOpen} />}
      {form && <ModalCreateMarket isModalOpen={isCreateMarketModalOpen} setIsModalOpen={setIsCreateMarketModalOpen} {...form} />}
    </Layout>
  );
};

export default HomePage;
