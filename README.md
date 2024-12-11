# Ethereum DApp - Send ETH

This is a simple Ethereum DApp built using `ethers.js` that allows users to:

- Connect their MetaMask wallet.
- View their Ethereum account balance.
- Send ETH to another address.

## Features

- **Connect MetaMask wallet**: Allows the user to connect their MetaMask wallet to the DApp.
- **View account balance**: Displays the user's Ethereum balance in ETH.
- **Send ETH**: Lets users send ETH to another Ethereum address.

## Prerequisites

Before running the app, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MetaMask](https://metamask.io/) extension installed in your browser
- [Infura](https://infura.io/) (for accessing the Ethereum network) or any other Ethereum RPC provider.

## Getting Started

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/ethereum-dapp-sendeth.git
    cd ethereum-dapp-sendeth
    ```

2. **Install dependencies**:

   Run the following command to install the required dependencies:

    ```bash
    npm install
    ```

3. **Create a `.env` file**:

   Create a `.env` file in the root directory of the project and add the following contents:

    ```plaintext
    INFURA_PROJECT_ID=your_infura_project_id
    ```

   Replace `your_infura_project_id` with your Infura Project ID. You can get it by signing up at [Infura](https://infura.io/) and creating a new project.

4. **Run the DApp**:

   After the dependencies are installed and `.env` is set up, you can run the DApp locally with:

    ```bash
    npm start
    ```

   The app will be available at `http://localhost:1234`.

5. **Connect to MetaMask**:

   Open the DApp in your browser, click the "Connect Wallet" button, and connect your MetaMask wallet.

6. **Send ETH**:

   Enter a recipient's Ethereum address and the amount of ETH you want to send, then click "Send Transaction."

## File Structure

