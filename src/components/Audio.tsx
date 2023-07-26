import { Image, Flex, Box, Text, Button } from "@chakra-ui/react";
import { GridItem } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/react";
import React, { useState } from "react";

import { MusicListData } from "@/types/api/image";

interface Props {
  music: MusicListData;
}

const Music = (props: Props) => {
  const text = props.music.name;
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
  return (
    <GridItem bg='blue.500'>
      <Box position='relative'>
        <AspectRatio ratio={1}>
          <Image src={props.music.thumbnail} alt='代替テキスト' w='100%' />
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
        <audio ref={audioPlayerRef} src={props.music.audio_src} />
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
                stroke-width='1.5'
                stroke='currentColor'
                width='48px'
                height='48px'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            ) : (
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
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                />
              </svg>
            )}

            <Text color='white' fontSize='24px' textAlign='center'>
              {text.length > 20 ? `${text.slice(0, 20)}...` : text}
            </Text>
          </Flex>
        </Button>
      </Box>
    </GridItem>
  );
};

export default Music;
