import { Button, Flex, Box, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { theme } from "./_app";
import { Console } from "console";
import { uploadFileAndGetImgID, getImgURL, deleteImg } from "../firebase_util/UnauthFirebaseUtil";

let pushedImgID = "";
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
  const addData = () => {};
  const uploadFileAndGetImgID_check = async () => {
    if (file) {
      pushedImgID = await uploadFileAndGetImgID(file, "abebebeb");
    }
  };
  const getImgURL_check = async () => {
    const gotURL = await getImgURL("4hBUHI9GUuD7R4cuW7lJ");
    console.log(gotURL);
  };
  const deleteImg_check = () => {
    deleteImg(pushedImgID);
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
        <img id='myimg' src='' alt='代替テキスト'></img>
      </Box>
      <Button>hoge</Button>
      <Button onClick={addData}>addData</Button>
      <Button onClick={getImgURL_check}>getImgURL</Button>
      <input name='file' type='file' accept='image/*' onChange={onChangeFile} />
      <Button onClick={uploadFileAndGetImgID_check}>送信</Button>
      <Button onClick={deleteImg_check}>削除</Button>
    </Box>
  );
};

export default FirebaseUtilTestPage;
