import React from "react";
import { ChakraProvider, extendTheme, Divider, theme } from "@chakra-ui/react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { holesky } from "@wagmi/core/chains";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import TransferToken from "./components/TransferToken";
import WalletDetails from "./components/WalletDetails";

const customTheme = extendTheme({
  ...theme,
  shadows: {
    ...theme.shadows,
    outline: "0 0 0 3px rgba(66,153,225,0.6)", // Customizing the focus shadow.
    custom:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Custom shadow for the boxes
  },
  colors: {
    ...theme.colors,
    brand: {
      500: "#3182ce", // Example custom color
    },
  },
});

const { chains, publicClient } = configureChains(
  [holesky],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://hardworking-snowy-violet.ethereum-holesky.quiknode.pro/9b8af33debaeb3de09f43758a186f76524e7862b/",
      }),
    }),
  ]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <WagmiConfig config={config}>
        <WalletDetails />
        <Divider orientation="horizontal" my={5} />
        <TransferToken />
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
