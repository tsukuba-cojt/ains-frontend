import { Avatar, Box, Button, Container, Flex, Image, Input, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import ErrorPage from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";

import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import LoadingPanel from "@/components/LoadingPanel";
import TextWithBreaks from "@/components/TextWithBreaks";
import CommunityInteractor from "@/interactors/Communities/CommunityInteractor";
import { PostData } from "@/interactors/Communities/CommunityTypes";
import UserInteractor from "@/interactors/User/UserInteractor";
import { UserData } from "@/interactors/User/UserTypes";

import { theme } from "../_app";

const CommunityPage = () => {
  const communityInteractor = new CommunityInteractor();
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const router = useRouter();
  const { community_id } = router.query;
  const {
    data: community,
    isLoading,
    error,
  } = useSWR(`/communities/${community_id as string}`, () => communityInteractor.get(community_id as string));
  const [posts, setPosts] = useState<PostData[]>([]);
  const { user } = useContext(FirebaseAuthContext);

  const all_members = community ? [community.owner].concat(community.admins, community.members) : [];
  const [userIcons, setUserIcons] = useState<Array<ReactNode>>([]);
  const [postContent, setPostContent] = useState<string>("");

  useEffect(() => {
    Promise.all(all_members.slice(0, 5).map((user_id: string) => new UserInteractor().get(user_id))).then(
      (nullable_users: (UserData | null)[]) => {
        const users = nullable_users.filter((u: UserData | null) => u !== null) as UserData[];
        setUserIcons(
          users.map((user: UserData, index: number) => (
            <Link key={index} href={`/users/${user.id}`}>
              <Avatar ml={-3} name={user.name} src={user.icon} />
            </Link>
          ))
        );
      }
    );
    if (community) communityInteractor.getPosts(community.id).then((posts) => setPosts(posts || []));
  }, [community]);

  if (isLoading) return <LoadingPanel />;
  if (error || !community) return <ErrorPage statusCode={404} />;

  return (
    <Container maxW='container.lg'>
      <Box h={200} {...{ backgroundImage: community.banner && community.banner.url, backgroundColor: "primary.100" }}>
        {community.banner ? (
          <Image h='full' w='full' src={community.banner.url} alt='バナー画像' />
        ) : (
          <Box h='full' backgroundColor='primary.100' />
        )}
      </Box>
      <Box p={5} backgroundColor={secondary}>
        <Text fontWeight='bold' fontSize='3xl'>
          {community.name}
        </Text>
        <TextWithBreaks text={community.description || ""} />
        <Flex mt={5} alignItems='center'>
          <Flex alignItems='center' gap={5}>
            <Flex>{userIcons}</Flex>
            <Text>{all_members.length}人のメンバー</Text>
          </Flex>
          <Button ml='auto'>参加{!community.isPublic && "リクエスト"}</Button>
        </Flex>
      </Box>
      <Box position='sticky'>
        <Input value={postContent} onChange={(e) => setPostContent(e.target.value)} />
        <Button
          onClick={() => {
            if (!user) return;
            communityInteractor.post({ content: postContent, author: user.id, community_id: community.id });
          }}
        >
          submit
        </Button>
      </Box>
      <VStack>
        {posts.map((p, i) => (
          <Box key={i}>
            {p.content}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default CommunityPage;
