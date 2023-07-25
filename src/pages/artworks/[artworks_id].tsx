import {
  Container,
  Tag,
  HStack,
  VStack,
  Box,
  Flex,
  Image,
  Heading,
  Text,
  useColorModeValue,
  Spacer,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import useSWR from "swr";

import CommentBox from "@/components/CommentBox";
import LoadingPanel from "@/components/LoadingPanel";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";

import { theme } from "../_app";

// TODO: 音声と画像のサムネイルを親作品の画像をスライドできるようにする
// TODO: 親作品の一覧を表示
// TODO: コメントのpostをやる

const ArtworkDetailPage = () => {
  const router = useRouter();
  const { artworks_id } = router.query;

  const {
    data: artwork,
    error,
    isLoading,
  } = useSWR(`/artworks/${artworks_id as string}`, () =>
    new ArtworkInteractor().getWithRelativeData(artworks_id as string)
  );

  const [doesExpandDescription, setDoesExpandDescription] = useState<boolean>(false);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const tag_elements = useMemo<JSX.Element[]>(() => {
    if (!artwork) return [];
    return artwork.tags.map<JSX.Element>((tag: string, index: number) => <Tag key={index}>{tag}</Tag>);
  }, [artwork]);

  const content_preview_element = useMemo<JSX.Element>(() => {
    if (!artwork) return <></>;
    switch (artwork.type) {
      case "image": {
        return <Image src={artwork.file.url} alt={artwork.name} />;
      }
      case "text": {
        return <></>;
      }
      case "audio": {
        return <></>;
      }
      case "video": {
        return <video controls src={artwork.file.url} />;
      }
      default: {
        return <></>;
      }
    }
  }, [artwork]);

  if (error || artwork === null) return <>Error!</>;
  if (isLoading || artwork === undefined) return <LoadingPanel />;

  return (
    <Container maxW='container.lg' p={5}>
      <Flex justify='center' direction={{ base: "column", md: "row" }} gap={10}>
        <VStack>
          <Box maxH='80vh' maxW={{ base: "80vw", md: "40vw" }}>
            {content_preview_element}
          </Box>
          <Spacer />
        </VStack>
        <Flex
          flexGrow={1}
          borderLeft='1px'
          borderColor='gray.500'
          paddingLeft={10}
          paddingY={5}
          direction='column'
          gap={5}
        >
          <Heading as='h3' size='lg'>
            {artwork.name}
          </Heading>
          <Text
            onClick={() => setDoesExpandDescription(!doesExpandDescription)}
            noOfLines={doesExpandDescription ? undefined : 3}
          >
            {artwork.description ? artwork.description : ""}
          </Text>
          <Flex alignItems='center' gap={4}>
            <Image boxSize='2.5rem' src={artwork.author.icon_url} rounded='full' alt='user icon' />
            <Text>{artwork.author.name}</Text>
          </Flex>
          <HStack>{tag_elements}</HStack>
          <Button>参考アップロード</Button>
          <Box p={3} rounded='md' bg={secondary}>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      コメント
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default ArtworkDetailPage;
