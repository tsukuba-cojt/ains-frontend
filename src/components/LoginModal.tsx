import { CloseButton, Button, Flex, Stack, Image, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon, ChatIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Box, HStack, VStack, Container, Text } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  Switching: () => void;
}

const LoginModal = (props: Props) => {
  const [show, setShow] = useState(false);
  const switchPasswordVisible = () => setShow(!show);
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize='2xl' margin='30px'>
            アカウントにログイン
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <VStack borderRadius='md' p='2' mb={2} align='center'>
          <VStack align='left' w='350px'>
            <Text text-align='left'>メールアドレス</Text>
            <InputGroup size='md'>
              <Input pr='4.5rem' type='email' placeholder='Enter email' />
            </InputGroup>{" "}
            <Text>パスワード</Text>
            <InputGroup size='md'>
              <Input pr='4.5rem' type={show ? "text" : "password"} placeholder='Enter password' />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' variant='ghost' onClick={switchPasswordVisible}>
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
          <Button borderRadius='full' width='80%'>
            ログイン
          </Button>
          <VStack align='left' w='350px'>
            <Text fontSize='sm'>
              まだアカウントを持っていない場合:
              <Button onClick={props.Switching} size='sm' colorScheme='teal' variant='link'>
                新規登録
              </Button>
            </Text>
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
