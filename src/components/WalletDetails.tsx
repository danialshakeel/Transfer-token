import React from "react";
import {
  Button,
  Box,
  VStack,
  Text,
  Heading,
  Container,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const WalletDetails: React.FC = () => {
  //****** This is the sendTransaction code written for transfering ETH For personal testing purpose. Commented out as it was not part of the task
  //
  // const {
  // sendTransaction
  // } = useSendTransaction()
  //
  // const sendTokens = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()
  //   const to = '0xaD591e3EBE968D186b22A3d3D99fb9156852146E' as `0x${string}`
  //   const value = '0.0001' as string
  //   sendTransaction({ to, value: parseEther(value) })
  // }
  //
  // const recipientAddress = '0xaD591e3EBE968D186b22A3d3D99fb9156852146E'
  // const amount = parseEther('0.0001');
  //
  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransaction({
  //   })

  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();
  const { data, isLoading } = useBalance({
    address: address,
  });

  const result = useBalance({
    address: address,
    token: "0x4Ed72e128865ddEa054261B8ef6b756C0C17C3f5",
  });

  return (
    <Container centerContent>
      <VStack
        spacing={8}
        align="stretch"
        mt={10}
        width="60vw"
        maxWidth="container.md"
      >
        <Center>
          <Heading as="h1" size="xl" mb={6}>
            Prepo Task
          </Heading>
        </Center>
        <Box
          p={5}
          shadow="custom"
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          minHeight="300px"
          overflow="auto"
        >
          <Flex direction="column" height="100%">
            <Flex flex="1" direction="column" justifyContent="space-between">
              <VStack spacing={3}>
                <Heading size="md" mb={4}>
                  Connect Wallet
                </Heading>
                {address ? (
                  <>
                    <Text>Connected to {address}</Text>
                    <Text>
                      Balance: {data ? data.formatted : "Loading..."} ETH
                    </Text>
                    <Text>
                      FAKE_WETH Balance:{" "}
                      {result.data ? result.data.formatted : "Loading..."}
                    </Text>
                  </>
                ) : (
                  <Text>Click below to connect your wallet.</Text>
                )}
              </VStack>
              {!address ? (
                <Button colorScheme="blue" mt={16} onClick={() => connect()}>
                  Connect Wallet
                </Button>
              ) : (
                <Button colorScheme="red" mt={4} onClick={() => disconnect()}>
                  Disconnect
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </VStack>
    </Container>
  );
};

export default WalletDetails;
