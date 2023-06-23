import { Avatar, Box, Grid, Text, GridItem, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { Image, Stack, AspectRatio } from "@chakra-ui/react";
import { theme } from "@/pages/_app";
import { useMemo, useState } from "react";

import GridImage from "@/components/GridImage";
import { ImageListData } from "@/types/api/image";
import IdeaBoxThumbnail from "@/components/IdeaBoxThumbnail";

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

  return (
    <Flex flexDirection='column' align='center'>
      <Avatar size='xl' src='https://bit.ly/broken-link' />
      <Box fontSize='36px'>name</Box>
      <Box color={secondary}>UserID</Box>
      <Box>フォロワー：4人・フォロー中：3人</Box>
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
    </Flex>
  );
};

export default MypagePage;
