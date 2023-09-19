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
  const [feeValue, setFeeValue] = useState('1');
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
      console.log('hash', hash);
      const receipt = await waitForTransaction({ hash });
      if (receipt?.status === 'success') {
        return true;
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
    const feePayed = await chargeUserInETH();

    if (!feePayed)
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
    console.log({ meta: JSON.stringify(meta) });
    const res = await fetch('/api/attest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: getAddress(address!),
        score: parseInt(score.toString()),
        meta: JSON.stringify(meta), // TODO: move this to ipfs, data got bigger
        network: chainId,
      }),
    });
    const attestationUID = await res.json();
    fetchAttestations();
    console.log({ res });
    console.log('attestationUID', attestationUID);
    toast({
      title: 'Done!',
      description: 'We have created your attestation.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    return attestationUID;
  };

  return {
    mintAttestation,
    attestations,
    lastAttestation,
  };
}

export default useEAS;
