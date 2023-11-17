import { Grid, useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

import GridAudio from "./GridAudio";
import GridImage from "./GridImage";
import GridText from "./GridText";
import GridVideo from "./GridVideo";
import OverlayMenu from "./OverlayMenu";

interface Props {
  artworks: ArtworkData[];
  hasOverlay?: boolean;
}

const GridArtworks = (props: Props) => {
  const toast = useToast();
  const [gridItems, setGridItems] = useState<ReactNode[]>([]);

  useEffect(() => {
    const updateGridItems = async () => {
      const new_grid_items = [];
      for (let i = 0; i < props.artworks.length; i++) {
        let new_item: ReactNode | null = null;
        switch (props.artworks[i].type) {
          case "image": {
            new_item = (
              <GridImage
                key={i}
                image_data={{ id: props.artworks[i].id, name: props.artworks[i].name, url: props.artworks[i].file.url }}
              />
            );
            break;
          }
          case "text": {
            let thumbnail_url = "/text_file.png";
            if (props.artworks[i].parent_ids.length > 0) {
              const parent_artwork = await new ArtworkInteractor().get(props.artworks[i].parent_ids[0]);
              if (parent_artwork !== null && parent_artwork.type === "image") thumbnail_url = parent_artwork.file.url;
            }

            new_item = (
              <GridText
                key={i}
                text_data={{
                  id: props.artworks[i].id,
                  name: props.artworks[i].name,
                  thumbnail: thumbnail_url,
                }}
              />
            );
            break;
          }
          case "audio": {
            let thumbnail_url = "/audio_file.png";
            if (props.artworks[i].parent_ids.length > 0) {
              const parent_artwork = await new ArtworkInteractor().get(props.artworks[i].parent_ids[0]);
              if (parent_artwork !== null && parent_artwork.type === "image") thumbnail_url = parent_artwork.file.url;
            }

            new_item = (
              <GridAudio
                key={i}
                audio_data={{
                  id: props.artworks[i].id,
                  name: props.artworks[i].name,
                  thumbnail: thumbnail_url,
                  audio_src: props.artworks[i].file.url,
                }}
              />
            );
            break;
          }
          case "video": {
            new_item = (
              <GridVideo
                key={i}
                video_data={{ id: props.artworks[i].id, name: props.artworks[i].name, url: props.artworks[i].file.url }}
              />
            );
            break;
          }
        }
        if (new_item === null) continue;

        if (props.hasOverlay) {
          new_grid_items.push(
            <OverlayMenu
              key={i}
              actions={[
                {
                  name: props.artworks[i].is_public ? "非公開にする" : "公開する",
                  action: async () => {
                    const result = await new ArtworkInteractor().update({
                      id: props.artworks[i].id,
                      is_public: !props.artworks[i].is_public,
                    });
                    if (result) {
                      toast({
                        title: `${props.artworks[i].is_public ? "非公開に" : "公開"}しました`,
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                    } else {
                      toast({
                        title: "閲覧範囲の更新に失敗しました",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                    }
                  },
                },
                {
                  name: "削除する",
                  action: async () => {
                    const result = await new ArtworkInteractor().delete({ id: props.artworks[i].id });
                    if (result) {
                      toast({
                        title: "削除しました",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                    } else {
                      toast({
                        title: "削除に失敗しました",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                    }
                  },
                },
              ]}
            >
              {new_item}
            </OverlayMenu>
          );
        } else {
          new_grid_items.push(new_item);
        }
      }
      setGridItems(new_grid_items);
    };
    updateGridItems();
  }, [props.artworks]);

  return (
    <Grid p={4} templateColumns='repeat(4, 1fr)' gap={4}>
      {gridItems}
    </Grid>
  );
};

export default GridArtworks;
