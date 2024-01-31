import { Box, Grid, GridItem, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { Text, Flex, Avatar, Link } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import useSWR from "swr";

import GridArtworks from "@/components/GridArtworks";
import LinkCard from "@/components/LinkCard";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import BaseInteractor from "@/interactors/BaseInteractor";
import CommunityInteractor from "@/interactors/Communities/CommunityInteractor";
import UserInteractor from "@/interactors/User/UserInteractor";
import { UserPublicData } from "@/interactors/User/UserTypes";

import { theme } from "./_app";

const SearchResultPage = () => {
  //const collectionName = "norlessgramSerchTest";
  const collectionName = "artworks";

  const auth = getAuth();
  const db = getFirestore();
  const { colorMode, toggleColorMode } = useColorMode();

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const interactor = new BaseInteractor();

  const searchParams = useSearchParams();
  const KeywordParam = searchParams.get("keywords");
  const searchKeyWords = KeywordParam ? KeywordParam : "";
  const TagsParam = searchParams.get("tags");
  const searchTags = TagsParam ? TagsParam : "";

  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR(`/artworks/search_artwork?keywords=${searchKeyWords}&tags=${searchTags}`, () =>
    new ArtworkInteractor().fullTextAndTagSearch(100, searchKeyWords.split(/\s+/), searchTags.split(/\s+/))
  );

  const {
    data: users,
    error: error_users,
    isLoading: isLoading_users,
  } = useSWR(`/artworks/search_user?keywords=${searchKeyWords}`, () =>
    new UserInteractor().fullTextSearch(100, searchKeyWords.split(/\s+/))
  );

  const {
    data: communities,
    error: errorCommunities,
    isLoading: isLoadingCommunities,
  } = useSWR(`/communities/search?tags=${searchTags}`, () =>
    new CommunityInteractor().fullTextAndTagSearch(100, searchKeyWords.split(/\s+/), searchTags.split(/\s+/))
  );

  const router = useRouter();

  const getUserBox = (
    userName: string,
    userDescription: string,
    iconURL: string,
    userPubData: UserPublicData
  ): JSX.Element => {
    return (
      <Box h='80px' marginBottom='5px' bgColor='black'>
        <Flex gap={3} my={5} h='20px'>
          <Avatar size='sm' src={iconURL} name={userName} />
          <Link onClick={() => router.push(`/users/${userPubData.id}`)}>
            <Text as='b' fontSize='20px'>
              {userName}
            </Text>
          </Link>
        </Flex>
        <Flex>
          <Text marginLeft='10px' textAlign={["start"]}>
            {userDescription}
          </Text>
        </Flex>
      </Box>
    );
  };

  const getUserBoxes = (userPubDatas: Array<UserPublicData>) => {
    return (
      <>
        {userPubDatas.map((aData) => {
          return getUserBox(aData.name, aData.description ? aData.description : "", aData.icon || "", aData);
        })}
      </>
    );
  };

  let artworksBox: JSX.Element = <>Error!</>;
  if (error || artworks === null) {
    artworksBox = <>Errorだよ〜</>;
  } else if (isLoading || artworks === undefined) {
    artworksBox = <>検索しています!</>;
  } else {
    artworksBox = <GridArtworks artworks={artworks} />;
  }

  let usersBox: JSX.Element = <>な〜ん</>;
  if (error_users || users === null) {
    usersBox = <>Errorだよ〜</>;
  } else if (isLoading_users || users === undefined) {
    usersBox = <>検索しています!</>;
  } else {
    usersBox = <>な〜ん</>;
    usersBox = <>{getUserBoxes(users)}</>;
  }

  let communitiesBox: JSX.Element = <>Error!</>;
  if (errorCommunities || communities === null) {
    communitiesBox = <>Errorだよ〜</>;
  } else if (isLoading || communities === undefined) {
    communitiesBox = <>検索しています!</>;
  } else {
    communitiesBox = (
      <Grid gap={5} templateColumns='repeat(3, 1fr)'>
        {communities.map((community, i) => (
          <GridItem key={i}>
            <LinkCard
              title={community.name}
              show_icon
              icon_type='square'
              icon={community.icon?.url}
              href={`/communities/${community.id}`}
            />
          </GridItem>
        ))}
      </Grid>
    );
  }

  return (
    <Box>
      {searchKeyWords +
        searchTags
          .split(/\s+/)
          .map((aData) => {
            return aData.trim() ? " #" + aData : "";
          })
          .join()}
      の検索結果
      <Tabs align='center' defaultIndex={1}>
        <TabList>
          <Tab>コンテンツ</Tab>
          <Tab>ユーザー</Tab>
          <Tab>コミュニティ</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
          <TabPanel>{artworksBox}</TabPanel>
          <TabPanel>{usersBox}</TabPanel>
          <TabPanel>{communitiesBox}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SearchResultPage;
