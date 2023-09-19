import { Address, Hex, getAddress } from 'viem';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import {
  useWalletClient,
  usePrepareSendTransaction,
  useSendTransaction,
  useChainId,
} from 'wagmi';
import { Hash, waitForTransaction } from '@wagmi/core';
import { parseEther } from 'viem';

import { useScore } from './index';
import { getScoreAttestations } from '@/helpers/eas';
import { ATTESTER_PUBLIC_KEY } from '@/constants';

function useEAS(address: string | Hex | undefined) {
  const toast = useToast();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const { score, meta } = useScore(address);
  const [ethToUsdPrice, setEthToUsdPrice] = useState(0);
  // Fee setup
  const { config, error: prepareError } = usePrepareSendTransaction({
    to: ATTESTER_PUBLIC_KEY,
    value: parseEther(ethToUsdPrice ? (1 / ethToUsdPrice).toString() : '0'),
  });
  const { sendTransactionAsync } = useSendTransaction(config);

  // TODO: FIX TYPES
  const [attestations, setAttestations] = useState(null);
  const [lastAttestation, setLastAttestation] = useState<any>(null);
  useEffect(() => {
    async function fetchETHPrice() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        );
        const data = await response.json();
        setEthToUsdPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching ETH price:', error);
      }
    }
    fetchETHPrice();
  }, []);

  const chargeUserInETH = async () => {
    try {
      const tx = await sendTransactionAsync?.();
      const hash = tx?.hash as Hash;
      const receipt = await waitForTransaction({ hash });
      if (receipt?.status === 'success') {
        return hash;
      }
    } catch (error) {
      console.error('Error in transaction:', error);
      return false;
    }
  };

  const fetchAttestations = async () => {
    if (address) {
      const fetch = await getScoreAttestations(getAddress(address), chainId);
      const attestations = fetch?.attestations;
      setAttestations(attestations);
      setLastAttestation(attestations[0]);
    }
  };

  useEffect(() => {
    fetchAttestations();
  }, [address]);

  const mintAttestation = async () => {
    try {
      console.log({ address, score, meta, walletClient });
      if (!address || !score || !meta || !walletClient) return;
      toast({
        title: 'Payment',
        description: "We're sending a payment transaction",
        status: 'info',
        duration: 10000,
        isClosable: true,
      });
      // Charge fee in ETH
      const txReceipt = await chargeUserInETH();

      if (!txReceipt)
        return toast({
          title: 'Error',
          description: 'Fee payment unsuccessful. Please try again.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      toast({
        title: 'Minting',
        description:
          "We're creating your attestation. This may take a few seconds.",
        status: 'info',
        duration: 9000,
        isClosable: true,
      });

      const res = await fetch('/api/attest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: getAddress(address!),
          score: parseInt(score.toString()),
          meta,
          network: chainId,
          receipt: txReceipt,
        }),
      });
      const attest = await res.json();
      if (attest?.error)
        return toast({
          title: 'Error',
          description:
            'There was an error creating your attestation. Please try again.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      fetchAttestations();
      console.log('attestationUID', attest);
      toast({
        title: 'Done!',
        description: 'We have created your attestation.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      return attest;
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  return {
    mintAttestation,
    attestations,
    lastAttestation,
  };
}

export default useEAS;
