import { CheckCircleIcon, SpinnerIcon } from "@chakra-ui/icons";
import { Input, Box, Flex, Text, LinkBox, LinkOverlay, Link, Avatar, Button } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import useSWR from "swr";

import HoverTag from "@/components/HoverTag";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";
import UserInteractor from "@/interactors/User/UserInteractor";

import ThumbnailImage from "./ThumbnailImage";

function textOmission(text: string, maxLen: number): string {
  if (text.length > maxLen) {
    return text.substring(0, maxLen - 1) + "…";
  } else {
    return text;
  }
}

interface Props_UserID {
  userID: string;
}

function UserAvaterAndName(props: Props_UserID) {
  const {
    data: userPubData,
    error,
    isLoading,
  } = useSWR(`/user/${props.userID}`, () => new UserInteractor().getPublicData(props.userID));

  if (userPubData !== null && userPubData !== undefined) {
    return (
      <>
        <Avatar src={userPubData.icon} boxSize='20px' marginLeft='auto' marginRight='5px'></Avatar>
        <Text marginRight='10px'>{textOmission(userPubData.name, 15)}</Text>
      </>
    );
  } else {
    return (
      <>
        <SpinnerIcon boxSize='20px' marginLeft='auto' marginRight='5px' />
        <Text marginRight='10px'>Loading…</Text>
      </>
    );
  }
}

interface Props_StrAryHook {
  selectedParentWorks: Array<ArtworkData>;
  setSelectedParentWorks: (setValue: Array<ArtworkData>) => void;
}

export default function ParentWorksInput(props: Props_StrAryHook) {
  const [serchBoxTexts, setSerchBoxTexts] = useState("");
  const [selectedParentWorks, setSelectedParentWorks] = [props.selectedParentWorks, props.setSelectedParentWorks];

  const [isSuggestionEnable, setIsSuggestionEnable] = useState<boolean>(false);
  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR(`/artworks/search_artwork?keywords=${serchBoxTexts}`, () =>
    new ArtworkInteractor().fullTextSearch(10, serchBoxTexts.split(/\s+/))
  );

  const suggestionBox = (artworkData: ArtworkData): JSX.Element => {
    const aDataIsSelected = selectedParentWorks.find((aAryData) => aAryData.id === artworkData.id);
    return (
      <>
        <LinkBox bg='red' _hover={{ bg: "black" }}>
          <LinkOverlay
            onClick={() => {
              setSelectedParentWorks(
                aDataIsSelected
                  ? selectedParentWorks.filter((aAryData, index) => aAryData.id !== artworkData.id)
                  : selectedParentWorks.length < 10
                  ? [...selectedParentWorks, artworkData]
                  : selectedParentWorks
              );
            }}
          ></LinkOverlay>
          <Flex align='center' height='35px'>
            {aDataIsSelected ? (
              <CheckCircleIcon boxSize='16px' marginLeft='5px' marginRight='5px' />
            ) : (
              <Box boxSize='16px' marginLeft='5px' marginRight='5px' />
            )}
            <ThumbnailImage artworkData={artworkData} />
            <Link
              isExternal={true}
              href={`/artworks/${artworkData.id}`}
              textAlign={["left", "center"]}
              marginLeft='10px'
            >
              {textOmission(artworkData.name, 15)}
            </Link>
            <UserAvaterAndName userID={artworkData.author_id} />
          </Flex>
        </LinkBox>
      </>
    );
  };

  const selectedArtwork = (artworkData: ArtworkData): JSX.Element => (
    <>
      <HoverTag
        onClick={() => {
          setSelectedParentWorks(
            selectedParentWorks.filter((aDataInArray, index) => aDataInArray.id !== artworkData.id)
          );
        }}
      >
        <ThumbnailImage artworkData={artworkData} />
        <Text marginLeft='5px'>{artworkData.name}</Text>
      </HoverTag>
    </>
  );

  let artworksSuggestions: JSX.Element = <Box bg='red'>検索中…</Box>;
  if (!isSuggestionEnable) {
    artworksSuggestions = <></>;
  } else if (!error && artworks !== null && artworks !== undefined) {
    //検索結果が取得できている
    if (artworks.length == 0 && serchBoxTexts.length > 0) {
      //検索ワードが入力されているが、ヒットした作品がない。
      artworksSuggestions = <Box bg='red'>検索結果なし</Box>;
    } else {
      //検索ワードが入力されていて。ヒットした作品がある
      artworksSuggestions = <>{artworks.map((aData: ArtworkData) => suggestionBox(aData))}</>;
    }
  }

  let selectedArtWorks = selectedParentWorks.map((aData) => selectedArtwork(aData));

  return (
    <>
      {isSuggestionEnable && (
        <Box
          left={0}
          top={0}
          background=''
          position='absolute'
          width='100%'
          height='100%'
          zIndex='modal'
          onClick={() => setIsSuggestionEnable(false)}
        ></Box>
      )}
      <Box height='230px' width='100%' zIndex={isSuggestionEnable ? "toast" : "auto"}>
        <Text>親作品</Text>
        <Box height='40px' marginBottom='10px' overflowY='visible'>
          <Input
            height='40px'
            variant='filled'
            placeholder='検索'
            onChange={(event) => setSerchBoxTexts(event.target.value)}
            onFocus={() => setIsSuggestionEnable(true)}
          ></Input>
          <Box maxH='150px' overflowY='scroll' position='relative' zIndex={"toast"}>
            {artworksSuggestions}
          </Box>
          {isSuggestionEnable && (
            <Button height='30px' onClick={() => setIsSuggestionEnable(false)} width='100%'>
              閉じる
            </Button>
          )}
        </Box>
        {selectedArtWorks}
        <Text mt={2} textAlign='right' color={selectedParentWorks.length >= 10 ? "red.500" : ""}>
          {selectedParentWorks.length}/10
        </Text>
      </Box>
    </>
  );
}
