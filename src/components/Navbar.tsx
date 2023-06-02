import { Button, Flex, Stack, Image } from "@chakra-ui/react";
import { ChatIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  const [count, setCount] = useState<number>(0);

  const homeflag: boolean = false;
  const loginflag: boolean = true;

  return (
    <Flex gap={2} align='center' bg='black' position='fixed' top='0' left='0' w='100%' h='60px' p={4}>
      <Button size='sm'>
        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
      </Button>
      {homeflag == false ? (
        <Button variant='outline' size='sm'>
          ホームじゃない
        </Button>
      ) : (
        <Button size='sm'>ホーム</Button>
      )}
      <Button size='sm'>生成</Button>
      <Box flexGrow={1}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input variant='filled' placeholder='検索'></Input>
        </InputGroup>
      </Box>
      <Button leftIcon={<BellIcon />} size='sm'>
        通知
      </Button>
      <Button leftIcon={<ChatIcon />} size='sm'>
        メッセージ
      </Button>
      {loginflag == false ? (
        <Button size='sm'>ログイン</Button>
      ) : (
        <Button size='sm'>
          <Image boxSize='30px' src='app_icon_account.png' alt='app_icon_account' />
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
