import { Button, Image, Box, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

import { theme } from "./_app";
import { uploadFileAndGetWorksID, getWorksURL, deleteImg, getAllWorksID } from "../firebase_util/UnauthFirebaseUtil";

const FirebaseUtilTestPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [count, setCount] = useState<number>(0);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const [file, setFile] = useState<File | null>(null);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const getAllWorksID_check = async () => {
    const temp = await getAllWorksID();
    temp.map((id) => console.log(id));
  };

  const uploadFileAndGetImgID_check = async () => {
    if (file) {
      await uploadFileAndGetWorksID(file, "abebebeb");
    }
  };
  const getImgURL_check = async () => {
    const IDList = await getAllWorksID();
    const gotURL = await getWorksURL(IDList[0]);
    console.log(gotURL);
  };
  const deleteImg_check = async () => {
    const IDList = await getAllWorksID();
    deleteImg(IDList[0]);
  };

  return (
    <Box>
      <Box>
        <p>Current color mode: {colorMode}</p>
        <Button onClick={toggleColorMode}>Change color mode</Button>
      </Box>
      <Text color={secondary}>hoge</Text>
      <Box bg={secondary} w='100px' h='100px'></Box>
      <Box bg={secondary} w='100px' h='100px'>
        <Image id='myimg' src='' alt='代替テキスト' />
      </Box>
      <Button onClick={getAllWorksID_check}>getAllWorksID_check</Button>
      <Button onClick={getImgURL_check}>getImgURL_check</Button>
      <input name='file' type='file' accept='image/*' onChange={onChangeFile} />
      <Button onClick={uploadFileAndGetImgID_check}>送信</Button>
      <Button onClick={deleteImg_check}>deleteImg_check</Button>
    </Box>
  );
};

export default FirebaseUtilTestPage;
