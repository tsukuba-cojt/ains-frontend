import { Grid } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import GridText from "@/components/GridText";
import { ImageListData } from "@/types/api/image";

const TextPage = () => {
  const [textimages, setImages] = useState<ImageListData[]>([{ id: "IK.jpg", name: "hoge", url: "/IK.jpg" }]);

  const text_grid_items = useMemo<JSX.Element[]>(
    () =>
      textimages.map<JSX.Element>(
        (image: ImageListData, index: number): JSX.Element => <GridText key={index} image={image} />
      ),
    [textimages]
  );

  return (
    <Grid p={4} templateColumns='repeat(4, 1fr)' gap={4}>
      {text_grid_items}
    </Grid>
  );
};

export default TextPage;
