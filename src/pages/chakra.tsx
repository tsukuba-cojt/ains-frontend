import { Button, Flex } from "@chakra-ui/react";
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
    <>
      <Flex align='center' gap={2}>
        <Button colorScheme='blue' onClick={subCount}>
          sub
        </Button>
        <p>{count}</p>
        <Button colorScheme='red' onClick={addCount}>
          add
        </Button>
      </Flex>
    </>
  );
};

export default ChakraDemoPage;
