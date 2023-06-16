import { Container, Tag, HStack, Box, Flex, Image, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { theme } from "../_app";
import CommentBox from "@/components/CommentBox";

const ArtworkDetailPage = () => {
  const router = useRouter();
  const { artworks_id } = router.query;

  const [doesExpandDescription, setDoesExpandDescription] = useState<boolean>(false);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  return (
    <Container maxW='container.lg' p={5}>
      <Flex justify='center' alignItems='center' direction={{ base: "column", md: "row" }} gap={10}>
        <Image maxH='80vh' maxW='40vw' src={`/${artworks_id}`} />
        <Flex borderLeft='1px' borderColor='gray.500' paddingLeft={10} paddingY={5} direction='column' gap={5}>
          <Heading as='h3' size='lg'>
            {artworks_id}
          </Heading>
          <Text
            onClick={() => setDoesExpandDescription(!doesExpandDescription)}
            noOfLines={doesExpandDescription ? undefined : 3}
          >
            メロスは激怒した。必ず、かの邪智暴虐じゃちぼうぎゃくの王を除かなければならぬと決意した。メロスには政治がわからぬ。メロスは、村の牧人である。笛を吹き、羊と遊んで暮して来た。けれども邪悪に対しては、人一倍に敏感であった。きょう未明メロスは村を出発し、野を越え山越え、十里はなれた此このシラクスの市にやって来た。メロスには父も、母も無い。女房も無い。十六の、内気な妹と二人暮しだ。
          </Text>
          <Flex alignItems='center' gap={4}>
            <Image boxSize='2.5rem' src='https://bit.ly/dan-abramov' rounded='full' />
            <Text>Dan Abramov</Text>
          </Flex>
          <HStack>
            <Tag>hoge</Tag>
            <Tag>fuga</Tag>
            <Tag>piyo</Tag>
          </HStack>
          <Box p={3} rounded='md' bg={secondary}>
            <Heading size='md' as='h3' py={2} borderBottom='1px' borderColor='gray.500'>
              コメント
            </Heading>
            <Flex mt={4} direction='column' gap={4}>
              <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
              <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default ArtworkDetailPage;
