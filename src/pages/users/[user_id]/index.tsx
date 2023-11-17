import {
  Avatar,
  Container,
  Heading,
  VStack,
  Flex,
  Text,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  Tabs,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import ErrorPage from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

import GridArtworks from "@/components/GridArtworks";
import LinkCard from "@/components/LinkCard";
import LoadingPanel from "@/components/LoadingPanel";
import UserInteractor from "@/interactors/User/UserInteractor";

export const getServerSideProps: GetServerSideProps = async () => {
  const mock_data = [
    {
      id: "74e18109-3a73-48d7-8b44-ff52dd39a687",
      type: "image",
      name: "ピンクの女の子２",
      description: "",
      file: {
        id: "97637215-f2be-4746-8946-079609afe3b8",
        path: "/files/97637215-f2be-4746-8946-079609afe3b8.png",
        url: "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F97637215-f2be-4746-8946-079609afe3b8.png?alt=media&token=cbe2236f-aa15-4e65-a734-507c17826f6f",
      },
      view_num: 0,
      save_num: 0,
      uploaded: "",
      author_id: "cG5X9vW9I1QKTVyopAI4gV7B3V32",
      tags: [],
      comment_ids: [],
      parent_ids: ["69f1247f-5afe-4da3-89d7-8f56b826d735"],
    },
    {
      id: "69f1247f-5afe-4da3-89d7-8f56b826d735",
      type: "image",
      name: "ピンクの女の子",
      description: "かわいい",
      file: {
        id: "453a51c2-3183-44dd-95ad-d9b4612e7628",
        path: "/files/453a51c2-3183-44dd-95ad-d9b4612e7628.png",
        url: "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F453a51c2-3183-44dd-95ad-d9b4612e7628.png?alt=media&token=78cf119e-9271-499e-8cad-1e59424f2049",
      },
      view_num: 0,
      save_num: 0,
      uploaded: "",
      author_id: "cG5X9vW9I1QKTVyopAI4gV7B3V32",
      tags: ["女の子"],
      comment_ids: ["0a67d647-486a-4a74-9200-2d84724bbec2"],
      parent_ids: [],
    },
    {
      id: "bcc912a7-b637-4fe1-8c58-855ea94c1864",
      type: "audio",
      name: "ハッピータイム",
      description: "",
      file: {
        id: "88597bc7-7f02-4d05-a371-d2905aca3b79",
        path: "/files/88597bc7-7f02-4d05-a371-d2905aca3b79.mp3",
        url: "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F88597bc7-7f02-4d05-a371-d2905aca3b79.mp3?alt=media&token=01a8b575-98a8-44ce-b853-38a265d56406",
      },
      view_num: 0,
      save_num: 0,
      uploaded: "",
      author_id: "cG5X9vW9I1QKTVyopAI4gV7B3V32",
      tags: [],
      comment_ids: [],
      parent_ids: ["4c53fd91-88a0-4bdc-82b9-46253633cedc"],
    },
    {
      id: "fea8d6f4-d0d2-4073-88b6-37aa1e2e9b54",
      type: "text",
      name: "りんごのくるま",
      description: "新美南吉さんのやつです",
      file: {
        id: "f19e03c7-6f34-4e99-bcd6-2d5ad2edb839",
        path: "/files/f19e03c7-6f34-4e99-bcd6-2d5ad2edb839.txt",
        url: "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2Ff19e03c7-6f34-4e99-bcd6-2d5ad2edb839.txt?alt=media&token=33369c03-1b95-4f2e-8cfd-954bd23a229d",
      },
      view_num: 0,
      save_num: 0,
      uploaded: "",
      author_id: "QflQvbvsgqcXSHdL0tZesX85mTy2",
      tags: ["新美南吉", "文章"],
      comment_ids: [],
      parent_ids: ["3d94dbac-aa02-44f2-9e7d-df53031bdbe1"],
    },
    {
      id: "d03ed113-28c5-496a-b229-455e529e2438",
      type: "video",
      name: "中世っぽい空撮画像",
      description: "空撮画像",
      file: {
        id: "b8214ce5-2d25-48f4-b30e-f13e4acdeaef",
        path: "/files/b8214ce5-2d25-48f4-b30e-f13e4acdeaef.mp4",
        url: "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2Fb8214ce5-2d25-48f4-b30e-f13e4acdeaef.mp4?alt=media&token=a5955d9d-ab95-4518-8611-992e4afb43c5",
      },
      view_num: 0,
      save_num: 0,
      uploaded: "",
      author_id: "QflQvbvsgqcXSHdL0tZesX85mTy2",
      tags: ["中世", "リアル", "動画"],
      comment_ids: [],
      parent_ids: [],
    },
  ];

  return {
    props: {
      artworks: mock_data,
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
    },
  };
};

const UserProfilePage = ({ artworks, communities }: any) => {
  const router = useRouter();
  const { user_id } = router.query;
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`/users/${user_id}`, () => new UserInteractor().getPublicData(user_id as string));

  const [doesExpandDescription, setDoesExpandDescription] = useState<boolean>(false);

  if (error || user === null) return <ErrorPage statusCode={404} />;
  if (isLoading || user === undefined) return <LoadingPanel />;

  return (
    <Container maxW='container.lg' p={5}>
      <VStack gap={5}>
        <Avatar size='2xl' name={user.name} src={user.icon_url} />
        <Heading as='h1'>{user.name}</Heading>

        <Flex gap={3}>
          <Link href={`/users/${user_id}/follows`}>フォロー: {user.follows_count}人</Link>
          <Link href={`/users/${user_id}/followers`}>フォロワー: {user.followers_count}人</Link>
        </Flex>
        <Text
          noOfLines={doesExpandDescription ? undefined : 3}
          onClick={() => setDoesExpandDescription(!doesExpandDescription)}
        >
          メロスは激怒した。必ず、かの邪智暴虐じゃちぼうぎゃくの王を除かなければならぬと決意した。メロスには政治がわからぬ。メロスは、村の牧人である。笛を吹き、羊と遊んで暮して来た。けれども邪悪に対しては、人一倍に敏感であった。きょう未明メロスは村を出発し、野を越え山越え、十里はなれた此このシラクスの市にやって来た。メロスには父も、母も無い。女房も無い。十六の、内気な妹と二人暮しだ。この妹は、村の或る律気な一牧人を、近々、花婿はなむことして迎える事になっていた。結婚式も間近かなのである。メロスは、それゆえ、花嫁の衣裳やら祝宴の御馳走やらを買いに、はるばる市にやって来たのだ。先ず、その品々を買い集め、それから都の大路をぶらぶら歩いた。メロスには竹馬の友があった。セリヌンティウスである。
        </Text>
        <Tabs w='full' align='center'>
          <TabList>
            <Tab>投稿済み</Tab>
            <Tab>保存済み</Tab>
            <Tab>コミュニティー</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GridArtworks artworks={artworks} />
            </TabPanel>
            <TabPanel>
              <GridArtworks artworks={artworks} />
            </TabPanel>
            <TabPanel>
              <Grid gap={5} templateColumns='repeat(3, 1fr)'>
                {communities.map((community: any, i: number) => (
                  <GridItem key={i}>
                    <LinkCard
                      title={community.title}
                      show_icon
                      icon_type='square'
                      icon_url={community.thumbnail_url}
                      href={`/search?community=${community.id}`}
                    />
                  </GridItem>
                ))}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default UserProfilePage;
