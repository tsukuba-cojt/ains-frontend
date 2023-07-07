import { ArrowUpIcon, StarIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { AbsoluteCenter, Text, Flex, Spacer, Button, Input, VStack, HStack, Image } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files[0];
    // setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    // ここで画像をサーバーに送信する処理を実装します
    console.log("画像をアップロードしました:", selectedImage);
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
              <input type='file' accept='image/*' onChange={handleImageChange} />
              {selectedImage && <Image src={selectedImage} alt='選択された画像のプレビュー' />}
              <Spacer />
            </Flex>
          </Flex>
          <Spacer />
          <VStack spacing='50px' w='400px' bg='black'>
            <HStack spacing='100px'>
              <Box w='70px' h='10' bg='black' />
              <Spacer />
              <Box>
                <Button>アップロード</Button>
                {/* <button onClick={handleUpload}>アップロード</button> */}
              </Box>
            </HStack>
            <Input size='lg' placeholder='タイトルを入力してください' />
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
