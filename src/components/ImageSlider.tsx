import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Grid, GridItem, Link, useBreakpointValue, Image, Text, Flex } from "@chakra-ui/react";
import { useState, useMemo } from "react";

export interface ImageItem {
  src: string;
  title: string;
  href: string;
}

interface Props {
  images: ImageItem[];
  col: number;
  col_sm: number;
}

const ImageSlider = (props: Props) => {
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const _responsive_col = useBreakpointValue({ base: props.col_sm, md: props.col });
  let responsive_col = 0;
  if (_responsive_col !== undefined) responsive_col = _responsive_col;
  const display_items = useMemo<JSX.Element[]>(() => {
    const new_items: JSX.Element[] = [];
    for (let i = 0; i < responsive_col; i++) {
      const images_index = responsive_col * sliderIndex + i;
      if (props.images.length <= images_index) break;

      new_items.push(
        <Link href={props.images[images_index].href}>
          <GridItem display='flex' flexDirection='column' alignItems='center' key={i}>
            <Image src={props.images[images_index].src} alt={props.images[images_index].title} />
            <Text>{props.images[images_index].title}</Text>
          </GridItem>
        </Link>
      );
    }
    return new_items;
  }, [responsive_col, sliderIndex]);

  return (
    <Flex alignItems='center'>
      <ChevronLeftIcon
        boxSize='3rem'
        onClick={() => {
          if (sliderIndex > 0) setSliderIndex(sliderIndex - 1);
        }}
      />
      <Grid templateColumns={{ base: `repeat(${props.col_sm}, 1fr)`, md: `repeat(${props.col}, 1fr)` }} gap={3}>
        {display_items}
      </Grid>
      <ChevronRightIcon
        boxSize='3rem'
        onClick={() => {
          if (sliderIndex < Math.ceil(props.images.length / responsive_col) - 1) setSliderIndex(sliderIndex + 1);
        }}
      />
    </Flex>
  );
};

export default ImageSlider;
