import { ethers } from 'ethers'
import { Address, formatUnits } from 'viem'
import { fetchRequest, getClient, loadCSV } from '@/utils'
import {
    GetERC20TransactionsResponse,
    GetNormalTransactionsResponse,
    GetERC721TransactionsResponse,
    GetTokenBalanceResponse,
    SafeInfo,
} from './sourceTypes'
import ERC20 from '@/abi/ERC20'

const GNOSIS_SAFE_PROXY = '0xc22834581ebc8527d974f8a1c97e1bea4ef910bc'
// const ETHERSCAN_API_KEY = 'GB821FZCS37WSXM8GJCCUUD3ZQUTZZY9RX';
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
const apikey = '&apikey=' + ETHERSCAN_API_KEY
// "&apikey=6JEC4FAII8AIEUQFI28C765AC4Y1K54ME2"

/** Gets all addresses that have received a payout from the OP treasury */
export async function getAdressesAirdroppedOP(): Promise<[string[], string[]]> {
    /* First record is a header, so we drop it */
    const [, ...op1] = await loadCSV('../data/op_airdrop_1.csv')
    const [, ...op2] = await loadCSV('../data/op_airdrop_2.csv')
    return [op1.map((records) => records[0]), op2.map((records) => records[0])]
}

// fetch ERC20 transactions from Etherscan
export async function getERC20Transactions(address: string) {
    /*
    https://api.etherscan.io/api
     ?module=account
     &action=tokentx
     &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
     &apikey=YourApiKeyToken
    */
    try {
        const response = await fetchRequest(
            'https://api.etherscan.io/api?module=account&action=tokentx&address=' +
                address +
                apikey
        )

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
        }

        const result = (await response.json()) as GetERC20TransactionsResponse

        return result
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        } else {
            return 'An unexpected error occurred'
        }
    }
}

// fetch normal transactions from Etherscan
export async function getNormalTransactions(address: string) {
    /*
    https://api.etherscan.io/api
     ?module=account
     &action=txlist
     &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
     &apikey=YourApiKeyToken
    */
    try {
        const response = await fetchRequest(
            'https://api.etherscan.io/api?module=account&action=txlist&address=' +
                address +
                apikey
        )

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
        }

        const result = (await response.json()) as GetNormalTransactionsResponse

        return result
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        } else {
            return 'An unexpected error occurred'
        }
    }
}

// fetch ERC721 transactions from Etherscan
export async function getERC721Transactions(address: string) {
    /*
    https://api.etherscan.io/api
     ?module=account
     &action=tokennfttx
     &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
     &apikey=YourApiKeyToken
    */
    try {
        const response = await fetchRequest(
            'https://api.etherscan.io/api?module=account&action=tokennfttx&address=' +
                address +
                apikey
        )

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
        }

        const result = (await response.json()) as GetERC721TransactionsResponse

        return result
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        } else {
            return 'An unexpected error occurred'
        }
    }
}

// experimental: not used so far etherscan fetch
export async function etherscanGetTokenBalance(
    contractAddress: string,
    address: string,
    network: 'mainnet' | 'optimism'
) {
    let apiUrl: string

    switch (network) {
        case 'mainnet':
            apiUrl = 'https://api.etherscan.io/api'
            break
        case 'optimism':
            apiUrl = 'https://api-optimistic.etherscan.io/api'
            break
        default:
            throw new Error(`Unsupported network: ${network}`)
    }

    const query = `${apiUrl}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}${apikey}`

    try {
        const response = await fetchRequest(query)

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
        }

        const result = (await response.json()) as GetTokenBalanceResponse

        return result
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        } else {
            return 'An unexpected error occurred'
        }
    }
}

// fetch token balance for a given contract address from Etherscan
export async function getTokenBalance(
    contractAddress: Address,
    address: string,
    network: 'mainnet' | 'optimism'
): Promise<string> {
    try {
        const isMainnet = network === 'mainnet'
        const abi = ERC20
        const client = await getClient(isMainnet ? 'mainnet' : 'optimism')
        const decimals = await client.readContract({
            address: contractAddress,
            abi,
            functionName: 'decimals',
        })
        const balance: any = await client.readContract({
            address: contractAddress,
            abi,
            functionName: 'balanceOf',
            args: [address],
        })

        return balance ? formatUnits(balance, Number(decimals)) : '0'
    } catch (error) {
        console.log({ error })
        return '0'
    }
}

export async function fetchGRDonations(address: string) {
    const addressParts = address.match(/.{1,6}/g) ?? []
    if (!addressParts) {
        throw new Error('Invalid address')
    }

    const scores = await Promise.all(
        [1, 10, 250, 424].map(async (chainId) => {
            const url = `https://indexer-production.fly.dev/data/${chainId}/contributors/${addressParts.join(
                '/'
            )}.json`
            try {
                const response = await fetch(url)
                if (response.ok) {
                    return await response.json()
                } else {
                    return []
                }
            } catch (error) {
                return []
            }
        })
    )
    return scores.flat()
}

async function optimismTxHistoryCheck(txs: any) {
    let interactedWithContracts, deployedContracts, createdGnosisSafe
    for (let tx of txs) {
        // Checks any contract interaction
        if (tx.data && tx.data !== '0x') {
            interactedWithContracts = true
            // Checks if it created a Gnosis Safe
            if (tx.to.toLowerCase() === GNOSIS_SAFE_PROXY.toLowerCase()) {
                createdGnosisSafe = true
            }
        }
        // Checks if any contract was deployed
        if (tx.to === null) {
            deployedContracts = true
        }
        // Checks if any tx was executed in a Gnosis Safe
    }
    return {
        interactedWithContracts,
        deployedContracts,
        createdGnosisSafe,
    }
}

export async function getAddressOPTxHistory(address: string) {
    const provider = new ethers.providers.EtherscanProvider(
        'optimism',
        ETHERSCAN_API_KEY
    )
    const history = await provider.getHistory(address as Address)

    const { interactedWithContracts, deployedContracts, createdGnosisSafe } =
        await optimismTxHistoryCheck(history)
    return {
        history,
        interactedWithContracts,
        deployedContracts,
        createdGnosisSafe,
    }
}

async function fetchSafesOwnedByUser(userAddress: string): Promise<string[]> {
    const response = await fetch(
        `https://safe-transaction-optimism.safe.global/api/v1/owners/${userAddress}/safes/`
    )
    const data = await response.json()
    return data.safes || []
}

async function fetchSafeInfo(safeAddress: string): Promise<SafeInfo> {
    const response = await fetch(
        `https://safe-transaction-optimism.safe.global/api/v1/safes/${safeAddress}/`
    )
    return await response.json()
}

export async function checkSafeOwnershipAndActivity(
    userAddress: string
): Promise<{ ownsSafe: boolean; hasExecutedTransaction: boolean }> {
    const safesOwnedByUser = await fetchSafesOwnedByUser(userAddress)
    if (safesOwnedByUser.length === 0) {
        return { ownsSafe: false, hasExecutedTransaction: false }
    }

    for (const safe of safesOwnedByUser) {
        const safeInfo = await fetchSafeInfo(safe)
        if (safeInfo.owners.includes(userAddress) && safeInfo.nonce > 0) {
            return { ownsSafe: true, hasExecutedTransaction: true }
        }
    }

    return { ownsSafe: true, hasExecutedTransaction: false }
}