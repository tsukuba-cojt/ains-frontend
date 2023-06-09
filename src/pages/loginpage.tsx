import { CloseButton, Button, Flex, Stack, Image, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon, ChatIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Box, HStack, VStack, Container, Text } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

const Loginpage = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <div>
      <Flex h={1000} justify='center' align='center'>
        <Spacer />
        <VStack w='500px' borderRadius='md' p='10' mb={2} bg='green.200'>
          <Text fontSize='2xl'>アカウントにログイン</Text>
          <br />
          <br />
          <Container>メールアドレス</Container>
          <InputGroup size='md'>
            <Input pr='4.5rem' type='email' placeholder='Enter email' />
          </InputGroup>{" "}
          <Container>パスワード</Container>
          <InputGroup size='md'>
            <Input pr='4.5rem' type={show ? "text" : "password"} placeholder='Enter password' />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' variant='ghost' onClick={handleClick}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button borderRadius='full' width='100%'>
            ログイン
          </Button>
        </VStack>
        <Spacer />
      </Flex>
    </div>
  );
};

export default Loginpage;
