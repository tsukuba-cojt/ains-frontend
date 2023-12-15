import { ChatIcon, BellIcon, SearchIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useState, useContext } from "react";

import UserIcon from "@/icons/UserIcon";

import DMModal from "./DMModal";
import { FirebaseAuthContext } from "./FirebaseAuthProvider";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon_fill_color = useColorModeValue("white", "gray.800");
  const { user } = useContext(FirebaseAuthContext);
  const router = useRouter();
  const logo_url = useColorModeValue("/logo.png", "/logo-white.png");

  const [isHome, setIsHome] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);
  const [isDMModalOpen, setIsDMModalOpen] = useState<boolean>(false);

  const loginSignupSwitching = (): void => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsSignupModalOpen(!isSignupModalOpen);
  };

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
      <Image mr='5' w='100px' alt='logo' onClick={() => router.push("/")} src={logo_url} />
      <Button onClick={() => router.push("/upload")} size='sm'>
        アップロード
      </Button>
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
      <Button variant='ghost' onClick={() => setIsDMModalOpen(!isDMModalOpen)} leftIcon={<ChatIcon />} size='sm'>
        メッセージ
      </Button>
      <DMModal isOpen={isDMModalOpen} onClose={() => setIsDMModalOpen(false)} />
      {user === null ? (
        <>
          <Button onClick={() => setIsLoginModalOpen(true)} size='sm'>
            ログイン
          </Button>
          <Button colorScheme='gray' onClick={() => setIsSignupModalOpen(true)} size='sm'>
            新規登録
          </Button>
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            switching={() => loginSignupSwitching()}
          />
          <SignupModal
            isOpen={isSignupModalOpen}
            onClose={() => setIsSignupModalOpen(false)}
            switching={() => loginSignupSwitching()}
          />
        </>
      ) : (
        <>
          <Button colorScheme='red' onClick={() => signOut(getAuth())} size='sm'>
            ログアウト
          </Button>
          <Button onClick={() => router.push("/mypage")} size='sm'>
            <UserIcon color={icon_fill_color} boxSize='1.2rem' />
          </Button>
        </>
      )}
    </Flex>
  );
};
export default Navbar;
