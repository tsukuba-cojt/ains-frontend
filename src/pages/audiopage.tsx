import { Grid } from "@chakra-ui/react";
import React, { useState, useMemo } from "react";

import Audio from "@/components/Audio";
import { MusicListData } from "@/types/api/image";

const AudioPagePage = () => {
  const [musicimages, setMusicImages] = useState<MusicListData[]>([
    { id: "music.mp3", name: "music", audio_src: "music.mp3", thumbnail: "/AA.jpg" },
  ]);

  const music_grid_items = useMemo<JSX.Element[]>(
    () =>
      musicimages.map<JSX.Element>(
        (music: MusicListData, index: number): JSX.Element => <Audio key={index} music={music} />
      ),
    [musicimages]
  );

  return (
    <Grid p={4} templateColumns='repeat(4, 1fr)' gap={4}>
      {music_grid_items}
    </Grid>
  );
};

export default AudioPagePage;
