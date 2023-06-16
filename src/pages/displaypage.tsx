import { Image, Stack } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/react";

const TestPage = () => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={4}>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/IMG_0649.png' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/AA.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/AA2.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/R.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/SP.png' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/IK.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <AspectRatio ratio={1}>
        <GridItem bg='blue.500'>
          <Image src='/OIP.jpg' alt='代替テキスト' />
        </GridItem>
      </AspectRatio>
      <AspectRatio ratio={1}>
        <GridItem bg='blue.500'>
          <Image src='/BU.jpg' alt='代替テキスト' />
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

export default TestPage;
