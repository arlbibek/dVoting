> This is [my](https://arlbibek.github.io/ "Visit my portfolio") final year project for the [IT Degree](https://islington.edu.np/programmes/b-sc-hons-computer-networking-it-security/ "i.e. BSc (Hons) Computer Networking & IT Security") that I'm currently pursuing at [Islington College](https://islington.edu.np/ "Visit Islington College, Kathmandu, Nepal").

# Decentralized Voting (dVoting)

A decentralized voting system based on Ethereum blockchain technology (designed for corporate use).

## [demo video](https://youtu.be/nh1zfTTrdII "Watch demo video.")

## System Workflow

> Below is a brief explanation of the basic workflow of the dVoting application.

Admin will create a voting instance by launching/deploying the system in a blockchain network (EVM), then create an election instance and start the election with the details of the election filled in and adding candidates for voters to vote. Then voters with their blockchain account connect to the same blockchain network register to become a voter. When a user registers to be a voter the registration details are displayed in the admins' panel (i.e. verification page) and the admin will check if the registration information (blockchain account address, name and phone number) is valid and matches with his record. If the registration is valid then the admin approves the registered user and the registered user becomes eligible to take part in the created election. The registered user (voter) then from the voting page casts his/her voter the candidate of his/her interest. After some time, depending on the scale of the election the admin ends the election. As soon as the election ends the voting is closed and the results are displayed avouching the winner at the top of the results page.

---

## Requirements

- [Node.js](https://nodejs.org)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://github.com/trufflesuite/ganache-cli) (Cli)
- [Metamask](https://metamask.io/) (Browser Extension)

## Setting up the development environment

### Getting the requirements

1. Download and install NodeJS

   > node.js `v14.15.4`

   Download NodeJS from [here](https://nodejs.org/en/download/ "Go to official NodeJS download page.").

1. Install truffle and ganache-cli

   > truffle `v5.2.4`  
   > ganache-cli `v6.12.2`

   ```shell
   npm install -g truffle
   npm install -g ganache-cli
   ```

1. Install metamask browser extension

   Download and install metamask from [here](https://metamask.io/download "Go to official metamask download page.").

### Configuring the project for development

1. Clone this repository

   ```shell
   git clone https://github.com/arlbibek/dVoting.git
   cd dVoting
   ```

1. Run local Ethereum blockchain

   ```shell
   ganache-cli
   ```

   > Note: Do not close `ganache-cli` (the blockchain network needs to be running all the time)

1. Configure metamask on the browser with following details

   New RPC URL: `http://localhost:8545`  
   Chain ID: `1337`

1. Import accounts using private keys from ganache-cli to the metamask extension on the browser
1. Deploy smart contract to the (local) blockchain

   ```shell
   # on the dVoting directory
   truffle migrate
   ```

   > Note: Use `truffle migrate --reset` for redeployments

1. Launch the development server (fronted)

   ```shell
   cd client
   npm install
   npm start
   ```

---

\# That is all.
