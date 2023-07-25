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
  Avatar,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useMemo, useContext, ChangeEvent, ReactNode, useEffect } from "react";
import useSWR from "swr";

import CommentBox from "@/components/CommentBox";
import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import ImageSlider, { ImageItem } from "@/components/ImageSlider";
import LoadingPanel from "@/components/LoadingPanel";
import SoundFileIcon from "@/icons/SoundFileIcon";
import TextFileIcon from "@/icons/TextFileIcon";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";
import CommentInteractor from "@/interactors/Comment/CommentInteractor";
import { CommentData } from "@/interactors/Comment/CommentTypes";

import { theme } from "../_app";

// TODO: 親作品の一覧を表示

const ArtworkDetailPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { artworks_id } = router.query;
  const { user } = useContext(FirebaseAuthContext);

  const {
    data: artwork,
    error,
    isLoading,
    mutate,
  } = useSWR(`/artworks/${artworks_id as string}`, () =>
    new ArtworkInteractor().getWithRelativeData(artworks_id as string)
  );

  const [doesExpandDescription, setDoesExpandDescription] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [textElement, setTextElement] = useState<ReactNode>(<></>);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const uploadComment = async (): Promise<void> => {
    if (commentText === "" || !artwork) return;
    if (user === null) {
      toast({
        title: "ログインしてください",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const new_comment = await new CommentInteractor().set({
      artwork_id: artworks_id as string,
      text: commentText,
      author_id: user.id,
    });
    if (new_comment !== null) {
      setCommentText("");
      mutate({ ...artwork, comments: artwork.comments.concat(new_comment) });
      toast({
        title: "コメントを送信しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "送信に失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
        if (artwork.parents.length > 0) {
          return <Image src={artwork.parents[0].file.url} alt={artwork.parents[0].name} />;
        } else {
          return <TextFileIcon boxSize='xs' color='chakra-body-text' />;
        }
      }
      case "audio": {
        if (artwork.parents.length > 0) {
          return (
            <>
              <Image src={artwork.parents[0].file.url} alt={artwork.parents[0].name} pb={2} />;
              <audio controls src={artwork.file.url}></audio>
            </>
          );
        } else {
          return (
            <>
              <SoundFileIcon boxSize='xs' color='chakra-body-text' pb={2} />
              <audio controls src={artwork.file.url}></audio>
            </>
          );
        }
      }
      case "video": {
        return <video controls src={artwork.file.url} />;
      }
      default: {
        return <></>;
      }
    }
  }, [artwork]);

  const comment_elements = useMemo(() => {
    return artwork?.comments.map((comment: CommentData, index: number) => (
      <CommentBox key={index} icon_url={comment.author.icon_url} username={comment.author.name} text={comment.text} />
    ));
  }, [artwork?.comments]);

  const image_slider_items = useMemo(() => {
    if (!artwork) return [];
    return artwork.parents.map<ImageItem>((parent: ArtworkData) => {
      let thumbnail_url = "";
      if (parent.type === "image") {
        thumbnail_url = parent.file.url;
      } else {
        // 親作品からサムネイルの画像URLをとってくるようにする
      }
      return {
        src: thumbnail_url,
        href: `/artworks/${parent.id}`,
        title: parent.name,
      };
    });
  }, [artwork?.parents]);

  useEffect(() => {
    if (artwork?.type !== "text") {
      setTextElement(<></>);
      return;
    }
    const getTextFileContentFromUrl = async (url: string) => {
      try {
        // const res = await fetch(artwork.file.url);
        // const content = await res.text();
        // setTextElement(<Text>{content}</Text>);
        setTextElement(
          <iframe style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }} src={artwork.file.url}></iframe>
        );
      } catch (_err) {
        setTextElement(<></>);
      }
    };
    getTextFileContentFromUrl(artwork.file.url);
  }, [artwork?.type]);

  if (error || artwork === null) return <>Error!</>;
  if (isLoading || artwork === undefined) return <LoadingPanel />;

  return (
    <Container maxW='container.lg' p={5}>
      <Flex justify='center' direction={{ base: "column", md: "row" }} gap={10} marginBottom={5}>
        <VStack>
          <Box maxH='80vh' maxW={{ base: "80vw", md: "40vw" }}>
            {content_preview_element}
          </Box>
          <Spacer />
        </VStack>
        <Flex
          flexGrow={1}
          borderLeft={{ base: "0px", md: "1px" }}
          borderTop={{ base: "1px", md: "0px" }}
          borderColor='gray.500'
          paddingLeft={{ base: 0, md: 10 }}
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
            <Avatar size='sm' src={artwork.author.icon_url} name={artwork.author.name} />
            <Text>{artwork.author.name}</Text>
          </Flex>
          <HStack>{tag_elements}</HStack>
          <Button>参考アップロード</Button>
          <Box>
            <Heading as='h4' size='md' mb={3}>
              親作品
            </Heading>
            <ImageSlider col={2} col_sm={1} images={image_slider_items} />
          </Box>
          <Box p={3} rounded='md' bg={secondary}>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      コメント <span>{artwork.comments.length}件</span>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex alignItems='center' padding={5} gap={4} borderBottom='1px'>
                    {user === null ? (
                      <>コメントをするにはログインしてください</>
                    ) : (
                      <>
                        <Avatar size='sm' name={user.name} borderColor='gray.800' src={user.icon_url} />
                        <Input
                          variant='flushed'
                          value={commentText}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
                        />
                        <Button isDisabled={commentText === "" ? true : false} onClick={uploadComment} rounded='full'>
                          送信
                        </Button>
                      </>
                    )}
                  </Flex>
                  {comment_elements}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Flex>
      </Flex>
      {textElement}
    </Container>
  );
};

export default ArtworkDetailPage;
