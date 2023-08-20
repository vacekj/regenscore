# Data about Optimism

https://github.com/ethereum-optimism/op-analytics

# Data sources

This list describes all sources of data that we use. the number corresponds to each taxonomy category from https://docs.google.com/spreadsheets/d/1YWaWZ6JKeZeLTA8-1aebbB8NJXOEYKjwEtFL9Dk99QI/edit#gid=0,

numbered by row -1.

## Static

This data is static and will not ever change or be updated.

- #2 OP Airdrops 1 and 2
- #6 OP Snapshot Voting - Snapshot voting has been deprecated for OP, therefore static

## From the chain

This is data that can be queried directly from the chain, either OP or Ethereum

- #1 did they sell the airdrop? How many % did they sell? Only count first TX after airdrop

- #4 Being Paid from treasury

Fetch and update all txs from the treasury to different addresses, save the individual txs.

- #5 Contributor POAPs

https://documentation.poap.tech/reference/getactionsscan-5, check against known POAPs

- #8 OP Delegate

https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042 watch the DelegateVotesChanged event and update the newBalance amount.

- #14 GTC Holder

Etherscan api for gtc holding

- #15 OP Holder

Etherscan api for OP holdings (on Optimism chain)

- #18 ETH Staker

DepositProcessed event on 0x00000000219ab540356cbb839cbe05303d7705fa

- #19 OP Liq provider

TODO: where?

- #20 Bridged to OP from Mainnet

https://etherscan.io/address/0xbfb731cd36d26c2a7287716de857e4380c73a64a watch for events here

- #21 Made txs on Optimism
- #22 Interacted with a contract
- #23 Deployed a contract
- #21 Deployed a Gnosis safe
- #21 Executed a tx with a gnosis safe

## Off-chain

- #7 OP Agora voting - TODO
- #11 Gitcoin Project owner - supermodular grants data ETL
- #12 Gitcoin Donator - ^
- #13 Gitcoin Passport Score - Passport API

## Unknown

- #3 Praise
- #10 Publishing Optimism proposals - might be derivable from chain - TODO
-
# OP Airdrop

example tx of distribution:

https://optimistic.etherscan.io/tx/0x10fab8702832049567ecfae91bd08617cf46ac97f340d2ab8f489b4913a29694

tokens went from OP Foundation addy: 0x2501c477d0a35545a387aa4a3eee4292a9a8b3f0

likely airdrop contract?  https://optimistic.etherscan.io/address/0xbe9a9b1b07f027130e56d8569d1aea5dd5a86013
