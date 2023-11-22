// FollowingModal.tsx

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Avatar,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface FollowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  followers: number;
  following: number;
}

const FollowingModal: React.FC<FollowingModalProps> = ({ isOpen, onClose, followers, following }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  interface User {
    id: number;
    username: string;
    userId: string;
    profile: string;
    avatar: string;
    isFollowed: boolean;
  }

  const dummyData: User[] = [
    {
      id: 1,
      username: "john_doe",
      userId: "john_doe_123",
      profile: "WebDeveloperaaaaaaaaaabbbbbbbbbbbvvvvvfffffdddddddwwwwwrrr",
      avatar: "https://placekitten.com/50/50",
      isFollowed: false,
    },
    {
      id: 2,
      username: "jane_smith",
      userId: "jane_smith_456",
      profile: "草むしり検定1級、noteに役立つ情報載せてます。",
      avatar: "https://placekitten.com/50/51",
      isFollowed: false,
    },
    {
      id: 3,
      username: "bob_jones",
      userId: "bob_jones_789",
      profile: "Content Creator",
      avatar: "https://placekitten.com/50/52",
      isFollowed: false,
    },
    // 他のダミーデータ
  ];

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const truncateProfile = (profile: string, maxLength: number) => {
    if (profile.length > maxLength) {
      return `${profile.slice(0, maxLength)}...`;
    }
    return profile;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>フォローとフォロワーの一覧</ModalHeader>
        <ModalCloseButton />
        <Tabs align='center' onChange={handleTabChange} index={activeTab}>
          <TabList>
            <Tab onClick={() => handleTabChange(0)}>フォロー</Tab>
            <Tab onClick={() => handleTabChange(1)}>フォロワー</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ModalBody>
                {dummyData.map((user, index) => (
                  <React.Fragment key={user.id}>
                    {index > 0 && <Box h={2} />} {/* 名前とIDの間の空白の高さ */}
                    <Flex key={user.id} alignItems='flex-start' justifyContent='space-between' mb={4}>
                      <Flex alignItems='flex-start'>
                        <Avatar size='lg' src={user.avatar} mr={4} />
                        <Box>
                          <Text fontWeight='bold' style={{ textAlign: "left" }}>
                            {user.username}
                          </Text>
                          <Text color='gray.500' style={{ textAlign: "left" }}>
                            @{user.userId}
                          </Text>
                          <Text style={{ textAlign: "left" }}>
                            {/* マージンのトップを変更 */}
                            {truncateProfile(user.profile, 20)}
                          </Text>
                        </Box>
                      </Flex>
                      <Button
                        size='sm'
                        borderRadius='20%'
                        colorScheme='teal'
                        variant='outline'
                        ml={4} // 左マージンを追加
                      >
                        フォロー中
                      </Button>
                    </Flex>
                    {index < dummyData.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </ModalBody>
            </TabPanel>
            <TabPanel>
              <ModalBody>
                {/* 追加のフォロワーのアカウントデータ */}
                {dummyData.slice(0, 2).map((user, index) => (
                  <React.Fragment key={user.id}>
                    {index > 0 && <Box h={2} />} {/* 名前とIDの間の空白の高さ */}
                    <Flex key={user.id} alignItems='flex-start' justifyContent='space-between' mb={4}>
                      <Flex alignItems='flex-start'>
                        <Avatar size='lg' src={user.avatar} mr={4} />
                        <Box>
                          <Text fontWeight='bold' style={{ textAlign: "left" }}>
                            {user.username}
                          </Text>
                          <Text color='gray.500' style={{ textAlign: "left" }}>
                            @{user.userId}
                          </Text>
                          <Text style={{ textAlign: "left" }}>
                            {/* マージンのトップを変更 */}
                            {truncateProfile(user.profile, 20)}
                          </Text>
                        </Box>
                      </Flex>
                      <Button
                        size='sm'
                        borderRadius='20%'
                        colorScheme='teal'
                        ml={4} // 左マージンを追加
                        backgroundColor='teal.500' // 背景色を追加
                      >
                        フォローする
                      </Button>
                    </Flex>
                    {index < dummyData.slice(0, 2).length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </ModalBody>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};

export default FollowingModal;
