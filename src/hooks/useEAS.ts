import { Address, Hex, getAddress } from 'viem';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import { useWalletClient, useSendTransaction, useChainId } from 'wagmi';
import {
  Hash,
  waitForTransaction,
  sendTransaction,
  prepareSendTransaction,
} from '@wagmi/core';
import { parseEther } from 'viem';

import { useScore } from './index';
import { getScoreAttestations } from '@/helpers/eas';
import { ATTESTER_PUBLIC_KEY } from '@/constants';
import { checkPendingReceipt } from '@/helpers/databaseHelpers';

function useEAS(address: string | Hex | undefined) {
  const toast = useToast();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const { score, meta } = useScore(address);
  const [ethToUsdPrice, setEthToUsdPrice] = useState(0);

  // TODO: FIX TYPES
  const [attestations, setAttestations] = useState(null);
  const [lastAttestation, setLastAttestation] = useState<any>(null);
  useEffect(() => {
    async function fetchETHPrice() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEthToUsdPrice(data.ethereum.usd);
      } catch (error: any) {
        console.error('Error fetching ETH price:', error);
        toast({
          title: 'Error',
          description: `Error fetching ETH price: ${error?.message}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
    fetchETHPrice();
  }, []);

  const chargeUserInETH = async () => {
    try {
      // Check if user has a pending receipt
      let receipt: any = await checkPendingReceipt(address!);
      if (!receipt) {
        const request = await prepareSendTransaction({
          to: ATTESTER_PUBLIC_KEY,
          value: parseEther(
            ethToUsdPrice ? (1 / ethToUsdPrice).toString() : '0',
          ),
        });
        const { hash } = await sendTransaction(request);
        console.log({ hash });
        const newReceipt = await waitForTransaction({ chainId, hash });
        if (newReceipt?.status === 'success') {
          receipt = hash;
        }
      }
      return receipt;
    } catch (error: any) {
      console.error('Error in transaction:', error);
      toast({
        title: 'Error',
        description: `Error in transaction: ${error?.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
      console.log({ txReceipt });
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
      if (attest?.error) throw new Error(attest.error);

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
    } catch (error: any) {
      console.error('Error in mintAttestation:', error);
      toast({
        title: 'Error',
        description: `Error in mintAttestation: ${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
