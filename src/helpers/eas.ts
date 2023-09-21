import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { Address } from 'viem';

// TODO: MOVE THIS TO ENV VARS FOR KEYCHECK PASS AND REMOVE THE FILE ON KEYCHECKIGNORE
export const RegenScoreSchemaUID =
  '0xa1285d8c9b3164eb94f22a4084d4d01fc7fb66d27c56ddba32033c63a5ed76cd';
export const EASContractAddressSepolia =
  '0xC2679fBD37d54388Ce493F1DB75320D236e1815e'; // v0.26
export const EASContractAddressOptimismMainnet =
  '0x4200000000000000000000000000000000000021'; // v1.0.1

export const createAttestation = async (
  address: Address,
  score: number,
  meta: any,
  signer: any,
  network: number,
) => {
  try {
    // TODO: move this to utils
    const EASContractAddress =
      network === 11155111
        ? EASContractAddressSepolia
        : EASContractAddressOptimismMainnet;
    const eas = new EAS(EASContractAddress);
    eas.connect(signer);
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(
      'address address,uint256 score,string meta',
    );
    const encodedData = schemaEncoder.encodeData([
      { name: 'address', value: address, type: 'address' },
      { name: 'score', value: score, type: 'uint256' },
      { name: 'meta', value: JSON.stringify(meta), type: 'string' },
    ]);

    // Our current schema UID
    const schemaUID = RegenScoreSchemaUID;

    const attestation = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: address,
        expirationTime: BigInt(0),
        revocable: true,
        data: encodedData,
      },
    });
    const newAttestationHash = attestation.tx.hash;
    console.log('New attestation Hash:', newAttestationHash);
    return newAttestationHash;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const getScoreAttestations = async (
  address: Address,
  chainId: number,
): Promise<any> => {
  // TODO: get network name properly
  try {
    let easGraphql = 'https://optimism.easscan.org/graphql';
    if (chainId === 11155111) {
      easGraphql = 'https://sepolia.easscan.org/graphql';
    }
    const query = `
    query Attestation($where: AttestationWhereInput, $orderBy: [AttestationOrderByWithRelationInput!]) {
      attestations(where: $where, orderBy: $orderBy) {
        id
        attester
        recipient
        refUID
        revocable
        revocationTime
        expirationTime
        data
        timeCreated
        schemaId
        isOffchain
        ipfsHash
        revoked
        decodedDataJson
        schema{
          creator
          txid
          time
          schema
        }
      }
    }
    `;

    const variables = {
      where: {
        recipient: {
          equals: address,
        },
        schemaId: {
          equals: RegenScoreSchemaUID,
        },
      },
      orderBy: [
        {
          timeCreated: 'desc',
        },
      ],
    };

    const response = await fetch(easGraphql, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const jsonResponse = await response.json();
    return jsonResponse.data;
  } catch (error) {
    console.error('Error fetching attestation:', error);
    throw error;
  }
};
