import { Address, Hex, getAddress } from 'viem';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import { useWalletClient, useNetwork } from 'wagmi';
import {
  waitForTransaction,
  sendTransaction,
  prepareSendTransaction,
} from '@wagmi/core';
import { parseEther } from 'viem';

import { fetchCurrentETHPrice } from '@/helpers/ethHelpers';
import { getScoreAttestations } from '@/helpers/eas';
import { ATTESTER_ADDRESS, ATTESTATION_FEE_USD } from '@/constants';
import {
  checkPendingReceipt,
  updateScoreRecord,
} from '@/helpers/databaseHelpers';
import { formatNumber } from '@/utils/strings';

function useEAS(address: Address | string | Hex | undefined) {
  const toast = useToast();
  const { data: walletClient } = useWalletClient();
  const { chain } = useNetwork();
  const chainId = chain?.id;
  const [ethToUsdPrice, setEthToUsdPrice] = useState(0);
  // TODO: FIX TYPES
  const [attestations, setAttestations] = useState(null);
  const [lastAttestation, setLastAttestation] = useState<any>(null);
  useEffect(() => {
    async function fetchETHPrice() {
      try {
        const currentPrice = await fetchCurrentETHPrice();
        setEthToUsdPrice(currentPrice);
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
          to: ATTESTER_ADDRESS,
          value: parseEther(
            ethToUsdPrice
              ? (ATTESTATION_FEE_USD / ethToUsdPrice).toString()
              : '0',
          ),
        });
        const { hash } = await sendTransaction(request);
        console.log('Fee payment hash: ', hash);
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
    if (address && chainId) {
      const fetch = await getScoreAttestations(getAddress(address), chainId);
      const attestations = fetch?.attestations;
      setAttestations(attestations);
      setLastAttestation(attestations[0]);
    }
  };

  useEffect(() => {
    fetchAttestations();
  }, [address]);

  const mintAttestation = async (score: number, meta: any, scoreData: any) => {
    try {
      // check right network
      if (chainId !== 11155111 && chainId !== 10)
        throw new Error('Wrong network');

      console.log({ address, score, meta, scoreData });
      if (
        !scoreData ||
        !chainId ||
        !address ||
        !score ||
        !meta ||
        !walletClient
      )
        return;
      toast({
        title: 'Payment',
        description: "We're sending a payment transaction",
        status: 'info',
        duration: 10000,
        isClosable: true,
      });
      // Charge fee in ETH
      const txReceipt = await chargeUserInETH();
      console.log('Transaction Receipt: ', txReceipt);

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
        isClosable: true,
      });

      // Upload to IPFS
      const pinataRes = await fetch('/api/pinataUpload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meta,
          address: getAddress(address!),
        }),
      });
      const { ipfsHash } = await pinataRes.json();

      if (!ipfsHash) {
        console.error('Failed to upload to Pinata');
        return;
      }
      console.log('IPFS Hash: ', ipfsHash);
      const res = await fetch('/api/attest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: scoreData,
          address: getAddress(address!),
          score: formatNumber(score),
          meta,
          network: chainId,
          receipt: txReceipt,
          ipfsHash,
        }),
      });
      const attest = await res.json();
      console.log('EAS Hash: ', attest);
      if (attest?.error) throw attest.error;

      const attestationIDTx = await waitForTransaction({
        chainId,
        hash: attest,
      });
      const attestationID = attestationIDTx.logs[0].data;
      console.log('Mined attestation UID:', attestationID);

      fetchAttestations();
      console.log('attestationUID', attest);
      await updateScoreRecord({
        id: scoreData.id,
        address: getAddress(address!),
        meta,
        score,
        version: scoreData.version,
        ipfs_hash: ipfsHash,
        receipt: txReceipt,
        attestation: attestationID,
      });
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
        description: `Error in mintAttestation: ${
          error.message || error.reason
        }`,
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
