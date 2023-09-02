import { GetERC20TransactionsResponse } from '@/helpers/sourceTypes'
import { fetchRequest } from '@/utils'
import { parse } from 'csv-parse'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

async function loadCSV(path: string): Promise<string[][]> {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const records = []
    const parser = fs.createReadStream(`${__dirname}/${path}`).pipe(parse({}))
    for await (const record of parser) {
        records.push(record)
    }
    return records as string[][]
}

const OP_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_OPTIMISM_ETHERSCAN_API_KEY
const apikey = '&apikey=' + OP_ETHERSCAN_API_KEY

/** Gets all addresses that have received a payout from the OP treasury */
export async function getAddressesPaidByOpTreasury() {
    const response = await fetchRequest(
        'https://api-optimistic.etherscan.io/api?module=account&action=tokentx&address=0x2501c477D0A35545a387Aa4A3EEe4292A9a8B3F0' +
            apikey
    )

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`)
    }

    const json: GetERC20TransactionsResponse = await response.json()

    return json.result
}

/** Gets all addresses that have received a payout from the OP treasury */
export async function getAdressesAirdroppedOP(): Promise<[string[], string[]]> {
    /* First record is a header, so we drop it */
    const [, ...op1] = await loadCSV('../data/op_airdrop_1.csv')
    const [, ...op2] = await loadCSV('../data/op_airdrop_2.csv')
    return [op1.map((records) => records[0]), op2.map((records) => records[0])]
}
