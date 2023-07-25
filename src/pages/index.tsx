"use client";
import { Grid } from "@chakra-ui/react";
import Link from "next/link";
import useSWR from "swr";

import GridImage from "@/components/GridImage";
import LoadingPanel from "@/components/LoadingPanel";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

const IndexPage = () => {
  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR("/artworks/latest", () => new ArtworkInteractor().getLatests(100));

  if (error || artworks === null) return <>Error!</>;
  if (isLoading || artworks === undefined) return <LoadingPanel />;

  const grid_items = artworks.map<JSX.Element>((artwork_data: ArtworkData, index: number) => {
    switch (artwork_data.type) {
      case "image": {
        return (
          <GridImage key={index} image={{ id: artwork_data.id, name: artwork_data.name, url: artwork_data.file.url }} />
        );
      }
      case "text": {
        return (
          <Link href={`/artworks/${artwork_data.id}`}>
            <div key={index}>t</div>
          </Link>
        );
      }
      case "audio": {
        return (
          <Link href={`/artworks/${artwork_data.id}`}>
            <div key={index}>a</div>
          </Link>
        );
      }
      case "video": {
        return (
          <Link href={`/artworks/${artwork_data.id}`}>
            <div key={index}>v</div>
          </Link>
        );
      }
      default: {
        return <div key={index}>x</div>;
      }
    }
  });

  return (
    <Grid p={4} templateColumns='repeat(4, 1fr)' gap={4}>
      {grid_items}
    </Grid>
  );
};

export default IndexPage;
