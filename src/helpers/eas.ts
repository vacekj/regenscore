import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';

export const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e'; // Sepolia v0.26

export const createAttestation = async (
  address: string,
  score: number,
  meta: any,
  signer: any,
) => {
  const eas = new EAS(EASContractAddress);
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(
    'address address, uint256 score, string meta',
  );
  const encodedData = schemaEncoder.encodeData([
    { name: 'address', value: address, type: 'address' },
    { name: 'score', value: score, type: 'uint256' },
    { name: 'meta', value: meta, type: 'string' },
  ]);

  // Our current schema UID
  const schemaUID =
    '0xa1285d8c9b3164eb94f22a4084d4d01fc7fb66d27c56ddba32033c63a5ed76cd';

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
};
