import { DeleteIcon, EditIcon, EmailIcon } from "@chakra-ui/icons";
import { Button, IconButton, Spacer } from "@chakra-ui/react";
import { HStack, VStack, Text, Grid, Input } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useMemo, useState } from "react";

import GridImage from "@/components/GridImage";
import { ImageListData } from "@/types/index";

const buttonsize = 100;
const buttonfontsize = 40;

interface IdeaBoxTextProps {
  value: string;
  onChange: (value: string) => void;
}

const Ideabox = (props: IdeaBoxTextProps) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [images, setImages] = useState<ImageListData[]>([
    { id: "IMG_0649.png", name: "hoge", url: "/IMG_0649.png" },
    { id: "AA.jpg", name: "hoge", url: "/AA.jpg" },
    { id: "AA2.jpg", name: "hoge", url: "/AA2.jpg" },
    { id: "R.jpg", name: "hoge", url: "/R.jpg" },
    { id: "SP.png", name: "hoge", url: "/SP.png" },
    { id: "IK.jpg", name: "hoge", url: "/IK.jpg" },
    { id: "OIP.jpg", name: "hoge", url: "/OIP.jpg" },
    { id: "BU.jpg", name: "hoge", url: "/BU.jpg" },
    { id: "MA.jpg", name: "hoge", url: "/MA.jpg" },
  ]);

  const image_grid_items = useMemo<JSX.Element[]>(
    () =>
      images.map<JSX.Element>(
        (image: ImageListData, index: number): JSX.Element => <GridImage key={index} image={image} />
      ),
    [images]
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ideaBoxName, setIdeaBoxName] = React.useState("template");
  const [inputTitleText, setInputTitleText] = React.useState("");
  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const regex = /^[\w\_\'\`\~\+\-]+$/;

  return (
    <>
      <VStack>
        <Text fontSize='6xl'> {ideaBoxName}</Text>

        <HStack py={10}>
          <VStack>
            <IconButton
              aria-label='アイデアの削除'
              w={buttonsize}
              h={buttonsize}
              fontSize={buttonfontsize}
              variant='outline'
              icon={<DeleteIcon />}
            ></IconButton>
            <Text>アイデアの削除</Text>
          </VStack>
          <VStack>
            <IconButton
              aria-label='関連アイデア'
              w={buttonsize}
              h={buttonsize}
              fontSize={buttonfontsize}
              variant='outline'
              icon={<EmailIcon />}
            ></IconButton>
            <Text>関連アイデア</Text>
          </VStack>
          <VStack>
            <IconButton
              aria-label='名前変更'
              w={buttonsize}
              onClick={(event) => {
                onOpen();
                setInputTitleText(ideaBoxName);
              }}
              h={buttonsize}
              fontSize={buttonfontsize}
              variant='outline'
              icon={<EditIcon />}
            ></IconButton>
            <Text>名前変更</Text>
          </VStack>
        </HStack>
        <Spacer />
        <Text>アイデア数: [アイデア数] 件</Text>
      </VStack>
      <Grid p={4} templateColumns='repeat(4, 1fr)' gap={4}>
        {image_grid_items}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タイトル変更</ModalHeader>
          <ModalBody>
            <Input
              type='text'
              value={inputTitleText}
              onChange={(event) => {
                setInputTitleText(event.target.value);
                if (event.target.value == "" || event.target.value.length > 10) setErrorMessageFlag(true);
                else {
                  setErrorMessageFlag(false);
                }
              }}
            />
            {!regex.test(inputTitleText) && <Text> 特殊文字は&apos;_~+-`以外使用しないでください</Text>}
            {errorMessageFlag && <Text>タイトルは1文字以上10文字以下にしてください。</Text>}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={(event) => {
                if (!errorMessageFlag && regex.test(inputTitleText)) {
                  setIdeaBoxName(inputTitleText);
                  onClose();
                }
              }}
            >
              適用
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Ideabox;
