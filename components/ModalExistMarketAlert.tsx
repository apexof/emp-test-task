import { Modal } from 'antd';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  marketAddress: `0x${string}`;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const ModalExistMarketAlert: FC<Props> = props => {
  const { isModalOpen, marketAddress, setIsModalOpen } = props;

  return (
    <Modal title="Market already exists" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
      <div>Market already exists!</div>
      <Link target="_blank" href={`/markets/${marketAddress}`}>
        Open Market Page
      </Link>
    </Modal>
  );
};
