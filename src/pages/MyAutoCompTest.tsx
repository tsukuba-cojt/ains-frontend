import { CheckCircleIcon, SpinnerIcon } from "@chakra-ui/icons";
import { Input, Box, Flex, Text, Image, LinkBox, LinkOverlay, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import useSWR from "swr";

import HoverTag from "@/components/HoverTag";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

interface Props {
  artworkData: ArtworkData;
}
function ThumbnailImage(props: Props) {
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
    return <Image src={imgURL} boxSize='20px' alt='image' marginRight='10px' marginLeft='10px' />;
  } else {
    return <SpinnerIcon boxSize='20px' marginRight='10px' marginLeft='10px' />;
  }
}

interface Item {
  label: string;
  value: string;
}

export default function App() {
  const [serchBoxTexts, setSerchBoxTexts] = useState("");
  const [selectedParentWorks, setSelectedParentWorks] = useState<Array<Item>>([]);
  const router = useRouter();
  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR(`/artworks/search_artwork?keywords=${serchBoxTexts}`, () =>
    new ArtworkInteractor().fullTextSearch(10, serchBoxTexts.split(/\s+/))
  );

  let artworksSelection: JSX.Element = <>検索中…</>;
  if (!error && artworks !== null && artworks !== undefined) {
    //検索結果が取得できている
    if (artworks.length == 0 && serchBoxTexts.length > 0) {
      //検索ワードが入力されているが、ヒットした作品がない。
      artworksSelection = <>検索結果なし</>;
    } else {
      //検索ワードが入力されていて。ヒットした作品がある
      artworksSelection = (
        <>
          {artworks.map((aData: ArtworkData) => {
            const aDataIsSelected = selectedParentWorks.find((aAryData) => aAryData.value === aData.id);
            return (
              <>
                <LinkBox _hover={{ bg: "black" }}>
                  <LinkOverlay
                    onClick={() => {
                      setSelectedParentWorks(
                        aDataIsSelected
                          ? selectedParentWorks.filter((aAryData, index) => aAryData.value !== aData.id)
                          : [...selectedParentWorks, { label: aData.name, value: aData.id }]
                      );
                    }}
                  ></LinkOverlay>
                  <Flex align='center'>
                    {aDataIsSelected ? <CheckCircleIcon boxSize='16px' /> : <Box boxSize='16px' />}
                    <ThumbnailImage artworkData={aData} />
                    <Text textAlign={["left", "center"]}>{aData.name}</Text>
                    <Button
                      height='25px'
                      marginLeft='auto'
                      marginRight='10px'
                      onClick={() => {
                        router.push(`/artworks/${aData.id}`);
                      }}
                    >
                      作品ページへ
                    </Button>
                  </Flex>
                </LinkBox>
              </>
            );
          })}
        </>
      );
    }
  }

  let selectedArtWorks = selectedParentWorks.map((aData) => {
    return (
      <>
        <HoverTag
          onClick={() =>
            setSelectedParentWorks(
              selectedParentWorks.filter((aDataInArray, index) => aDataInArray.value !== aData.value)
            )
          }
        >
          {aData.label}
        </HoverTag>
      </>
    );
  });

  //console.log(serchBoxTexts);

  return (
    <Box width='500px'>
      <Input variant='filled' placeholder='検索' onChange={(event) => setSerchBoxTexts(event.target.value)}></Input>
      <Box paddingLeft='20px' maxH='180px' overflowY='scroll'>
        {artworksSelection}
      </Box>
      {selectedArtWorks}
    </Box>
  );
}
