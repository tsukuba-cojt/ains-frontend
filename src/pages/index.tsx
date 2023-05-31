import { Image, Stack } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/react";

const Test2Page = () => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={6}>
      <GridItem w='100%' h='350' bg='blue.500'>
        <Image boxSize='351px' objectFit='cover' src='/IMG_0649.png' alt='代替テキスト' />
      </GridItem>
      <GridItem w='100%' h='350' bg='blue.500'>
        <Image boxSize='351px' objectFit='cover' src='/AA.jpg' alt='代替テキスト' />
      </GridItem>
      <GridItem w='100%' h='350' bg='blue.500'>
        <Image boxSize='351px' objectFit='cover' src='/AA2.jpg' alt='代替テキスト' />
      </GridItem>
      <GridItem w='100%' h='350' bg='blue.500'>
        <Image boxSize='351px' objectFit='cover' src='/R.jpg' alt='代替テキスト' />
      </GridItem>
      <GridItem w='100%' h='350' bg='blue.500'>
        <Image boxSize='351px' objectFit='cover' src='/SP.png' alt='代替テキスト' />
      </GridItem>
      <GridItem w='100%' h='350' bg='blue.500'>
        <Image boxSize='351px' objectFit='cover' src='/IK.jpg' alt='代替テキスト' />
      </GridItem>
    </Grid>
  );
};

export default Test2Page;
