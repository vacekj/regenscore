const UNISWAP_V3_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

export async function fetchCurrentETHPrice() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.ethereum.usd;
  } catch (error: any) {
    console.error('Error fetching ETH price:', error);
    throw error;
  }
}

export async function getEthPriceAt(timestamp: number) {
  // The pool ID for the ETH/USDC pair on Uniswap V3
  const poolId = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8';
  const query = `
      query GetEthPrice($timestamp: Int!, $poolId: ID!) {
        poolHourDatas(first: 1, orderBy: periodStartUnix, orderDirection: desc, where: { pool: $poolId, periodStartUnix_lte: $timestamp }) {
          token0Price
          token1Price
        }
      }
    `;

  try {
    const response = await fetch(UNISWAP_V3_SUBGRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          timestamp,
          poolId,
        },
      }),
    });
    const data = await response.json();
    if (data?.data?.poolHourDatas?.length > 0) {
      const ethPriceUSD = parseFloat(data.data.poolHourDatas[0].token0Price);
      return ethPriceUSD;
    }
    console.error('ETH price data not available at the requested timestamp');
    return 0;
  } catch (error) {
    console.error({ error });
    return 0;
  }
}
