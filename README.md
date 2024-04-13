# Write Contract

This React application is built using TypeScript and integrates Chakra UI for its user interface components. It leverages `wagmi` for Ethereum blockchain interactions, particularly focused on the Holesky testnet environment.

## Project Dependencies

- **Template:** TypeScript
- **UI Framework:** Chakra UI for React
- **Ethereum Blockchain Interaction:** wagmi (Version 1)

## Project Structure

The application's configuration is primarily set up in the `App.tsx` file. Currently, it is configured to interact with the Holesky testnet only.

### Components

The application consists of two main components:

- **WalletDetails**: This component handles wallet connection through MetaMask. After connection, it displays the user's address and token details.
- **TransferToken**: In this component, users can transfer their FAKE_WETH tokens to a predefined secondary address. Both the amount and the recipient address are currently hardcoded.

## Improvements

- **UI Enhancements**: With additional time, the user interface could be further improved to provide a more engaging and visually appealing experience.
- **Transaction History**: Integration of a feature to display a history of previous transactions conducted by the wallet.
- **Upgrade to wagmi V2**: An upgrade to the latest version of wagmi V2 to take advantage of newer features and improvements in blockchain interaction.

## Available Scripts

Within the project directory, you can utilize the following scripts:

### `npm run start`

- **Description**: Runs the application in development mode.
- **Command**: `npm run start`

### `npm test`

- **Description**: Initiates the test runner in interactive watch mode.
- **Command**: `npm test`

### `npm run build`

- **Description**: Compiles the application for production deployment to the `build` folder.
- **Command**: `npm run build`

## Setup and Installation

To get started with this project, clone the repository, install dependencies, and run the appropriate script to begin development:

```bash
git clone <repository-url>
cd <project-directory>
npm install
npm run start
