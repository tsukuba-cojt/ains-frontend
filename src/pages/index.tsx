import { Grid } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import GridImage from "@/components/GridImage";
import { ImageListData } from "@/types/api/image";

const IndexPage = () => {
  const [images, setImages] = useState<ImageListData[]>([
    { id: "IMG_0649.png", name: "hoge", url: "/IMG_0649.png" },
    { id: "AA.jpg", name: "hoge", url: "/AA.jpg" },
    { id: "AA2.jpg", name: "hoge", url: "/AA2.jpg" },
    { id: "R.jpg", name: "hoge", url: "/R.jpg" },
    { id: "SP.png", name: "hoge", url: "/SP.png" },
    { id: "IK.jpg", name: "hoge", url: "/IK.jpg" },
    { id: "OIP.jpg", name: "hoge", url: "/OIP.jpg" },
    { id: "BU.jpg", name: "hoge", url: "/BU.jpg" },
    { id: "MA.jpg", name: "hoge", url: "/MA.jpg" },
  ]);

  const image_grid_items = useMemo<JSX.Element[]>(
    () =>
      images.map<JSX.Element>(
        (image: ImageListData, index: number): JSX.Element => <GridImage key={index} image={image} />
      ),
    [images]
  );

  return (
    <Grid p={4} templateColumns='repeat(4, 1fr)' gap={4}>
      {image_grid_items}
    </Grid>
  );
};

export default IndexPage;
