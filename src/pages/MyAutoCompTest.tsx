import { CheckCircleIcon } from "@chakra-ui/icons";
import { Input, Box, Flex, Avatar, Text, Image, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import useSWR from "swr";

import HoverTag from "@/components/HoverTag";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

export interface Item {
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

  const getArtworkBox = (artworkData: ArtworkData): JSX.Element => {
    if (artworkData.type != "image") {
      return <></>;
    }
    return (
      <Box h='80px' marginBottom='5px' bgColor='black'>
        <Flex gap={3} my={5} h='20px'>
          <Avatar size='sm' src={artworkData.file.url} name={artworkData.name} />
          <Text as='b' fontSize='20px'>
            {artworkData.name}
          </Text>
        </Flex>
        <Flex>
          <Text marginLeft='10px' textAlign={["start"]}>
            {artworkData.description}
          </Text>
        </Flex>
      </Box>
    );
  };

  let artworksBox: JSX.Element = <>検索中…</>;
  if (!error && artworks !== null && artworks !== undefined) {
    if (artworks.length == 0 && serchBoxTexts.length > 0) {
      artworksBox = <>検索結果なし</>;
    } else {
      artworksBox = (
        <>
          {artworks.map((aData: ArtworkData) => {
            return (
              <>
                <Link
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
                  <Flex align='center'>
                    {selectedParentWorks.find((aAryData) => aAryData.value === aData.id) && <CheckCircleIcon />}
                    {aData.type === "image" ? (
                      <Image src={aData.file.url} boxSize='20px' alt='image' marginRight='10px' marginLeft='10px' />
                    ) : (
                      <></>
                    )}
                    <Text textAlign={["left", "center"]}>{aData.name}</Text>
                  </Flex>
                </Link>
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
          {" "}
          {aData.label}{" "}
        </HoverTag>
      </>
    );
  });

  //console.log(serchBoxTexts);

  return (
    <>
      <Input variant='filled' placeholder='検索' onChange={(event) => setSerchBoxTexts(event.target.value)}></Input>
      <Box paddingLeft='20px' maxH='300px' overflowY='scroll'>
        {artworksBox}
      </Box>
      {selectedArtWorks}
    </>
  );
}
