import {
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
import { useState, ChangeEvent, useContext, useMemo } from "react";

import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import HoverTag from "@/components/HoverTag";
import UploadIcon from "@/icons/UploadIcon";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { theme } from "@/pages/_app";
import { ArtworkFormData, INITIAL_ARTWORK_FORM_DATA } from "@/types/api/artwork";

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

const ImageUploadForm = () => {
  const { user } = useContext(FirebaseAuthContext);
  const [artworkFormData, setArtWorkFormData] = useState<ArtworkFormData>(INITIAL_ARTWORK_FORM_DATA);
  const [tagInputData, setTagInputData] = useState<TagInputData>({
    text: "",
    is_error: false,
    error_msg: "error!",
  });
  const [parentInputData, setParentInputData] = useState<ParentInputData>({
    parent_id: "",
    is_error: false,
    error_msg: "error!",
    parents: [],
  });

  const toast = useToast();
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const icon_fill_color = useColorModeValue("gray.800", "white");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.type === "file") {
      if (!e.target.files) return;
      setArtWorkFormData({
        ...artworkFormData,
        [e.target.id]: e.target.files[0],
      });
    } else {
      setArtWorkFormData({
        ...artworkFormData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files[0];
    // setSelectedImage(URL.createObjectURL(file));
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
    console.log(
      await new ArtworkInteractor().upload({
        ...artworkFormData,
        author_id: user?.uid,
      })
    );
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
    console.log(parent_data);
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
                backgroundColor: "#a1a5ad",
                borderRadius: ".75rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: ".75rem",
              }}
            >
              <UploadIcon strokeWidth={1.5} boxSize={12} color={icon_fill_color} />
              <Text>コンテンツをアップロードする</Text>
              <input id='file' type='file' hidden />
            </label>
          </GridItem>
          <GridItem>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>作品名</FormLabel>
                <Input type='text' />
              </FormControl>
              <FormControl>
                <FormLabel>概要</FormLabel>
                <Textarea />
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
              <FormControl isInvalid={parentInputData.is_error}>
                <FormLabel>親作品</FormLabel>
                <Flex gap={5}>
                  <Input
                    value={parentInputData.parent_id}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setParentInputData({
                        ...parentInputData,
                        parent_id: e.target.value,
                      })
                    }
                    type='text'
                  />
                  <Button onClick={addParent}>追加</Button>
                </Flex>
                <FormErrorMessage>{parentInputData.error_msg}</FormErrorMessage>
                <Flex mt={3} wrap='wrap' gap={3}>
                  {parent_tag_elements}
                </Flex>
                <Text mt={2} textAlign='right' color={parentInputData.parents.length >= 10 ? "red.500" : ""}>
                  {parentInputData.parents.length}/10
                </Text>
              </FormControl>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );

  // return (
  //   <Box position='relative' h='1200px'>
  //     <AbsoluteCenter bg='black' p='4' w='1000' h='1100' color='white' axis='both' borderRadius='lg'>
  //       <Flex color='white'>
  //         <Flex w='400px' h='1000' bg='black' direction='column' alignItems='center'>
  //           <Flex w='380' h='500' bg='gray' direction='column' alignItems='center' borderRadius='lg'>
  //             <Spacer />
  //             <ArrowUpIcon />
  //             <h2>画像をアップロードする</h2>
  //             <Spacer />
  //             <input id='file' type='file' accept='image/*' onChange={handleInputChange} />
  //             {/* {selectedImage && <Image src={selectedImage} alt='選択された画像のプレビュー' />} */}
  //             <Spacer />
  //           </Flex>
  //         </Flex>
  //         <Spacer />
  //         <VStack spacing='50px' w='400px' bg='black'>
  //           <HStack spacing='100px'>
  //             <Box w='70px' h='10' bg='black' />
  //             <Spacer />
  //             <Box>
  //               {/* <Button>アップロード</Button> */}
  //               <Button onClick={handleUpload}>アップロード</Button>
  //             </Box>
  //           </HStack>
  //           <Input id='name' onChange={handleInputChange} size='lg' placeholder='タイトルを入力してください' />
  //           <Flex>
  //             <StarIcon boxSize={6} />
  //             <Text fontSize='xl'> ユーザー名</Text>
  //           </Flex>

  //           <Input placeholder='＃タグ' size='md' />
  //           <Text fontSize='l'> 参考コンテンツ</Text>
  //           <Input placeholder='作品ID' size='md' />
  //         </VStack>

  //         <Flex></Flex>
  //       </Flex>
  //     </AbsoluteCenter>
  //   </Box>
  // );
};

export default ImageUploadForm;
