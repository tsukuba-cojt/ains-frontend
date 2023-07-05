import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { VStack, Text, Box } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  switching: () => void;
}

const SignupModal = (props: Props) => {
  const [show, setShow] = useState(false);
  const switchPasswordVisible = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const auth = getAuth();

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize='2xl' margin='25px'>
            新規アカウント作成
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <VStack borderRadius='md' p='2' mb={2}>
          <VStack align='left' w='350px'>
            <Box paddingBottom='30px'>
              <Text>メールアドレス</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type='email'
                  placeholder='Enter email'
                  onChange={(event) => setEmail(event.target.value)}
                />
              </InputGroup>
            </Box>
            <Box paddingBottom='30px'>
              <Text>パスワード</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? "text" : "password"}
                  placeholder='Enter password'
                  onChange={(event) => setLoginPass(event.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' variant='ghost' onClick={switchPasswordVisible}>
                    {show ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </VStack>
          <Button
            borderRadius='full'
            width='80%'
            onClick={() => {
              createUserWithEmailAndPassword(auth, email, loginPass).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("ログインしたよ");
                console.log(user.displayName + "/" + user.email + "/" + user.uid + "/" + user.getIdToken());
                // ...
              });
              switchPasswordVisible();
            }}
          >
            登録
          </Button>
          <VStack align='left' w='350px' paddingBottom='30px'>
            <Text fontSize='sm'>
              既にアカウントを持っている場合:
              <Button onClick={props.switching} size='sm' colorScheme='teal' variant='link'>
                ログイン
              </Button>
            </Text>
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
