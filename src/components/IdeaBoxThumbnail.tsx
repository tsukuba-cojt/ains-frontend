import { Image, Button, Flex, Grid, GridItem, AspectRatio, Box, Text } from "@chakra-ui/react";

import { ImageListData } from "@/types/api/image";

interface Props {
  images: ImageListData[];
}

const IdeaBoxThumbnail = (props: Props) => {
  return (
    <Button h='fit-content' padding={4} variant='ghost' w='200%'>
      <Flex direction='column' w='100%'>
        <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
          <GridItem rowSpan={2} colSpan={2}>
            <AspectRatio maxW='100%' ratio={1}>
              <Image src={props.images[0].url} alt='代替テキスト' w='100%' />
            </AspectRatio>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <AspectRatio ratio={1}>
              <Image src={props.images[1].url} alt='代替テキスト' w='100%' />
            </AspectRatio>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <AspectRatio maxW='100%' ratio={1}>
              <Image src={props.images[2].url} alt='代替テキスト' w='100%' />
            </AspectRatio>
          </GridItem>
        </Grid>
        <Box>
          <Text mt={2}>ファイル名</Text>
          <Text fontSize='0.3rem'>件数</Text>
        </Box>
      </Flex>
    </Button>
  );
};

export default IdeaBoxThumbnail;
