import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { AbsoluteCenter, Center, Text, Square, Circle, Flex, Spacer, Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    // ここで画像をサーバーに送信する処理を実装します
    console.log("画像をアップロードしました:", selectedImage);
  };

  return (
    <Box position='relative' h='1200px'>
      <AbsoluteCenter bg='tomato' p='4' w='1000' h='1100' color='white' axis='both'>
        <Flex color='gray'>
          <Flex w='400px' h='1000' bg='green.500' direction='column' alignItems='center'>
            <Flex w='380' h='500' bg='tomato' direction='column' alignItems='center'>
              <Spacer />
              <ArrowUpIcon />
              <h2>画像をアップロードする</h2>
              <Spacer />
              <input type='file' accept='image/*' onChange={handleImageChange} />
              {selectedImage && <img src={selectedImage} alt='選択された画像のプレビュー' />}
              <Spacer />
            </Flex>
          </Flex>
          <Spacer />
          <Flex w='400px' bg='blue.500'>
            <Button colorScheme='blue'>アップロード</Button>
            {/* <button onClick={handleUpload}>アップロード</button> */}
            <Box></Box>

            <Box as='button' borderRadius='md' color='black' px={4} h={8}>
              Button
            </Box>
          </Flex>
        </Flex>
      </AbsoluteCenter>
    </Box>
  );
};

export default ImageUploadForm;
