import { fetchRequest, GetERC20TransactionsResponse } from "@/pages/api/score";

const ETHERSCAN_API_KEY = "GB821FZCS37WSXM8GJCCUUD3ZQUTZZY9RX";
const apikey = "&apikey=" + ETHERSCAN_API_KEY;

/** Gets all addresses that have received a payout from the OP treasury */
async function getAddressesPaidByOpTreasury() {
  const response = await fetchRequest(
    "https://api.etherscan.io/api?module=account&action=tokentx&address=0x2501c477D0A35545a387Aa4A3EEe4292A9a8B3F0"
      + apikey,
  );

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  return response.json();
}
