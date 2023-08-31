import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from 'antd';
import React, { FC, PropsWithChildren } from 'react';
import { Chain, useNetwork, useSwitchNetwork } from 'wagmi';

interface Props {
  targetChain: Chain;
}

export const SwitchNetworkBtnWrap: FC<PropsWithChildren<Props>> = props => {
  const { targetChain, children } = props;
  const { switchNetwork, isLoading } = useSwitchNetwork();
  const { chain } = useNetwork();

  return !chain ? (
    <ConnectButton />
  ) : chain.id !== targetChain.id ? (
    <Button
      type="primary"
      loading={isLoading}
      onClick={() => {
        if (switchNetwork) {
          switchNetwork(targetChain.id);
        }
      }}
    >
      Switch to {targetChain.name}
    </Button>
  ) : (
    <>{children}</>
  );
};
