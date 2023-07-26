import { Grid } from "@chakra-ui/react";
import Link from "next/link";

import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

import GridImage from "./GridImage";

interface Props {
  artworks: ArtworkData[];
}

const GridArtworks = (props: Props) => {
  const grid_items = props.artworks.map<JSX.Element>((artwork_data: ArtworkData, index: number) => {
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

export default GridArtworks;
