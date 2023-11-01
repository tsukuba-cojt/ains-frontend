import { GridItem, AspectRatio, Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRef } from "react";

import { theme } from "@/pages/_app";
import { VideoListData } from "@/types/index";

interface Props {
  video_data: VideoListData;
}

const GridImage = (props: Props) => {
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <Link
      as={NextLink}
      href={`/artworks/${props.video_data.id}`}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      <GridItem bg={secondary}>
        <AspectRatio maxW='100%' ratio={1}>
          <video muted ref={videoRef} controls src={props.video_data.url} />
        </AspectRatio>
      </GridItem>
    </Link>
  );
};

export default GridImage;
