import { GridItem, AspectRatio, Image, Link, useColorModeValue, Box, Button, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { theme } from "@/pages/_app";
import { ImageListData } from "@/types/api/image";

interface Props {
  image: ImageListData;
}

const GridImage = (props: Props) => {
  const text = props.image.name;
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  return (
    <Link as={NextLink} href={`/artworks/${props.image.id}`}>
      <GridItem bg='blue.500'>
        <Box position='relative'>
          <AspectRatio ratio={1}>
            <Image src='IK.jpg' alt='Image' />
          </AspectRatio>
          <Box
            position='absolute'
            bottom='0'
            left='0'
            right='0'
            height='30%'
            backgroundImage='linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))'
            content=''
          />
          <Button position='absolute' top='70%' left='50%' transform='translate(-50%, 50%)' size='2xl' variant='link'>
            <Flex alignItems='center' justifyContent='center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                width='48px'
                height='48px'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                />
              </svg>
              <Text color='white' fontSize='24px' textAlign='center'>
                {text.length > 20 ? `${text.slice(0, 20)}...` : text}
              </Text>
            </Flex>
          </Button>
        </Box>
      </GridItem>
    </Link>
  );
};

export default GridImage;
