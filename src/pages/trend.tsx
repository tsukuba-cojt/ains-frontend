import { Box, Container, Flex, Grid, GridItem, Heading, Tag, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";

import GridArtworks from "@/components/GridArtworks";
import LinkCard from "@/components/LinkCard";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

interface ListItemData {
  id: string;
  title: string;
}
type TagListItem = ListItemData & {};
type UserListItem = ListItemData & { thumbnail_url: string };
type CommunityListItem = ListItemData & { thumbnail_url: string };
type ArtworkListItem = ArtworkData;

interface TrendPageProps {
  tags: TagListItem[];
  users: UserListItem[];
  communities: CommunityListItem[];
  artworks: ArtworkListItem[];
}

export const getServerSideProps: GetServerSideProps<TrendPageProps> = async (_ctx) => {
  return {
    props: {
      tags: [
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
        { id: "hoge", title: "hoge" },
      ],
      users: [
        { id: "test", title: "test user", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test user", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test user", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test user", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test user", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test user", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test user", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test user", thumbnail_url: "https://placehold.jp/150x150.png" },
      ],
      communities: [
        {
          id: "test",
          title: "test community hoge fuga",
          thumbnail_url: "https://placehold.jp/150x150.png",
        },
        { id: "test", title: "test community", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test community", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test community", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test community", thumbnail_url: "https://placehold.jp/150x150.png" },
        { id: "test", title: "test community", thumbnail_url: "https://placehold.jp/150x150.png" },
      ],
      artworks: ((await new ArtworkInteractor().getLatests(10)) || []).map((a) => {
        return { ...a, uploaded: "" };
      }),
    },
  };
};

const TrendPage = ({ tags, users, communities, artworks }: TrendPageProps) => {
  const tag_elements = tags.map((tag: TagListItem, i: number) => (
    <Link key={i} href={`/search?tag=${tag.id}`}>
      <Tag size='lg'>{tag.title}</Tag>
    </Link>
  ));
  const user_elements = users.map((user: UserListItem, i: number) => (
    <GridItem key={i}>
      <LinkCard
        title={user.title}
        show_icon
        icon_type='circle'
        icon_url={user.thumbnail_url}
        href={`/search?user=${user.id}`}
      />
    </GridItem>
  ));
  const community_elements = communities.map((community: CommunityListItem, i: number) => (
    <GridItem key={i}>
      <LinkCard
        title={community.title}
        show_icon
        icon_type='square'
        icon_url={community.thumbnail_url}
        href={`/search?community=${community.id}`}
      />
    </GridItem>
  ));

  console.log(artworks);

  return (
    <Container maxW='container.lg' p={5}>
      <VStack gap={5}>
        <Box w='full'>
          <Heading as='h1'>トレンド</Heading>
        </Box>
        <Box w='full'>
          <Heading my={5} py={3} borderBottom='1px' as='h2' size='lg'>
            タグ
          </Heading>
          <Flex wrap='wrap' gap={3}>
            {tag_elements}
          </Flex>
        </Box>
        <Box w='full'>
          <Heading my={5} py={3} borderBottom='1px' as='h2' size='lg'>
            ユーザー
          </Heading>
          <Grid gap={5} templateColumns='repeat(4, 1fr)'>
            {user_elements}
          </Grid>
        </Box>
        <Box w='full'>
          <Heading my={5} py={3} borderBottom='1px' as='h2' size='lg'>
            コミュニティー
          </Heading>
          <Grid gap={5} templateColumns='repeat(3, 1fr)'>
            {community_elements}
          </Grid>
        </Box>
        <Box w='full'>
          <Heading my={5} py={3} borderBottom='1px' as='h2' size='lg'>
            作品
          </Heading>
          <GridArtworks artworks={artworks}></GridArtworks>
        </Box>
      </VStack>
    </Container>
  );
};

export default TrendPage;
