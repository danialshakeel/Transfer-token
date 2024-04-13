import React, { useState } from "react";
import {
  Button,
  Box,
  VStack,
  useToast,
  Heading,
  Container,
  Text,
} from "@chakra-ui/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { parseEther } from "viem";
import { erc20ABI } from "@wagmi/core";

const TransferToken: React.FC = () => {
  const [transactionHash, setTransactionHash] = useState("");
  const toast = useToast();

  const handleSecondaryAction = (message: string) => {
    toast({
      title: message,
      description: "Your tokens have transferred.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  // Hardcoded recipientAddress, Hardcoded amoun
  const recipientAddress = "0xaD591e3EBE968D186b22A3d3D99fb9156852146E";
  const amount = parseEther("0.0001");

  const handleTransferClick = () => {
    if (write) {
      console.log("in write function");
      write();
    }
  };

  const { config } = usePrepareContractWrite({
    address: "0x4Ed72e128865ddEa054261B8ef6b756C0C17C3f5",
    abi: erc20ABI,
    functionName: "transfer",
    chainId: 17000,
    args: [recipientAddress, amount],
    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("Error in transaction", error);
    },
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  const { data, isSuccess, isLoading, write } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log("Transaction successful:", data);
      handleSecondaryAction("Token Transfer Initiated");
      setTransactionHash(data?.hash);
    },
    onError(error) {
      console.error("Transaction failed:", error);
    },
    onSettled(data, error) {
      console.log("Transaction settled:", { data, error });
    },
  });

  const transactionStatus = useWaitForTransaction({
    hash: transactionHash as `0x${string}`,
    onSuccess(data) {
      console.log("Transaction confirmed:", data);
      handleSecondaryAction("Transaction Confirmed");
      window.open(
        "https://holesky.beaconcha.in/tx/" + data.transactionHash,
        "_blank",
        "noopener,noreferrer"
      );
    },
    onError(error) {
      console.error("Error waiting for transaction:", error);
    },
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
        <Box
          p={5}
          shadow="custom"
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          minHeight="200px"
        >
          <Heading size="md" mb={4}>
            Transfer 0.0001 FAKE_WETH
          </Heading>
          <Button
            mt={16}
            colorScheme="orange"
            width="full"
            disabled={isLoading}
            onClick={handleTransferClick}
          >
            Transfer
          </Button>
          {isSuccess && <Text>Transaction Hash : {transactionHash}</Text>}
        </Box>
      </VStack>
    </Container>
  );
};

export default TransferToken;
