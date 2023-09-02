import {
    handleERC20Transactions,
    handleERC721Transactions,
    handleNormalTransactions,
    handleGRDonations,
    handleTokenBalances,
    handleEthStaker,
    handleOPTreasuryPayouts,
    handleDelegate,
    handleTxsMadeOnOptimism,
    handleOPContractsInteractions,
    handleSafeOwnershipAndActivity,
    handleOPAirdropReceiver,
} from './sourceHandlers'

export async function createScore(
    address: string
): Promise<{ score: number; debug: any }> {
    let score = 0
    const debug = {
        // normalTransactions: null,
        // erc20Transactions: null,
        // erc721Transactions:null,
        opAirdrop: [],
        tokenBalances: [],
        grDonations: [],
        ethDeposits: [],
        opTreasuryPayouts: [],
        isDelegate: [],
        optimismTxHistory: [],
        safeOwnerActivity: [],
    }
    const results = await Promise.all([
        handleTokenBalances(address, debug),
        // handleNormalTransactions(address, debug),
        // handleERC20Transactions(address, debug),
        // handleERC721Transactions(address, debug),
        handleGRDonations(address, debug),
        handleEthStaker(address, debug),
        handleOPTreasuryPayouts(address, debug),
        handleDelegate(address, debug),
        handleTxsMadeOnOptimism(address, debug),
        handleOPContractsInteractions(address, debug),
        handleSafeOwnershipAndActivity(address, debug),
        handleOPAirdropReceiver(address, debug),
    ])

    score += results.reduce((acc, current) => acc + current, 0)

    return { score, debug }
}
