import { Button, Flex, Box, Text } from "@chakra-ui/react";
import { useState } from "react";

const ChakraDemoPage = () => {
  const [count, setCount] = useState<number>(0);

  const addCount = (): void => {
    setCount(count + 1);
  };

  const subCount = (): void => {
    setCount(count - 1);
  };

  return (
    <Box w='100vw' h='100vh' bg='#000000'>
      <Text color='secondary'>hoge</Text>
      <Box bg='secondary' w='100px' h='100px'></Box>
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
