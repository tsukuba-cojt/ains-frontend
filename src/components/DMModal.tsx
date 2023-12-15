import {
  Input,
  Box,
  Card,
  CloseButton,
  Button,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Flex,
  Stack,
  Image,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

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

  const [changeUserID, setChangeUserID] = useState<boolean>(false);

  const chatAreaRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message["contents"][]>([]); // メッセージのリスト
  const [newMessage, setNewMessage] = useState(""); // 新しいメッセージの入力値
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

  return (
    <Box overflowY='auto' position='fixed' top='50px' right='0px' h='calc(100vh - 50px)' bg='green'>
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
              <Card p='4' bg='tomato' variant='outline'>
                <CloseButton onClick={() => props.onClose()} />
                <CardHeader>
                  <Heading size='xl'>Direct Message</Heading>
                </CardHeader>

                <CardBody>
                  <Stack spacing='4'>
                    <Box bg='black' p='4' onClick={() => setIsMessageOpen(true)}>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='black' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                    <Box bg='blue' p='4'>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                        <Text fontSize='md'> user name</Text>
                      </Flex>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      {isMessageOpen && (
        <Box overflowY='hidden' w='320px' h='calc(100vh - 50px)' bg='gray' p={4}>
          <CloseButton onClick={() => setIsMessageOpen(false)} />
          <Text fontSize='3xl'>user name</Text>
          <Flex direction='column' h='100%'>
            <Stack flex={0.85} overflowY='scroll' ref={chatAreaRef}>
              <>
                {changeUserID == true ? (
                  <Box borderWidth='1px'>
                    {messages.map((message, index) => (
                      <Flex key={index} justify='right' p='1'>
                        <Text bg='blue.100' p='2' borderRadius='md' w='60%'>
                          {message}
                        </Text>
                        <Image
                          p='1'
                          borderRadius='full'
                          boxSize='40px'
                          src='https://bit.ly/dan-abramov'
                          alt='User Icon'
                        />
                      </Flex>
                    ))}
                  </Box>
                ) : (
                  <Box borderWidth='1px'>
                    {messages.map((message, index) => (
                      <Flex key={index} justify='left' p='1'>
                        <Image
                          p='1'
                          borderRadius='full'
                          boxSize='40px'
                          src='https://bit.ly/dan-abramov'
                          alt='User Icon'
                        />
                        <Text bg='blue.100' p='2' borderRadius='md' w='60%'>
                          {message}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                )}
              </>
            </Stack>
            <Flex mt={15} top='50' borderRadius='full' bg='white'>
              <Input
                placeholder='メッセージを入力'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                color='tomato'
                _placeholder={{ color: "tomato" }}
              />
              <Button colorScheme='blue' ml={2} onClick={() => setChangeUserID(!changeUserID)}>
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
