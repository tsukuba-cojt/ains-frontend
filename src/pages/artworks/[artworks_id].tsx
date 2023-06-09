import { Container, Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ArtworkDetailPage = () => {
  const router = useRouter();
  const { artworks_id } = router.query;

  return (
    <Container maxW='container.lg'>
      <Flex justify='center' gap={5}>
        <Image src={`/${artworks_id}`} />
        <Flex paddingY={5} direction='column' gap={5}>
          <Heading as='h3' size='lg'>
            {artworks_id}
          </Heading>
          <Text>
            メロスは激怒した。必ず、かの邪智暴虐じゃちぼうぎゃくの王を除かなければならぬと決意した。メロスには政治がわからぬ。メロスは、村の牧人である。笛を吹き、羊と遊んで暮して来た。けれども邪悪に対しては、人一倍に敏感であった。きょう未明メロスは村を出発し、野を越え山越え、十里はなれた此このシラクスの市にやって来た。メロスには父も、母も無い。女房も無い。十六の、内気な妹と二人暮しだ。
          </Text>
          <Box>
            <Image src='https://bit.ly/dan-abramov' borderRadius='100%' />
            <Text>Dan Abramov</Text>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default ArtworkDetailPage;
