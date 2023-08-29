import type { NextPage } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import { Button, DatePicker, Form, Input } from 'antd';

type FieldType = {
  cutoffDate?: number;
  decisionDate?: number;
  decisionProvider?: string;
  description?: string;
};

const Home: NextPage = () => {
  const onFinish = (values: FieldType) => {
    console.log('Success:', values.cutoffDate);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="Cutoff Date" name="cutoffDate" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item<FieldType> label="Decision Date" name="decisionDate" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType> label="Decision Provider" name="decisionProvider" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="Description" name="description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Home;
