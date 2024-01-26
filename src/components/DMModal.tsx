import {
  Input,
  Box,
  CloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Flex,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Link,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";

import { theme } from "@/pages/_app";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  contents: string;
  author: {
    id: string;
    name: string;
  };
  icon_url: string;
}

{
  messages: [
    { id: "123578", contents: "hello!", author: { id: "ajsjfal", name: "fujikawa", icon_url: "https://example.com" } },
    { id: "123578", contents: "hello!", author: { id: "ajsjfal", name: "fujikawa", icon_url: "https://example.com" } },
    { id: "123578", contents: "hello!", author: { id: "ajsjfal", name: "fujikawa", icon_url: "https://example.com" } },
    { id: "123578", contents: "hello!", author: { id: "ajsjfal", name: "fujikawa", icon_url: "https://example.com" } },
  ];
}

const DMModal = (props: Props) => {
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

  const secondary = useColorModeValue(theme.colors.secondary.ml, "gray.700");
  const boxbg = useColorModeValue("cyan.400", "cyan.200");
  const dmbg = useColorModeValue("gray.300", "gray.600");
  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message["contents"][]>([]); // メッセージのリスト
  const [newMessage, setNewMessage] = useState(""); // 新しいメッセージの入力値
  const [userNameDM, setUserNameDM] = useState("");
  const [userIconDM, setUserIconDM] = useState("");
  // 新しいメッセージを送信する関数
  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage(""); // 入力フィールドをクリア
    }
  };
  // エンターキーで送信するためのハンドラ
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      const chatAreaHeight = chatAreaRef.current.scrollHeight;
      chatAreaRef.current.scrollTop = chatAreaHeight;
    }
  }, [messages]);

  interface UserDM {
    user_name: string;
    user_src: string;
  }

  const UserDM = (userDM: UserDM) => {
    const secondary = useColorModeValue(theme.colors.secondary.ml, "gray.700");
    const MoveDMDisplay = () => {
      setUserNameDM(userDM.user_name);
      setUserIconDM(userDM.user_src);
      setIsMessageOpen(true);
    };

    return (
      <HStack w='full' bg={secondary} p='4' wrap='wrap' alignItems='center' gap={5}>
        <Flex>
          <Center h='100%'>
            <Avatar src={userDM.user_src} alt='User Icon' />

            <Link fontSize='2xl' as='u' p={1} onClick={MoveDMDisplay}>
              {userDM.user_name}
            </Link>
          </Center>
        </Flex>
      </HStack>
    );
  };
  return (
    <Box overflowY='scroll' position='fixed' top='50px' right='0px' h='calc(100vh - 50px)' bg={boxbg}>
      <AnimatePresence>
        {props.isOpen && isMessageOpen == false && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.0, duration: 0.2 },
            }}
          >
            <motion.div animate='open' exit='closed'>
              <>
                <CloseButton onClick={() => props.onClose()} />
                <VStack>
                  <UserDM
                    user_name='aaaa'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2Fb8e1c0c3-4055-4627-815b-25086c0490fb.png?alt=media&token=25477e3c-1ea7-4718-a304-89af9c98221a'
                  />
                  <UserDM
                    user_name='bbbb'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2Fb1202b67-ae07-42dc-a0de-91f7e9949b77.png?alt=media&token=6a80d01d-da86-4ac2-8097-c2b7e9a564c7'
                  />
                  <UserDM
                    user_name='0123456789'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F1e0a3fee-7758-4bad-a69f-9da104841d47.jpg?alt=media&token=da876fed-c46f-4c53-8db2-a829c8c2371b'
                  />
                  <UserDM
                    user_name='めがねくん'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F7539ab81-72cf-41f2-b9a4-6da0ffdcd05a.png?alt=media&token=8994a24e-b0c3-4993-a2dc-7feb90206c07'
                  />
                  <UserDM
                    user_name='ホーン'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F8997e9f6-221b-4f40-afd8-63ee630b96cc.jpg?alt=media&token=ffd9dc91-f598-4309-8af5-a2c33d540035'
                  />
                  <UserDM
                    user_name='未来'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2Fefc9564a-d4aa-40d0-9057-093e934a3756.jpg?alt=media&token=23ea91bb-a6a4-4135-9b03-962e4e930de2'
                  />
                  <UserDM
                    user_name='sakana'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F06fc35c6-70df-4897-b590-0e0c7bda5ceb.jpg?alt=media&token=ac1073ce-4788-4be9-b2f1-8adfcdc1c64f'
                  />
                  <UserDM
                    user_name='ワニワニ'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F336d621d-0384-4767-a0ec-70fee05b15f1.jpg?alt=media&token=d053633d-6175-41de-aa1f-cfccc06aa279'
                  />
                  <UserDM
                    user_name='sakana'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F06fc35c6-70df-4897-b590-0e0c7bda5ceb.jpg?alt=media&token=ac1073ce-4788-4be9-b2f1-8adfcdc1c64f'
                  />
                  <UserDM
                    user_name='sakana'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F06fc35c6-70df-4897-b590-0e0c7bda5ceb.jpg?alt=media&token=ac1073ce-4788-4be9-b2f1-8adfcdc1c64f'
                  />
                  <UserDM
                    user_name='sakana'
                    user_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F06fc35c6-70df-4897-b590-0e0c7bda5ceb.jpg?alt=media&token=ac1073ce-4788-4be9-b2f1-8adfcdc1c64f'
                  />
                </VStack>
              </>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      {isMessageOpen && (
        <Box overflowY='hidden' w='300px' h='calc(100vh - 50px)' bg={secondary} p={4}>
          <CloseButton onClick={() => setIsMessageOpen(false)} />
          <Text fontSize='3xl'>{userNameDM}</Text>
          <Flex direction='column' h='100%'>
            <Stack flex={0.85} borderRadius={10} overflowY='scroll' id='chat-Area' ref={chatAreaRef} bg={dmbg}>
              <>
                <Box>
                  <Flex justify='left' p='1' color={secondary}>
                    <Avatar p='1' borderRadius='full' boxSize='40px' src={userIconDM} alt='User Icon' />
                    <Text bg={boxbg} p='2' borderRadius='md' w='60%'>
                      ここでメッセージ変えるよ
                    </Text>
                  </Flex>
                  {messages.map((message, index) => (
                    <Flex justify='right' p='1' color={secondary}>
                      <Text bg={boxbg} p='2' borderRadius='md' w='60%'>
                        {message}
                      </Text>
                      <Avatar
                        p='1'
                        borderRadius='full'
                        boxSize='40px'
                        src='https://bit.ly/dan-abramov'
                        alt='User Icon'
                      />
                    </Flex>
                  ))}
                </Box>
              </>
            </Stack>
            <Flex mt={15} top='50' borderRadius='full' bg={secondary}>
              <Input
                placeholder='メッセージを入力'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button colorScheme='blue' ml={2} onClick={() => sendMessage()}>
                送信
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default DMModal;
