import { Image, Flex, Box, Text, Button, useColorModeValue, Link } from "@chakra-ui/react";
import { GridItem } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";

import { theme } from "@/pages/_app";
import { AudioListData } from "@/types/index";

interface Props {
  audio_data: AudioListData;
}

const GridAudio = (props: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = React.useRef<HTMLAudioElement | null>(null);
  const handlePlayButtonClick = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  return (
    <Link
      as={NextLink}
      href={`/artworks/${props.audio_data.id}`}
      onMouseEnter={() => {
        audioPlayerRef.current?.play();
        setIsPlaying(true);
      }}
      onMouseLeave={() => {
        audioPlayerRef.current?.pause();
        setIsPlaying(false);
      }}
    >
      <GridItem bg={secondary}>
        <Box position='relative'>
          <AspectRatio ratio={1}>
            <Image src={props.audio_data.thumbnail} alt={props.audio_data.name} w='100%' />
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
          <audio ref={audioPlayerRef} src={props.audio_data.audio_src} />
          <Button
            position='absolute'
            top='70%'
            left='50%'
            transform='translate(-50%, 50%)'
            size='2xl'
            variant='link'
            onClick={handlePlayButtonClick}
          >
            <Flex alignItems='center' justifyContent='center'>
              {isPlaying ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  width='48px'
                  height='48px'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  width='48px'
                  height='48px'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                  />
                </svg>
              )}

              <Text color='white' fontSize='24px' textAlign='center'>
                {props.audio_data.name.length > 20 ? `${props.audio_data.name.slice(0, 20)}...` : props.audio_data.name}
              </Text>
            </Flex>
          </Button>
        </Box>
      </GridItem>
    </Link>
  );
};

export default GridAudio;
