import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';

export const RegenScoreSchemaUID =
  '0xa1285d8c9b3164eb94f22a4084d4d01fc7fb66d27c56ddba32033c63a5ed76cd';
export const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e'; // Sepolia v0.26

export const createAttestation = async (
  address: string,
  score: number,
  meta: any,
  signer: any,
) => {
  try {
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

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: address,
        expirationTime: BigInt(0),
        revocable: true,
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();

    console.log('New attestation UID:', newAttestationUID);
    return newAttestationUID;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const getScoreAttestations = async (address: string): Promise<any> => {
  try {
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

    const response = await fetch('https://sepolia.easscan.org/graphql', {
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
