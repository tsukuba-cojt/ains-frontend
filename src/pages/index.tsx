"use client";
import { Grid } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import useSWR from "swr";

import GridImage from "@/components/GridImage";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/types/api/artwork";
import { ImageListData } from "@/types/index";

const IndexPage = () => {
  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR("/artworks/latest", () => new ArtworkInteractor().getLatests(100));

  const [images, setImages] = useState<ImageListData[]>([
    { id: "IMG_0649.png", name: "hoge", url: "/IMG_0649.png" },
    { id: "AA.jpg", name: "hoge", url: "/AA.jpg" },
    { id: "AA2.jpg", name: "hoge", url: "/AA2.jpg" },
    { id: "R.jpg", name: "hoge", url: "/R.jpg" },
    { id: "SP.png", name: "hoge", url: "/SP.png" },
    { id: "IK.jpg", name: "hoge", url: "/IK.jpg" },
    { id: "BU.jpg", name: "hoge", url: "/BU.jpg" },
  ]);

  const image_grid_items = useMemo<JSX.Element[]>(
    () =>
      images.map<JSX.Element>(
        (image: ImageListData, index: number): JSX.Element => <GridImage key={index} image={image} />
      ),
    [images]
  );

  if (error || artworks === null) return <>Error!</>;
  if (isLoading || artworks === undefined) return <>Loading!</>;

  const grid_items = artworks.map<JSX.Element>((artwork_data: ArtworkData, index: number) => {
    switch (artwork_data.type) {
      case "image": {
        return (
          <GridImage key={index} image={{ id: artwork_data.id, name: artwork_data.name, url: artwork_data.file.url }} />
        );
      }
      case "text": {
        return <div key={index}>t</div>;
      }
      case "audio": {
        return <div key={index}>a</div>;
      }
      case "video": {
        return <div key={index}>v</div>;
      }
      default: {
        return <div key={index}>x</div>;
      }
    }
  });

  return (
    <Grid p={4} templateColumns='repeat(4, 1fr)' gap={4}>
      {image_grid_items}
      {grid_items}
    </Grid>
  );
};

export default IndexPage;
