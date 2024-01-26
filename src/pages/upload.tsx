import {
  Image,
  Container,
  useToast,
  Box,
  useColorModeValue,
  Heading,
  FormLabel,
  FormControl,
  Input,
  Text,
  VStack,
  Grid,
  GridItem,
  Textarea,
  Button,
  Flex,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, ChangeEvent, useContext, useMemo, useEffect, ReactNode, Fragment } from "react";

import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import HoverTag from "@/components/HoverTag";
import ParentWorksInput from "@/components/ParentWorksInput";
import UploadIcon from "@/icons/UploadIcon";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkType, ArtworkData } from "@/interactors/Artwork/ArtworkTypes";
import { theme } from "@/pages/_app";

const ImageUploadForm = () => {
  const { user } = useContext(FirebaseAuthContext);
  const router = useRouter();
  const { parent } = router.query;

  const [fileContentElement, setFileContentElement] = useState<ReactNode>(<></>);
  const [uploading, setUploading] = useState<boolean>(false);

  const [inputFile, setInputFile] = useState<Blob | null>(null);
  const [inputFileType, setInputFileType] = useState<ArtworkType | null>(null);
  const [inputWorkName, setInputWorkName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [parentArtworks, setParentArtworks] = useState<Array<ArtworkData>>([]);
  const [artworkTagInput, setArtworkTagInput] = useState<string>("");
  const [artworkTags, setArtworkTags] = useState<Array<string>>([]);

  const toast = useToast();
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const icon_fill_color = useColorModeValue("gray.800", "white");

  useEffect(() => {
    if (inputFile === null || inputFileType === null) return;

    const reader = new FileReader();
    switch (inputFileType) {
      case "image": {
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result && typeof e.target.result === "string") {
            setFileContentElement(<Image src={e.target.result} alt='アップロードした画像' />);
          }
        };
        reader.readAsDataURL(inputFile);
        break;
      }
      case "text": {
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result && typeof e.target.result === "string") {
            const text_with_br = e.target.result.split("\n").map((t: string, i: number) => {
              return (
                <Fragment key={i}>
                  {t}
                  <br />
                </Fragment>
              );
            });

            setFileContentElement(
              <Text overflowY='scroll' w='full' h='full'>
                {text_with_br}
              </Text>
            );
          }
        };
        reader.readAsText(inputFile);
        break;
      }
      case "audio": {
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result && typeof e.target.result === "string") {
            setFileContentElement(<audio controls src={e.target.result}></audio>);
          }
        };
        reader.readAsDataURL(inputFile);
        break;
      }
      case "video": {
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result && typeof e.target.result === "string") {
            setFileContentElement(<video controls src={e.target.result}></video>);
          }
        };
        reader.readAsDataURL(inputFile);
        break;
      }
      default: {
        setFileContentElement(<></>);
      }
    }
  }, [inputFile, inputFileType]);

  const tag_elements = useMemo(() => {
    return artworkTags.map<JSX.Element>((aTag: string, index: number) => (
      <HoverTag
        key={index}
        onClick={() =>
          setArtworkTags(
            artworkTags.filter((aAryData) => {
              return aAryData != aTag;
            })
          )
        }
      >
        {aTag}
      </HoverTag>
    ));
  }, [artworkTags]);

  const uploadArtwork = async () => {
    if (!user) {
      toast({
        title: "ログインしてください",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setUploading(true);
    if (!inputFile || !inputFileType) {
      toast({
        title: "コンテンツをアップロードしてください",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (inputWorkName == "") {
      toast({
        title: "作品名をつけてください",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const result = await new ArtworkInteractor().upload({
      type: inputFileType,
      name: inputWorkName,
      description: description,
      file: inputFile,

      author_id: user.id,
      tags: artworkTags,
      comment_ids: [],
      parent_ids: parentArtworks.map((aArtwork) => aArtwork.id),
    });
    if (result) {
      toast({
        title: "アップロードに成功しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      //初期値を代入
      setInputFile(null);
      setInputFileType(null);
      setInputWorkName("");
      setDescription("");
      setArtworkTags([]);
      setParentArtworks([]);
      setArtworkTagInput("");
    } else {
      toast({
        title: "アップロードに失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setUploading(false);
  };

  let tagErrorMessage: string = "お兄ちゃん、エラーだよ!";
  let tagIsError: boolean = false;
  if (artworkTagInput.match(/([&$\+,:;=\?@#\s<>\[\]\{\}[\/]|\\\^%])+/) !== null) {
    tagErrorMessage = "使用できない記号が含まれています";
    tagIsError = true;
  } else if (artworkTags.includes(artworkTagInput)) {
    tagErrorMessage = "すでに追加されています";
    tagIsError = true;
  }

  return (
    <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }} p={5}>
      <Box bg={secondary} rounded='lg' p={5}>
        <Heading as='h1' my={10}>
          アップロード
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "50% 1fr" }} gap={10}>
          <GridItem>
            <label
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                backgroundColor: "#a1a5ad",
                borderRadius: ".75rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: ".75rem",
              }}
            >
              {inputFile !== null ? (
                <Flex
                  backgroundColor='#a1a5ad'
                  borderRadius='.75rem'
                  position='absolute'
                  w='full'
                  h='full'
                  inset={0}
                  padding={3}
                  justifyContent='center'
                  alignItems='center'
                >
                  {fileContentElement}
                </Flex>
              ) : null}
              <UploadIcon strokeWidth={1.5} boxSize={12} color={icon_fill_color} />
              <Text>コンテンツをアップロードする</Text>
              <input
                id='file'
                type='file'
                hidden
                onChange={(e) => {
                  if (!e.target.files || !e.target.files[0]) {
                    return;
                  }
                  const inputFile = e.target.files[0];
                  const fileType = inputFile.type.split("/")[0];
                  if (!["image", "text", "audio", "video"].includes(fileType)) {
                    toast({
                      title: "対応していないファイルです",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                    return;
                  } else {
                    setInputFile(inputFile);
                    setInputFileType(fileType as ArtworkType);
                  }
                }}
              />
            </label>
          </GridItem>
          <GridItem>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>作品名</FormLabel>
                <Input
                  id='name'
                  type='text'
                  value={inputWorkName}
                  onChange={(e) => {
                    setInputWorkName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>概要</FormLabel>
                <Textarea
                  id='description'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isInvalid={tagIsError}>
                <FormLabel>タグ</FormLabel>
                <Flex gap={5}>
                  <Input
                    type='text'
                    value={artworkTagInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setArtworkTagInput(e.target.value);
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (artworkTagInput === "") return;
                      if (artworkTags.length >= 10) return;

                      if (artworkTagInput.match(/([&$\+,:;=\?@#\s<>\[\]\{\}[\/]|\\\^%])+/) !== null) {
                        //使用できない記号が入っている
                        return;
                      }

                      if (artworkTags.includes(artworkTagInput)) {
                        //既に追加されている
                        return;
                      }
                      setArtworkTagInput("");
                      setArtworkTags([...artworkTags, artworkTagInput]);
                    }}
                  >
                    追加
                  </Button>
                </Flex>
                <FormErrorMessage>{tagErrorMessage}</FormErrorMessage>
                <Flex mt={3} wrap='wrap' gap={3}>
                  {tag_elements}
                </Flex>
                <Text mt={2} textAlign='right' color={artworkTags.length >= 10 ? "red.500" : ""}>
                  {artworkTags.length}/10
                </Text>
              </FormControl>
              <ParentWorksInput selectedParentWorks={parentArtworks} setSelectedParentWorks={setParentArtworks} />

              <Button w='full' onClick={uploadArtwork}>
                アップロード
                {uploading && <Spinner ml={3} />}
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default ImageUploadForm;
