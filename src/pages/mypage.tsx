import { Avatar, Box, Grid, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import FollowingModal from "@/components/FollowingModal";
import IdeaBoxThumbnail from "@/components/IdeaBoxThumbnail";
import { theme } from "@/pages/_app";

import { ImageListData } from "@/types/image";

const MypagePage = () => {
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const columnValue = useBreakpointValue({
    base: "repeat(2,1fr)",
    sm: "repeat(3, 1fr)",
    lg: "repeat(5, 1fr)",
  });

  const [thumbnailImages, setThumbnailImages] = useState<ImageListData[][]>([
    [
      { id: "IMG_0649.png", name: "hoge", url: "/IMG_0649.png" },
      { id: "AA.jpg", name: "hoge", url: "/AA.jpg" },
      { id: "AA2.jpg", name: "hoge", url: "/AA2.jpg" },
    ],
    [
      { id: "R.jpg", name: "hoge", url: "/R.jpg" },
      { id: "SP.png", name: "hoge", url: "/SP.png" },
      { id: "IK.jpg", name: "hoge", url: "/IK.jpg" },
    ],
    [
      { id: "OIP.jpg", name: "hoge", url: "/OIP.jpg" },
      { id: "BU.jpg", name: "hoge", url: "/BU.jpg" },
      { id: "MA.jpg", name: "hoge", url: "/MB.jpg" },
    ],
    [
      { id: "IMG_0649.png", name: "hoge", url: "/IMG_0649.png" },
      { id: "AA.jpg", name: "hoge", url: "/AA.jpg" },
      { id: "AA2.jpg", name: "hoge", url: "/AA2.jpg" },
    ],
    [
      { id: "R.jpg", name: "hoge", url: "/R.jpg" },
      { id: "SP.png", name: "hoge", url: "/SP.png" },
      { id: "IK.jpg", name: "hoge", url: "/IK.jpg" },
    ],
    [
      { id: "OIP.jpg", name: "hoge", url: "/OIP.jpg" },
      { id: "BU.jpg", name: "hoge", url: "/BU.jpg" },
      { id: "MA.jpg", name: "hoge", url: "/MB.jpg" },
    ],
  ]);

  const image_grid_items = useMemo<JSX.Element[]>(
    () =>
      thumbnailImages.map<JSX.Element>(
        (images: ImageListData[], index: number): JSX.Element => <IdeaBoxThumbnail key={index} images={images} />
      ),
    [thumbnailImages]
  );

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex flexDirection='column' align='center'>
      <Avatar size='xl' src='https://bit.ly/broken-link' />
      <Box fontSize='36px'>name</Box>
      <Box color={secondary}>UserID</Box>
      <Button onClick={openModal} fontSize='md' variant='link' _hover={{ color: "teal.500" }}>
        フォロー：3人・フォロワー：2人
      </Button>
      <Flex>
        <Button mr={2}>シェア</Button>
        <Button>プロフィールを編集</Button>
      </Flex>
      <Box my={2}></Box>
      <Tabs align='center' defaultIndex={1}>
        <TabList>
          <Tab>作成コンテンツ</Tab>
          <Tab>保存済み</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            <Grid templateColumns={columnValue} columnGap={110} rowGap={0} justifyItems='center'>
              {image_grid_items}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid templateColumns={columnValue} columnGap={110} rowGap={0} justifyItems='center'>
              {image_grid_items}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <FollowingModal isOpen={isModalOpen} onClose={closeModal} followers={4} following={3} />
    </Flex>
  );
};

export default MypagePage;
