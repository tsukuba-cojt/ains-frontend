// DisplayPage.tsx

import { Image, Grid, GridItem, AspectRatio, Divider } from "@chakra-ui/react";
import React from "react";

interface DisplayPageProps {
  numberOfTopImages: number;
  topImages?: string[]; // topImages をオプショナルに変更
}

const DisplayPage: React.FC<DisplayPageProps> = ({ numberOfTopImages, topImages = [] }) => {
  const borderColor = "cyan.500";

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={4}>
      {/* 最初の行 */}
      {topImages.slice(0, numberOfTopImages).map((image, index) => (
        <GridItem key={index} colSpan={1} bg={borderColor}>
          <AspectRatio maxW='100%' ratio={1}>
            <Image src={image} alt={`代替テキスト ${index + 1}`} />
          </AspectRatio>
        </GridItem>
      ))}

      {/* 水平線 */}
      <GridItem colSpan={4}>
        <Divider borderColor={borderColor} borderWidth='2px' />
      </GridItem>

      {/* 以降の行、それぞれ4つのアイテム */}
      <GridItem colSpan={1} bg={borderColor}>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/AA2.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem colSpan={1} bg={borderColor}>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/R.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem colSpan={1} bg={borderColor}>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/SP.png' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem colSpan={1} bg={borderColor}>
        <AspectRatio maxW='100%' ratio={1}>
          <Image src='/IK.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem colSpan={1} bg={borderColor}>
        <AspectRatio ratio={1}>
          <Image src='/OIP.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem colSpan={1} bg={borderColor}>
        <AspectRatio ratio={1}>
          <Image src='/BU.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
      <GridItem colSpan={1} bg={borderColor}>
        <AspectRatio ratio={1}>
          <Image boxSize='100%' src='/MB.jpg' alt='代替テキスト' />
        </AspectRatio>
      </GridItem>
    </Grid>
  );
};

export default DisplayPage;
