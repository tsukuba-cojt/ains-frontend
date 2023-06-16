import { Button, Flex, Box, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

import { theme } from "./_app";

const ChakraDemoPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [count, setCount] = useState<number>(0);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const addCount = (): void => {
    setCount(count + 1);
  };

  const subCount = (): void => {
    setCount(count - 1);
  };

  return (
    <Box>
      <Box>
        <p>Current color mode: {colorMode}</p>
        <Button onClick={toggleColorMode}>Change color mode</Button>
      </Box>
      <Text color={secondary}>hoge</Text>
      <Box bg={secondary} w='100px' h='100px'></Box>
      <Button>hoge</Button>
      <Flex align='center' gap={2}>
        <Button colorScheme='blue' onClick={subCount}>
          sub
        </Button>
        <p>{count}</p>
        <Button colorScheme='red' onClick={addCount}>
          add
        </Button>
      </Flex>
    </Box>
  );
};

export default ChakraDemoPage;
