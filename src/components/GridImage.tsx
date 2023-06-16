import { GridItem, AspectRatio, Image, Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

import { theme } from "@/pages/_app";
import { ImageListData } from "@/types/api/image";

interface Props {
  image: ImageListData;
}

const GridImage = (props: Props) => {
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  return (
    <Link as={NextLink} href={`/artworks/${props.image.id}`}>
      <GridItem bg={secondary}>
        <AspectRatio maxW='100%' ratio={1}>
          <Image boxSize='100%' src={props.image.url} alt={props.image.name} />
        </AspectRatio>
      </GridItem>
    </Link>
  );
};

export default GridImage;
