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
<<<<<<< HEAD
    <Grid templateColumns='repeat(4, 1fr)' gap={4}>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image boxSize='100%' src='/IMG_0649.png' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image boxSize='100%' src='/AA.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image boxSize='100%' src='/AA2.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image boxSize='100%' src='/R.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image boxSize='100%' src='/SP.png' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem bg='blue.500'>
        <AspectRatio maxW='100%' ratio={1}>
          <Image boxSize='100%' src='/IK.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <AspectRatio ratio={1}>
        <GridItem bg='blue.500'>
          <Image boxSize='100%' src='/OIP.jpg' alt='代替テキスト' />
        </GridItem>
      </AspectRatio>
      <AspectRatio ratio={1}>
        <GridItem bg='blue.500'>
          <Image boxSize='100%' src='/BU.jpg' alt='代替テキスト' />
        </GridItem>
      </AspectRatio>
      <AspectRatio ratio={1}>
        <GridItem bg='blue.500'>
          <Image boxSize='100%' src='/MB.jpg' alt='代替テキスト' />
        </GridItem>
      </AspectRatio>
=======
    <Grid p={4} templateColumns='repeat(4, 1fr)' gap={4}>
      {image_grid_items}
>>>>>>> 60a15d7d826dfdc55fc069389057a5d595381949
    </Grid>
  );
};

export default IndexPage;
