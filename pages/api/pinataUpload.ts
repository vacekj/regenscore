import { NextApiRequest, NextApiResponse } from 'next';
import pinataSDK from '@pinata/sdk';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { meta, address } = req.body;

    if (!meta || !address) {
      return res.status(400).json({ error: 'Missing data' });
    }

    // Initialize Pinata
    const pinata = new pinataSDK({
      pinataJWTKey: process.env.PINATA_JWT_KEY,
    });

    // Define Pinata options
    const options = {
      pinataMetadata: {
        name: `RegenScore Metadata for ${address}`,
      },
    };

    // Upload to Pinata
    const ipfs = await pinata.pinJSONToIPFS(meta, options);

    if (!ipfs) {
      return res.status(400).json({ error: 'IPFS upload failed' });
    }

    // Return the IPFS hash to the frontend
    return res.status(200).json({ ipfsHash: ipfs.IpfsHash });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .send({ error: 'An error occurred during the IPFS upload.' });
  }
};
