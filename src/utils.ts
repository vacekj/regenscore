import { parse } from 'csv-parse'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { createPublicClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'

export async function loadCSV(path: string): Promise<string[][]> {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const records = []
    const parser = fs.createReadStream(`${__dirname}/${path}`).pipe(parse({}))
    for await (const record of parser) {
        records.push(record)
    }
    return records as string[][]
}

export async function fetchRequest(url: string) {
    return await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })
}

export async function getClient(network: string) {
    let chain
    switch (network) {
        case 'optimism':
            chain = optimism
            break
        default:
            chain = mainnet
    }
    return createPublicClient({
        chain,
        transport: http(),
    })
}
