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
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useState, useMemo, useContext, ChangeEvent, ReactNode, useEffect, Fragment } from "react";
import useSWR from "swr";

import CommentBox from "@/components/CommentBox";
import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import GridArtworks from "@/components/GridArtworks";
import ImageSlider, { ImageItem } from "@/components/ImageSlider";
import LoadingPanel from "@/components/LoadingPanel";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";
import CommentInteractor from "@/interactors/Comment/CommentInteractor";
import { CommentData } from "@/interactors/Comment/CommentTypes";

import { theme } from "../_app";

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
  // とりあえず最新のを順番に取ってくるようにしている
  // 作品に関連するものを取ってくるよう要修正
  const {
    data: artworks,
    error: _error,
    isLoading: _isLoading,
  } = useSWR("/artworks/latest", () => new ArtworkInteractor().getLatests(100));

  const [doesExpandDescription, setDoesExpandDescription] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [textElement, setTextElement] = useState<ReactNode>(<></>);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const jumpToUploadPageWithParentId = (): void => {
    if (!artwork) return;
    router.push(`/upload?parent=${artwork.id}`);
  };

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
          return <Image src='/text_file.png' alt={artwork.name} />;
        }
      }
      case "audio": {
        if (artwork.parents.length > 0) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Image src={artwork.parents[0].file.url} alt={artwork.parents[0].name} pb={2} />
              <audio controls src={artwork.file.url}></audio>
            </Flex>
          );
        } else {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Image src='/audio_file.png' alt={artwork.name} />
              <audio controls src={artwork.file.url}></audio>
            </Flex>
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
      <CommentBox key={index} icon={comment.author.icon || ""} username={comment.author.name} text={comment.text} />
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
        const res = await fetch(artwork.file.url);
        const content = await res.text();
        const content_with_br = content.split("\n").map((t: string, i: number) => {
          return (
            <Fragment key={i}>
              {t}
              <br />
            </Fragment>
          );
        });
        setTextElement(<Text>{content_with_br}</Text>);
      } catch (_err) {
        setTextElement(<></>);
      }
    };
    getTextFileContentFromUrl(artwork.file.url);
  }, [artwork?.type]);

  if (error || artwork === null || _error || artworks === null) return <ErrorPage statusCode={404} />;
  if (isLoading || artwork === undefined || _isLoading || artworks === undefined) return <LoadingPanel />;

  return (
    <Container maxW='container.lg' p={5}>
      <Flex justify='center' direction={{ base: "column", md: "row" }} gap={10} marginBottom={5}>
        <VStack>
          <Box minW={{ base: "80vw", md: "30vw" }} maxW={{ base: "80vw", md: "40vw" }}>
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
            <Avatar size='sm' src={artwork.author.icon} name={artwork.author.name} />
            <Text>{artwork.author.name}</Text>
          </Flex>
          <HStack>{tag_elements}</HStack>
          <Button onClick={jumpToUploadPageWithParentId}>参考アップロード</Button>
          {artwork.parents.length > 0 ? (
            <Box>
              <Heading as='h4' size='md' mb={3}>
                親作品
              </Heading>
              <ImageSlider col={2} col_sm={1} images={image_slider_items} />
            </Box>
          ) : null}
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
                        <Avatar size='sm' name={user.name} borderColor='gray.800' src={user.icon} />
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
      <Box mt={10} />
      <GridArtworks artworks={artworks} />
    </Container>
  );
};

export default ArtworkDetailPage;
