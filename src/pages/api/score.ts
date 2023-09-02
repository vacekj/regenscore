import { NextApiRequest, NextApiResponse } from 'next'
import { createScore } from '@/helpers/scoreHelpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body
    const result = await createScore(body.address)
    try {
        return res.status(200).json(result) // send the entire result object as JSON
    } catch (e) {
        return res.status(200).send({ score: 0, debug: {} }) // send an empty debug object on error
    }
}
