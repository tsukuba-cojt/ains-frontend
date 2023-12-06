import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import useSWR from "swr";

import GridArtworks from "@/components/GridArtworks";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import BaseInteractor from "@/interactors/BaseInteractor";

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
  } = useSWR(`/artworks/search?keywords=${searchKeyWords}&tags=${searchTags}`, () =>
    new ArtworkInteractor().fullTextAndTagSearch(100, searchKeyWords.split(/\s+/), searchTags.split(/\s+/))
  );
  console.log(`serach result:${artworks}`);

  const router = useRouter();

  let artworksBox: JSX.Element = <>Error!</>;
  if (error || artworks === null) {
    artworksBox = <>Errorだよ〜</>;
  } else if (isLoading || artworks === undefined) {
    artworksBox = <>検索しています!</>;
  } else {
    artworksBox = <GridArtworks artworks={artworks} />;
  }

  return (
    <Box>
      {searchKeyWords}の検索結果
      <Tabs align='center' defaultIndex={1}>
        <TabList>
          <Tab>コンテンツ</Tab>
          <Tab>ユーザー</Tab>
          <Tab>コミュニティ</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
          <TabPanel>{artworksBox}</TabPanel>
          <TabPanel>{artworksBox}</TabPanel>
          <TabPanel>{artworksBox}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SearchResultPage;
