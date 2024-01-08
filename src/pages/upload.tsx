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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, ChangeEvent, useContext, useMemo, useEffect, ReactNode, Fragment } from "react";

import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import HoverTag from "@/components/HoverTag";
import ParentWorksInput from "@/components/ParentWorksInput";
import UploadIcon from "@/icons/UploadIcon";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkFormData, ArtworkType, INITIAL_ARTWORK_FORM_DATA } from "@/interactors/Artwork/ArtworkTypes";
import { theme } from "@/pages/_app";

interface TagInputData {
  text: string;
  is_error: boolean;
  error_msg: string;
}

interface ParentInputData {
  parent_id: string;
  is_error: boolean;
  error_msg: string;
  parents: string[];
}

const INITIAL_TAG_INPUT_DATA: TagInputData = {
  text: "",
  is_error: false,
  error_msg: "error!",
};

const INITIAL_PARENT_INPUT_DATA: ParentInputData = {
  parent_id: "",
  is_error: false,
  error_msg: "error!",
  parents: [],
};

const ImageUploadForm = () => {
  const { user } = useContext(FirebaseAuthContext);
  const router = useRouter();
  const { parent } = router.query;

  const [artworkFormData, setArtWorkFormData] = useState<ArtworkFormData>(INITIAL_ARTWORK_FORM_DATA);
  const [tagInputData, setTagInputData] = useState<TagInputData>(INITIAL_TAG_INPUT_DATA);
  const [parentInputData, setParentInputData] = useState<ParentInputData>(INITIAL_PARENT_INPUT_DATA);
  const [parentIDs, setParentIDs] = useState<Array<string>>([]);
  const [fileContentElement, setFileContentElement] = useState<ReactNode>(<></>);

  const toast = useToast();
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const icon_fill_color = useColorModeValue("gray.800", "white");

  useEffect(() => {
    const parent_id: string = parent as string;
    if (!parent_id) return;
    if (parent_id === "") return;
    if (artworkFormData.parent_ids.includes(parent_id)) return;

    const checkAndPushParent = async () => {
      const parent_data = await new ArtworkInteractor().get(parent_id);
      if (parent_data === null) {
        setParentInputData({
          ...parentInputData,
          parent_id: parent_id,
          is_error: true,
          error_msg: "この作品は存在しません",
        });
        return;
      }

      setArtWorkFormData({
        ...artworkFormData,
        parent_ids: artworkFormData.parent_ids.concat(parent_id),
      });
      setParentInputData({
        ...parentInputData,
        parents: parentInputData.parents.concat(parent_data.name),
        is_error: false,
        parent_id: "",
      });
    };
    checkAndPushParent();
  }, [parent]);

  useEffect(() => {
    if (artworkFormData.file === null) return;

    const reader = new FileReader();
    switch (artworkFormData.type) {
      case "image": {
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result && typeof e.target.result === "string") {
            setFileContentElement(<Image src={e.target.result} alt='アップロードした画像' />);
          }
        };
        reader.readAsDataURL(artworkFormData.file);
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
        reader.readAsText(artworkFormData.file);
        break;
      }
      case "audio": {
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result && typeof e.target.result === "string") {
            setFileContentElement(<audio controls src={e.target.result}></audio>);
          }
        };
        reader.readAsDataURL(artworkFormData.file);
        break;
      }
      case "video": {
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result && typeof e.target.result === "string") {
            setFileContentElement(<video controls src={e.target.result}></video>);
          }
        };
        reader.readAsDataURL(artworkFormData.file);
        break;
      }
      default: {
        setFileContentElement(<></>);
      }
    }
  }, [artworkFormData.file]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.target.type === "file") {
      if (!("files" in e.target) || !e.target.files || e.target.files[0] === undefined) return;

      const new_file = e.target.files[0];
      const file_type = new_file.type.split("/")[0];
      if (!["image", "text", "audio", "video"].includes(file_type)) {
        toast({
          title: "対応していないファイルです",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      const artwork_type: ArtworkType = file_type as ArtworkType;

      setArtWorkFormData({
        ...artworkFormData,
        type: artwork_type,
        file: new_file,
      });
    } else {
      setArtWorkFormData({
        ...artworkFormData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleUpload = async () => {
    if (!user) {
      toast({
        title: "ログインしてください",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const result = await new ArtworkInteractor().upload({
      ...artworkFormData,
      author_id: user?.id,
    });
    if (result) {
      toast({
        title: "アップロードに成功しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setArtWorkFormData(INITIAL_ARTWORK_FORM_DATA);
      setTagInputData(INITIAL_TAG_INPUT_DATA);
      setParentInputData(INITIAL_PARENT_INPUT_DATA);
    } else {
      toast({
        title: "アップロードに失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const addTag = () => {
    setTagInputData({
      ...tagInputData,
      is_error: false,
    });
    if (tagInputData.text === "") return;
    if (artworkFormData.tags.length >= 10) return;

    if (tagInputData.text.match(/([&$\+,:;=\?@#\s<>\[\]\{\}[\/]|\\\^%])+/) !== null) {
      setTagInputData({
        ...tagInputData,
        is_error: true,
        error_msg: "使用できない記号が含まれています",
      });
      return;
    }

    if (artworkFormData.tags.includes(tagInputData.text)) {
      setTagInputData({
        ...tagInputData,
        is_error: true,
        error_msg: "すでに追加されています",
      });
      return;
    }

    setArtWorkFormData({
      ...artworkFormData,
      tags: artworkFormData.tags.concat(tagInputData.text),
    });
    setTagInputData({
      ...tagInputData,
      is_error: false,
      text: "",
    });
  };

  const removeTag = (index: number) => {
    const new_tags = [...artworkFormData.tags];
    new_tags.splice(index, 1);
    setArtWorkFormData({
      ...artworkFormData,
      tags: new_tags,
    });
  };

  const tag_elements = useMemo(() => {
    return artworkFormData.tags.map<JSX.Element>((tag: string, index: number) => (
      <HoverTag key={index} onClick={() => removeTag(index)}>
        {tag}
      </HoverTag>
    ));
  }, [artworkFormData.tags]);

  const addParent = async () => {
    setParentInputData({
      ...parentInputData,
      is_error: false,
    });
    if (parentInputData.parent_id === "") return;
    if (artworkFormData.parent_ids.includes(parentInputData.parent_id)) return;

    const parent_data = await new ArtworkInteractor().get(parentInputData.parent_id);
    if (parent_data === null) {
      setParentInputData({
        ...parentInputData,
        is_error: true,
        error_msg: "この作品は存在しません",
      });
      return;
    }

    setArtWorkFormData({
      ...artworkFormData,
      parent_ids: artworkFormData.parent_ids.concat(parentInputData.parent_id),
    });
    setParentInputData({
      ...parentInputData,
      parents: parentInputData.parents.concat(parent_data.name),
      is_error: false,
      parent_id: "",
    });
  };

  const removeParent = (index: number) => {
    const new_parents = [...parentInputData.parents];
    const new_parent_ids = [...artworkFormData.parent_ids];
    new_parents.splice(index, 1);
    new_parent_ids.splice(index, 1);
    setParentInputData({
      ...parentInputData,
      parents: new_parents,
    });
    setArtWorkFormData({
      ...artworkFormData,
      parent_ids: new_parent_ids,
    });
  };

  const parent_tag_elements = useMemo(() => {
    return parentInputData.parents.map<JSX.Element>((name: string, index: number) => (
      <HoverTag key={index} onClick={() => removeParent(index)}>
        {name}
      </HoverTag>
    ));
  }, [parentInputData.parents]);

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
              {artworkFormData.file !== null ? (
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
              <input id='file' onChange={handleInputChange} type='file' hidden />
            </label>
          </GridItem>
          <GridItem>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>作品名</FormLabel>
                <Input id='name' onChange={handleInputChange} value={artworkFormData.name} type='text' />
              </FormControl>
              <FormControl>
                <FormLabel>概要</FormLabel>
                <Textarea id='description' value={artworkFormData.description} onChange={handleInputChange} />
              </FormControl>
              <FormControl isInvalid={tagInputData.is_error}>
                <FormLabel>タグ</FormLabel>
                <Flex gap={5}>
                  <Input
                    value={tagInputData.text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTagInputData({
                        ...tagInputData,
                        text: e.target.value,
                      })
                    }
                    type='text'
                  />
                  <Button onClick={addTag}>追加</Button>
                </Flex>
                <FormErrorMessage>{tagInputData.error_msg}</FormErrorMessage>
                <Flex mt={3} wrap='wrap' gap={3}>
                  {tag_elements}
                </Flex>
                <Text mt={2} textAlign='right' color={artworkFormData.tags.length >= 10 ? "red.500" : ""}>
                  {artworkFormData.tags.length}/10
                </Text>
              </FormControl>
              <ParentWorksInput selectedParentsID={parentIDs} setSelectedParentsID={setParentIDs} />
              <Button w='full' onClick={handleUpload}>
                アップロード
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default ImageUploadForm;
