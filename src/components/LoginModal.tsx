import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { VStack, Text, Box } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  switching: () => void;
}

const LoginModal = (props: Props) => {
  const [show, setShow] = useState(false);
  const switchPasswordVisible = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const auth = getAuth();
  const router = useRouter();

  const toast = useToast();
  const onSigninBtnClicked = () => {
    signInWithEmailAndPassword(auth, email, loginPass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast({
          title: "Signin Succeeded!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setEmail("");
        setLoginPass("");
        props.onClose();
        if (auth.currentUser && !auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser).then(() => {
            router.push("/waitEmailVerify");
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Signin Failed",
          description: "メールアドレスかパスワードが正しいか確認してください",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize='2xl' margin='25px'>
            アカウントにログイン
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <VStack borderRadius='md' p='2' mb={2} align='center'>
          <VStack align='left' w='350px'>
            <Box paddingBottom='30px'>
              <Text text-align='left'>メールアドレス</Text>
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
              onSigninBtnClicked();
            }}
          >
            ログイン
          </Button>
          <VStack align='left' w='350px' paddingBottom='30px'>
            <Text fontSize='sm'>
              まだアカウントを持っていない場合:
              <Button onClick={props.switching} size='sm' colorScheme='teal' variant='link'>
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
