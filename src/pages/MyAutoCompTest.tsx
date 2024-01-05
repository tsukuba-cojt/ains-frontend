import { CheckCircleIcon, SpinnerIcon } from "@chakra-ui/icons";
import { Input, Box, Flex, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import useSWR from "swr";

import HoverTag from "@/components/HoverTag";
import ThumbnailImage2 from "@/components/ThumbnailImage";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

export interface Item {
  label: string;
  value: string;
}

function ThumbnailImage(artworkData: ArtworkData) {
  const {
    data: imgURL,
    error,
    isLoading,
  } = useSWR(`/thumbnail/${artworkData.id}`, async () => {
    let thumbnail_url = "/text_file.png";
    if (artworkData.type === "image") {
      thumbnail_url = artworkData.file.url;
    } else {
      switch (artworkData.type) {
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
      if (artworkData.parent_ids.length > 0) {
        const parent_artwork = await new ArtworkInteractor().get(artworkData.parent_ids[0]);
        if (parent_artwork !== null && parent_artwork.type === "image") thumbnail_url = parent_artwork.file.url;
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
      artworksSelection = (
        <>
          {artworks.map((aData: ArtworkData) => {
            return (
              <>
                <Flex
                  align='center'
                  _hover={{ bg: "black" }}
                  onClick={() => {
                    console.log(`${aData.id}(${aData.name})`);
                    if (selectedParentWorks.find((aAryData) => aAryData.value === aData.id)) {
                      setSelectedParentWorks(
                        selectedParentWorks.filter((aAryData, index) => aAryData.value !== aData.id)
                      );
                    } else {
                      setSelectedParentWorks([...selectedParentWorks, { label: aData.name, value: aData.id }]);
                    }
                  }}
                >
                  {selectedParentWorks.find((aAryData) => aAryData.value === aData.id) ? (
                    <CheckCircleIcon boxSize='16px' />
                  ) : (
                    <Box boxSize='16px' />
                  )}
                  <ThumbnailImage2 artworkData={aData} />
                  <Text textAlign={["left", "center"]}>{aData.name}</Text>
                </Flex>
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
    <>
      <Box paddingLeft='20px' maxH='300px' overflowY='scroll'>
        <Input variant='filled' placeholder='検索' onChange={(event) => setSerchBoxTexts(event.target.value)}></Input>
        {artworksSelection}
      </Box>
      {selectedArtWorks}
    </>
  );
}
