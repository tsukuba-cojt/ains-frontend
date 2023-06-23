import { IconButton, CloseButton, Button, Flex, Stack, Image, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import { DeleteIcon, ViewOffIcon, ViewIcon, ChatIcon, EmailIcon, SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Box, HStack, VStack, Container, Text, Grid, GridItem, AspectRatio } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

const buttonsize = 100;
const Ideabox = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <VStack>
      <Text fontSize='6xl'>題名</Text>

      <HStack h='400px'>
        <VStack>
          <IconButton w={buttonsize} h={buttonsize} fontSize='40px' variant='outline' icon={<EmailIcon />}></IconButton>
        </VStack>
        <VStack h='400px'>
          <IconButton
            w={buttonsize}
            h={buttonsize}
            fontSize='40px'
            variant='outline'
            icon={<DeleteIcon />}
          ></IconButton>
          <Text>アイデアの削除</Text>
        </VStack>
      </HStack>

      <Spacer />
      <Text>アイデア数: [アイデア数] 件</Text>

      <HStack>
        <Grid templateColumns='repeat(4, 1fr)' gap={4}>
          <GridItem bg='blue.500'>
            <AspectRatio maxW='100%' ratio={1}>
              <Image boxSize='100%' src='/IMG_0649.png' alt='代替テキスト' />
            </AspectRatio>
          </GridItem>
          <GridItem bg='blue.500'>
            <AspectRatio maxW='100%' ratio={1}>
              <Image boxSize='100%' src='/AA.jpg' alt='代替テキスト' />
            </AspectRatio>
          </GridItem>
          <GridItem bg='blue.500'>
            <AspectRatio maxW='100%' ratio={1}>
              <Image boxSize='100%' src='/AA2.jpg' alt='代替テキスト' />
            </AspectRatio>
          </GridItem>
          <GridItem bg='blue.500'>
            <AspectRatio maxW='100%' ratio={1}>
              <Image boxSize='100%' src='/R.jpg' alt='代替テキスト' />
            </AspectRatio>
          </GridItem>
          <GridItem bg='blue.500'>
            <AspectRatio maxW='100%' ratio={1}>
              <Image boxSize='100%' src='/SP.png' alt='代替テキスト' />
            </AspectRatio>
          </GridItem>
          <GridItem bg='blue.500'>
            <AspectRatio maxW='100%' ratio={1}>
              <Image boxSize='100%' src='/IK.jpg' alt='代替テキスト' />
            </AspectRatio>
          </GridItem>
          <AspectRatio ratio={1}>
            <GridItem bg='blue.500'>
              <Image boxSize='100%' src='/OIP.jpg' alt='代替テキスト' />
            </GridItem>
          </AspectRatio>
          <AspectRatio ratio={1}>
            <GridItem bg='blue.500'>
              <Image boxSize='100%' src='/BU.jpg' alt='代替テキスト' />
            </GridItem>
          </AspectRatio>
          <AspectRatio ratio={1}>
            <GridItem bg='blue.500'>
              <Image boxSize='100%' src='/MA.jpg' alt='代替テキスト' />
            </GridItem>
          </AspectRatio>
        </Grid>
      </HStack>
    </VStack>
  );
};

export default Ideabox;
