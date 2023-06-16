import { Image, Stack } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/react";

const Test2Page = () => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={6}>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image objectFit='cover' src='/AA.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image objectFit='cover' src='/AA.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image objectFit='cover' src='/AA.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image objectFit='cover' src='/AA.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image objectFit='cover' src='/AA.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
    </Grid>
  );
};

export default Test2Page;
