import { CloseButton, Button, Flex, Stack, Image, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
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

const NewAccountModal = (props: Props) => {
  const [show, setShow] = useState(false);
  const switchPasswordVisible = () => setShow(!show);
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize='2xl' margin='30px'>
            新規アカウント作成
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <VStack borderRadius='md' p='2' mb={2}>
          <VStack align='left' w='350px'>
            <Text>メールアドレス</Text>
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
            続行
          </Button>
          <VStack align='left' w='350px'>
            <Text fontSize='sm'>
              既にアカウントを持っている場合:
              <Button onClick={props.Switching} size='sm' colorScheme='teal' variant='link'>
                ログイン
              </Button>
            </Text>
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default NewAccountModal;
