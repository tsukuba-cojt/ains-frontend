import { Image, Stack, Button, Flex, Box, Text } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/react";

const IndexPage = () => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={4}>
      <Box position='relative'>
        <Image src='IK.jpg' alt='Image' />
        <Box
          position='absolute'
          bottom='0'
          left='0'
          right='0'
          height='50%'
          backgroundImage='linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))'
          content=''
        />
      </Box>
      <Box position='relative'>
        <Image src='IK.jpg' alt='Image' />
        <Box
          position='absolute'
          bottom='0'
          left='0'
          right='0'
          height='30%'
          bg='rgba(0, 0, 0, 0.6)'
          content=''
          _before={{
            position: "absolute",
            content: '""',
            bottom: "0",
            left: "0",
            right: "0",
            height: "100%",
            backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          <Flex align='center'>
            <Box boxSize='40px' borderRadius='50%' overflow='hidden' marginRight='10px'>
              <Image src='BU.jpg' alt='Icon' />
            </Box>
            <Text color='white' fontSize='24px' textAlign='center'>
              Sample Text
            </Text>
          </Flex>
        </Box>
      </Box>
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
          <Image boxSize='100%' src='/MB.jpg' alt='代替テキスト' />
        </GridItem>
      </AspectRatio>
    </Grid>
  );
};

export default IndexPage;
