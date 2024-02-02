import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Spinner,
  Switch,
  Textarea,
  useColorModeValue,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useMemo, useState } from "react";

import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import HoverTag from "@/components/HoverTag";
import ImageFileInput from "@/components/ImageFileInput";
import CommunityInteractor from "@/interactors/Communities/CommunityInteractor";
import { CommunityFormData } from "@/interactors/Communities/CommunityTypes";
import { theme } from "@/pages/_app";

type FormData = Omit<CommunityFormData, "banner" | "icon" | "owner" | "tags">;

const CommunityCreatePage = () => {
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const { user } = useContext(FirebaseAuthContext);
  const router = useRouter();
  const toast = useToast();

  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [banner, setBanner] = useState<File | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    isPublic: true,
  });
  const [error, setError] = useState<Record<keyof FormData, boolean>>({
    name: false,
    description: false,
    isPublic: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value,
    });
  };

  const create = async () => {
    setLoading(true);
    setError({
      name: false,
      description: false,
      isPublic: false,
    });
    if (!formData.name.replaceAll(/\s/g, "")) {
      setError({
        ...error,
        name: true,
      });
      return;
    }

    if (!user) {
      toast({
        title: "ログインしてください",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const data: CommunityFormData = {
      ...formData,
      tags: tags,
      banner: banner || undefined,
      icon: icon || undefined,
      owner: user.id,
    };
    const result = await new CommunityInteractor().set(data);
    if (result) {
      toast({
        title: "コミュニティーを作成しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push(`/communities/${result.id}`);
    } else {
      toast({
        title: "作成に失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const tag_elements = useMemo(() => {
    return tags.map<JSX.Element>((tag: string, index: number) => (
      <HoverTag
        key={index}
        onClick={() =>
          setTags(
            tags.filter((tAryData) => {
              return tAryData != tag;
            })
          )
        }
      >
        {tag}
      </HoverTag>
    ));
  }, [tags]);

  let tagErrorMessage: string = "お兄ちゃん、エラーだよ!";
  let tagIsError: boolean = false;
  if (tagInput.match(/([&$\+,:;=\?@#\s<>\[\]\{\}[\/]|\\\^%])+/) !== null) {
    tagErrorMessage = "使用できない記号が含まれています";
    tagIsError = true;
  } else if (tags.includes(tagInput)) {
    tagErrorMessage = "すでに追加されています";
    tagIsError = true;
  }

  return (
    <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }} p={5}>
      <Box bg={secondary} rounded='lg' p={5}>
        <Heading as='h1' my={10}>
          コミュニティー作成
        </Heading>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={5}>
          <GridItem>
            <Flex direction='column' gap={5}>
              <ImageFileInput label='バナー画像' aspect={2 / 1} dispatch={setBanner} />
              <ImageFileInput label='アイコン画像' dispatch={setIcon} />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex direction='column' gap={5}>
              <FormControl isInvalid={error.name}>
                <FormLabel>コミュニティー名</FormLabel>
                <Input name='name' onChange={handleChangeInput} value={formData.name} type='text' />
              </FormControl>
              <FormControl>
                <FormLabel>概要</FormLabel>
                <Textarea name='description' onChange={handleChangeInput} value={formData.description} />
              </FormControl>
              <FormControl isInvalid={tagIsError}>
                <FormLabel>タグ</FormLabel>
                <Flex gap={5}>
                  <Input
                    type='text'
                    value={tagInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setTagInput(e.target.value);
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (tagInput === "") return;
                      if (tags.length >= 10) return;

                      if (tagInput.match(/([&$\+,:;=\?@#\s<>\[\]\{\}[\/]|\\\^%])+/) !== null) {
                        //使用できない記号が入っている
                        return;
                      }

                      if (tags.includes(tagInput)) {
                        //既に追加されている
                        return;
                      }
                      setTagInput("");
                      setTags([...tags, tagInput]);
                    }}
                  >
                    追加
                  </Button>
                </Flex>
                <FormErrorMessage>{tagErrorMessage}</FormErrorMessage>
                <Flex mt={3} wrap='wrap' gap={3}>
                  {tag_elements}
                </Flex>
                <Text mt={2} textAlign='right' color={tags.length >= 10 ? "red.500" : ""}>
                  {tags.length}/10
                </Text>
              </FormControl>
              <FormControl display='flex' alignItems='center'>
                <FormLabel mb={0}>一般公開</FormLabel>
                <Switch size='md' name='isPublic' onChange={handleChangeInput} isChecked={formData.isPublic} />
              </FormControl>
              <Button isDisabled={loading} onClick={create}>
                {loading && <Spinner mr={3} />}
                作成する
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default CommunityCreatePage;
