import { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';
import eas from '@/helpers/eas';
import ethHelpers from '@/helpers/ethHelpers';
import easUtils from '@/utils/eas-wagmi-utils';
import dbHelpers from '@/helpers/databaseHelpers';
import constants from '@/constants';

/** This route is called by a cron, and checks for all attestations that were paid for but not issued for whatever reason */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { ATTESTER_ADDRESS, ATTESTATION_FEE_USD } = constants;

    const attesterPvtKey = process.env.ATTESTER_PVT_KEY;
    if (!attesterPvtKey)
      return res.status(400).json({ error: 'No attester set' });

    const { signer, provider } = easUtils.privateKeyToSigner(
      attesterPvtKey,
      10,
    );

    /* Get all txs to the attester address */

    /* Filter out existing attestations - if there was an attestation issued after the tx was sent, ignore the tx */

    /* Now we have all addresses that have paid fee to attester address but have not received an attestation */

    /* Re-issue attestations to them */
  } catch (e) {}
};
