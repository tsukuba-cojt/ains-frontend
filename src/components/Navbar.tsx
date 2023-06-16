import {
  Button,
  IconButton,
  Flex,
  Image,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChatIcon, BellIcon, SearchIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import UserIcon from "@/icons/UserIcon";
import { useState } from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon_fill_color = useColorModeValue("white", "gray.800");

  const [isHome, setIsHome] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);

  return (
    <Flex
      as='header'
      bg='chakra-body-bg'
      gap={2}
      zIndex={100}
      align='center'
      position='fixed'
      top='0'
      left='0'
      w='100%'
      h='60px'
      p={4}
    >
      <Button size='sm'>
        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
      </Button>
      {isHome == false ? (
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
      <IconButton
        variant='ghost'
        aria-label='ダークモードの切り替え'
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      ></IconButton>
      <Button variant='ghost' leftIcon={<BellIcon />} size='sm'>
        通知
      </Button>
      <Button variant='ghost' leftIcon={<ChatIcon />} size='sm'>
        メッセージ
      </Button>
      {isLoggingIn == false ? (
        <Button size='sm'>ログイン</Button>
      ) : (
        <Button size='sm'>
          <UserIcon color={icon_fill_color} boxSize='1.2rem' />
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
