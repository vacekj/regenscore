import { Hex, getAddress } from 'viem';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import { useWalletClient } from 'wagmi';
import { useScore } from './index';
import { getScoreAttestations } from '@/helpers/eas';

function useEAS(address: string | Hex | undefined) {
  const toast = useToast();
  const { data: walletClient } = useWalletClient();
  const { score, meta } = useScore(address);

  // TODO: FIX TYPES
  const [attestations, setAttestations] = useState(null);
  const [lastAttestation, setLastAttestation] = useState<any>(null);

  const fetchAttestations = async () => {
    if (address) {
      const fetch = await getScoreAttestations(getAddress(address));
      const attestations = fetch?.attestations;
      setAttestations(attestations);
      setLastAttestation(attestations[0]);
    }
  };

  useEffect(() => {
    fetchAttestations();
  }, [address]);

  const mintAttestation = async () => {
    if (!address || !score || !meta || !walletClient) return;
    if (score < 50) return alert('Score too low to mint attestation');
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
        score,
        meta: JSON.stringify(meta),
      }),
    });
    const attestationUID = await res.json();
    fetchAttestations();

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
