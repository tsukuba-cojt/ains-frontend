import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { VStack, Text, Box } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

import UserInteractor from "@/interactors/User/UserInteractor";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  switching: () => void;
}

const SignupModal = (props: Props) => {
  const [show, setShow] = useState(false);
  const switchPasswordVisible = () => setShow(!show);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const auth = getAuth();
  const router = useRouter();

  const toast = useToast();
  const onSignupBtnClicked = () => {
    createUserWithEmailAndPassword(auth, email, loginPass)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const user_data = await new UserInteractor().set({ id: user.uid, name: username, icon_url: "" });
        if (!user_data) {
          await user.delete();
          throw new Error();
        }
        toast({
          title: "Account Created!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setUsername("");
        setEmail("");
        setLoginPass("");
        props.onClose();
        if (auth.currentUser && !auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("認証メールを送りました。");
            router.push("/waitEmailVerify");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.errorMessage == "auth/email-already-in-use") {
          toast({
            title: "email-aliready-in-use",
            description: "このメールアドレスはすでに登録されています",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Signup Failed",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

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
              <Text>ユーザー名</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type='text'
                  placeholder='Enter username'
                  onChange={(event) => setUsername(event.target.value)}
                />
              </InputGroup>
            </Box>
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
              onSignupBtnClicked();
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
