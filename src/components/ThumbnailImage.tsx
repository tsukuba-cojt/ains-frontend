import { SpinnerIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import useSWR from "swr";

import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

interface Props {
  artworkData: ArtworkData;
  width?: string;
  height?: string;
  boxSize?: string;
}

export default function ThumbnailImage(props: Props) {
  const {
    data: imgURL,
    error,
    isLoading,
  } = useSWR(`/thumbnail/${props.artworkData.id}`, async () => {
    let thumbnail_url = "/text_file.png";
    if (props.artworkData.type === "image") {
      thumbnail_url = props.artworkData.file.url;
    } else {
      switch (props.artworkData.type) {
        case "text": {
          thumbnail_url = "/text_file.png";
          break;
        }
        case "audio": {
          thumbnail_url = "/audio_file.png";
          break;
        }
        case "video": {
          thumbnail_url = "/text_file.png";
          break;
        }
      }
      if (props.artworkData.parent_ids.length > 0) {
        const parent_artwork = await new ArtworkInteractor().get(props.artworkData.parent_ids[0]);
        if (parent_artwork !== null && parent_artwork.type === "image") thumbnail_url = parent_artwork.file.url;
      }
    }
    return thumbnail_url;
  });
  const width = props.width ? props.width : props.boxSize ? props.boxSize : "20px";
  const height = props.height ? props.height : props.boxSize ? props.boxSize : "20px";

  if (imgURL !== null || imgURL !== undefined) {
    return <Image src={imgURL} boxSize='20px' alt='image' marginRight='10px' marginLeft='10px' />;
  } else {
    return <SpinnerIcon boxSize='20px' marginRight='10px' marginLeft='10px' />;
  }
}
