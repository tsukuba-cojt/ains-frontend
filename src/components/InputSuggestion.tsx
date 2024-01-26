import { CheckCircleIcon, SpinnerIcon } from "@chakra-ui/icons";
import { Input, Box, Flex, Text, Image, LinkBox, LinkOverlay, Link, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import useSWR from "swr";

import HoverTag from "@/components/HoverTag";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";
import UserInteractor from "@/interactors/User/UserInteractor";

interface Props_ArtworkData {
  artworkData: ArtworkData;
}

function textOmission(text: string, maxLen: number): string {
  if (text.length > maxLen) {
    return text.substring(0, maxLen - 1) + "…";
  } else {
    return text;
  }
}

function ThumbnailImage(props: Props_ArtworkData) {
  const {
    data: imgURL,
    error,
    isLoading,
  } = useSWR(`/thumbnail/${props.artworkData.id}`, async () => {
    let thumbnail_url = "/text_file.png";
    if (props.artworkData.type === "image") {
      thumbnail_url = props.artworkData.file.url;
    } else {
      switch (props.artworkData.type) {
        case "text": {
          thumbnail_url = "/text_file.png";
          break;
        }
        case "audio": {
          thumbnail_url = "/audio_file.png";
          break;
        }
        case "video": {
          thumbnail_url = "/text_file.png";
          break;
        }
      }
      for (let i = 0; i < props.artworkData.parent_ids.length; i++) {
        const parent_artwork = await new ArtworkInteractor().get(props.artworkData.parent_ids[0]);
        if (parent_artwork !== null && parent_artwork.type === "image") {
          thumbnail_url = parent_artwork.file.url;
          break;
        }
      }
    }
    return thumbnail_url;
  });
  if (imgURL !== null || imgURL !== undefined) {
    return <Image src={imgURL} boxSize='20px' alt='image' />;
  } else {
    return <SpinnerIcon boxSize='20px' />;
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
        <Link isExternal={true} href={`mypage`} marginRight='10px'>
          {textOmission(userPubData.name, 15)}
        </Link>
      </>
    );
  } else {
    return (
      <>
        <SpinnerIcon boxSize='20px' marginLeft='auto' marginRight='5px' />
        <Link isExternal={true} marginRight='10px'>
          Loading…
        </Link>
      </>
    );
  }
}

export default function App() {
  const [serchBoxTexts, setSerchBoxTexts] = useState("");
  const [selectedParentWorks, setSelectedParentWorks] = useState<Array<ArtworkData>>([]);
  const router = useRouter();
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
        <LinkBox _hover={{ bg: "black" }}>
          <LinkOverlay
            onClick={() => {
              setSelectedParentWorks(
                aDataIsSelected
                  ? selectedParentWorks.filter((aAryData, index) => aAryData.id !== artworkData.id)
                  : [...selectedParentWorks, artworkData]
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
        onClick={() =>
          setSelectedParentWorks(
            selectedParentWorks.filter((aDataInArray, index) => aDataInArray.id !== artworkData.id)
          )
        }
      >
        <ThumbnailImage artworkData={artworkData} />
        <Text marginLeft='5px'>{artworkData.name}</Text>
      </HoverTag>
    </>
  );

  let artworksSelection: JSX.Element = <>検索中…</>;
  if (!error && artworks !== null && artworks !== undefined) {
    //検索結果が取得できている
    if (artworks.length == 0 && serchBoxTexts.length > 0) {
      //検索ワードが入力されているが、ヒットした作品がない。
      artworksSelection = <>検索結果なし</>;
    } else {
      //検索ワードが入力されていて。ヒットした作品がある
      artworksSelection = <>{artworks.map((aData: ArtworkData) => suggestionBox(aData))}</>;
    }
  }

  let selectedArtWorks = selectedParentWorks.map((aData) => selectedArtwork(aData));

  return (
    <Box>
      <Input variant='filled' placeholder='検索' onChange={(event) => setSerchBoxTexts(event.target.value)}></Input>
      <Box maxH='180px' overflowY='scroll'>
        {artworksSelection}
      </Box>
      {selectedArtWorks}
    </Box>
  );
}
