import { Button, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { DATE_FORMAT } from '../constants';
import { predictionMarketFactory } from '../constants/abi/predictionMarketFactory';
import { shortenHash } from '../utils/shortenHash';
import Link from 'next/link';
import { CreateMarketForm } from '../types/market';

interface Props extends CreateMarketForm {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const ModalCreateMarket: FC<Props> = props => {
  const { isModalOpen, cutoffDate, decisionDate, decisionProvider, description, setIsModalOpen } = props;

  const {
    data,
    isLoading: writeLoading,
    isSuccess,
    write,
    error: writeError,
  } = useContractWrite({
    address: predictionMarketFactory.address,
    abi: predictionMarketFactory.abi,
    functionName: 'createMarket',
    args: [cutoffDate, decisionDate, decisionProvider, description],
  });

  const { data: tx, error: txError, isLoading: txLoading } = useWaitForTransaction({ hash: data?.hash });
  const error = writeError || txError;
  const isLoading = writeLoading || txLoading;

  return (
    <Modal
      title="Create Market"
      open={isModalOpen}
      destroyOnClose
      footer={[
        <Button key="back" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={isLoading} disabled={!write || (isSuccess && !!tx)} onClick={() => write?.()}>
          Confirm
        </Button>,
      ]}
    >
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <div style={{ color: 'red' }}>{error.message}</div>
      ) : isSuccess && tx ? (
        <div>
          <div>Market {shortenHash(tx.logs[0].address)} created successfully!</div>
          <Link target="_blank" href={`/markets/${tx.logs[0].address}`}>
            Open Market Page
          </Link>
        </div>
      ) : (
        <div>
          <div>Cutoff Date: {dayjs(Number(cutoffDate)).format(DATE_FORMAT)}</div>
          <div>Decision Date: {dayjs(Number(decisionDate)).format(DATE_FORMAT)}</div>
          <div>Description: {description}</div>
          <div>Decision Provider: {shortenHash(decisionProvider)}</div>
        </div>
      )}
    </Modal>
  );
};
