import { ArrowUpIcon, StarIcon } from "@chakra-ui/icons";
import { AbsoluteCenter, Text, Flex, Spacer, Input, VStack, HStack, Box, Button, useToast } from "@chakra-ui/react";
import { useState, ChangeEvent, useContext } from "react";

import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkFormData, INITIAL_ARTWORK_FORM_DATA } from "@/types/api/artwork";

const ImageUploadForm = () => {
  const { user } = useContext(FirebaseAuthContext);
  const [artworkFormData, setArtWorkFormData] = useState<ArtworkFormData>(INITIAL_ARTWORK_FORM_DATA);
  const toast = useToast();

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

  return (
    <Box position='relative' h='1200px'>
      <AbsoluteCenter bg='black' p='4' w='1000' h='1100' color='white' axis='both' borderRadius='lg'>
        <Flex color='white'>
          <Flex w='400px' h='1000' bg='black' direction='column' alignItems='center'>
            <Flex w='380' h='500' bg='gray' direction='column' alignItems='center' borderRadius='lg'>
              <Spacer />
              <ArrowUpIcon />
              <h2>画像をアップロードする</h2>
              <Spacer />
              <input id='file' type='file' accept='image/*' onChange={handleInputChange} />
              {/* {selectedImage && <Image src={selectedImage} alt='選択された画像のプレビュー' />} */}
              <Spacer />
            </Flex>
          </Flex>
          <Spacer />
          <VStack spacing='50px' w='400px' bg='black'>
            <HStack spacing='100px'>
              <Box w='70px' h='10' bg='black' />
              <Spacer />
              <Box>
                {/* <Button>アップロード</Button> */}
                <Button onClick={handleUpload}>アップロード</Button>
              </Box>
            </HStack>
            <Input id='name' onChange={handleInputChange} size='lg' placeholder='タイトルを入力してください' />
            <Flex>
              <StarIcon boxSize={6} />
              <Text fontSize='xl'> ユーザー名</Text>
            </Flex>

            <Input placeholder='＃タグ' size='md' />
            <Text fontSize='l'> 参考コンテンツ</Text>
            <Input placeholder='作品ID' size='md' />
          </VStack>

          <Flex></Flex>
        </Flex>
      </AbsoluteCenter>
    </Box>
  );
};

export default ImageUploadForm;
