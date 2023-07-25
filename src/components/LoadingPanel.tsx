import { Flex, Spinner } from "@chakra-ui/react";

const LoadingPanel = () => {
  return (
    <Flex
      w='100vw'
      h='100vh'
      position='fixed'
      inset={0}
      bg='chakra-body-bg'
      zIndex={1000}
      justifyContent='center'
      alignItems='center'
    >
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
    </Flex>
  );
};

export default LoadingPanel;
