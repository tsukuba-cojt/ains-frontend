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
import { useState, useContext } from "react";
import useSWR from "swr";

import DMInteractor from "@/interactors/DM/DMInteractor";
import { DMDataWithRelativeData, DMMessageCreateData, DMMessageDataWithRelativeData } from "@/interactors/DM/DMTypes";

import { FirebaseAuthContext } from "./FirebaseAuthProvider";

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
  const { user } = useContext(FirebaseAuthContext);

  const interactor = new DMInteractor();

  const {
    data: MyDMDatas,
    error: DMError,
    isLoading: DMLoading,
  } = useSWR(`/DM/${user ? user.id : "None"}`, async () => {
    if (user) {
      return await interactor.getWithMemberID_DM(user.id);
    } else {
      return [];
    }
  });

  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

  const [OpeningDM, setOpeningDM] = useState<DMDataWithRelativeData | null>(null);
  const chatAreaRef = useRef<HTMLDivElement | null>(null);

  const [newMessage, setNewMessage] = useState(""); // 新しいメッセージの入力値

  const [cachedDMMessage, setCachedDMMessage] = useState<DMMessageDataWithRelativeData[]>([]); //前回のDMMessagesの更新と次の更新との間に投稿したメッセージ
  const {
    data: DMMessages,
    error: DMMessageError,
    isLoading: DMMessageLoading,
  } = useSWR(
    `/DMMessage/${OpeningDM ? OpeningDM.id : "None"}`,
    async () => {
      if (OpeningDM) {
        const retval = await interactor.getLatests_DMMessage(OpeningDM.id, 30);
        setCachedDMMessage([]);
        return retval;
      } else {
        setCachedDMMessage([]);
        return [];
      }
    },
    { refreshInterval: 10000 }
  );

  const CurrentDispMessages = cachedDMMessage.concat(DMMessages ? DMMessages : []);

  // 新しいメッセージを送信する関数
  const sendMessage = async () => {
    if (newMessage.trim()) {
      if (OpeningDM && user) {
        const createData: DMMessageCreateData = {
          content: newMessage,
          sender_id: user.id,
        };
        const sentMessage = await interactor.set_DMMessage(OpeningDM?.id, createData);
        if (sentMessage) {
          setCachedDMMessage([sentMessage, ...cachedDMMessage]);
        }
      } else {
        console.log("unreachable!");
      }
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
  }, [CurrentDispMessages]);

  const ButtonToDM = (dmData: DMDataWithRelativeData) => {
    let MyUserID = user ? user.id : "unreachable";
    const thumbnailURL: string = GetDMImage(dmData);
    const titleUserName = GetDMTitle(dmData);

    return (
      <Box
        bg='black'
        p='4'
        onClick={() => {
          setIsMessageOpen(true);
          setOpeningDM(dmData);
        }}
      >
        <Flex>
          <Image borderRadius='full' boxSize='30px' src={thumbnailURL} alt='User Icon' />
          <Text fontSize='md'> {titleUserName}</Text>
        </Flex>
      </Box>
    );
  };

  const GetDMTitle = (dmData: DMDataWithRelativeData) => {
    let MyUserID = user ? user.id : "unreachable";
    let titleUserName = user ? user.name : "unreachable";
    //console.log(MyUserID + ":" + titleUserName);
    for (let i = 0; i < dmData.members.length; i++) {
      const aMember = dmData.members[i];
      if (aMember.id != MyUserID) {
        titleUserName = aMember.name;
        return titleUserName;
      }
    }
    return titleUserName;
  };
  const GetDMImage = (dmData: DMDataWithRelativeData): string => {
    let MyUserID = user ? user.id : "unreachable";
    let thumbnailURL = user ? (user.icon ? user.icon : "https://bit.ly/dan-abramov") : "unreachable";
    for (let i = 0; i < dmData.members.length; i++) {
      const aMember = dmData.members[i];
      if (aMember.id != MyUserID && aMember.icon) {
        thumbnailURL = aMember.icon;
        return thumbnailURL;
      }
    }
    return thumbnailURL;
  };

  let ButtonsToDM_Node = <></>;
  if (MyDMDatas) {
    ButtonsToDM_Node = <>{MyDMDatas.map((aData) => ButtonToDM(aData))}</>;
  }

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
              <Card minHeight='100%' p='4' bg='tomato' variant='outline'>
                <CloseButton onClick={() => props.onClose()} />
                <CardHeader>
                  <Heading size='xl'>Direct Message</Heading>
                </CardHeader>

                <CardBody>
                  <Stack spacing='4'>{ButtonsToDM_Node}</Stack>
                </CardBody>
              </Card>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      {isMessageOpen && (
        <Box overflowY='hidden' w='320px' h='calc(100vh - 50px)' bg='gray' p={4}>
          <CloseButton onClick={() => setIsMessageOpen(false)} />
          <Text fontSize='3xl'>{OpeningDM ? GetDMTitle(OpeningDM) : "user name"}</Text>
          <Flex direction='column' h='100%'>
            <Stack flex={0.85} overflowY='scroll' ref={chatAreaRef}>
              <>
                {
                  <Box borderWidth='1px'>
                    {CurrentDispMessages.map((message, index) => {
                      const imagePart = (
                        <Image
                          p='1'
                          borderRadius='full'
                          boxSize='40px'
                          src={message.sender.icon ? message.sender.icon : "https://bit.ly/dan-abramov"}
                          alt='User Icon'
                        />
                      );
                      const textPart = (
                        <Text bg='blue.100' p='2' borderRadius='md' w='60%'>
                          {message.content}
                        </Text>
                      );
                      const isMyMessage = user && message.sender.id === user.id;
                      return (
                        <Flex key={index} justify={isMyMessage ? "left" : "right"} p='1'>
                          {isMyMessage ? (
                            <>
                              {imagePart}
                              {textPart}
                            </>
                          ) : (
                            <>
                              {textPart}
                              {imagePart}
                            </>
                          )}
                        </Flex>
                      );
                    }).reverse()}
                  </Box>
                }
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
              <Button
                colorScheme='blue'
                ml={2}
                onClick={() => {
                  sendMessage();
                }}
              >
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
