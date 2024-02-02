import { Box, Container, Spinner, useColorModeValue } from "@chakra-ui/react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR from "swr";

import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import LoadingPanel from "@/components/LoadingPanel";
import CommunityInteractor from "@/interactors/Communities/CommunityInteractor";
import { theme } from "@/pages/_app";

import { PostCard, PostForm } from ".";

const PostDetailPage = () => {
  const router = useRouter();
  const { community_id, post_id } = router.query;
  const { user } = useContext(FirebaseAuthContext);
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR(`/communities/${community_id}/${post_id}`, () =>
    new CommunityInteractor().getPost(community_id as string, post_id as string)
  );
  const {
    data: replies,
    isLoading: isLoadingReplies,
    error: errorReplies,
    mutate: mutateReplies,
  } = useSWR(`/communities/${community_id}/${post_id}/replies`, () =>
    new CommunityInteractor().getReplies(community_id as string, post_id as string)
  );
  const { data: community } = useSWR(`/communities/${community_id as string}`, () =>
    new CommunityInteractor().get(community_id as string)
  );

  const all_members = community ? [community.owner].concat(community.admins, community.members) : [];

  if (isLoading) return <LoadingPanel />;
  if (error || !post) return <ErrorPage statusCode={404} />;

  return (
    <Container maxW='container.lg'>
      <PostCard
        post={post}
        community_id={community_id as string}
        mutateLike={() => {
          if (!user) return;
          if (post.likes.find((u: string) => u === user.id)) {
            mutate({ ...post, likes: post.likes.filter((u: string) => u !== user.id) });
          } else {
            mutate({ ...post, likes: post.likes.concat(user.id) });
          }
        }}
      />
      <PostForm
        isDisabled={!user || all_members.find((u: string) => u === user.id) === undefined}
        communityId={community_id as string}
        originPost={post.id}
        mutate={(newPost) => {
          if (replies && post) {
            mutateReplies([newPost].concat(replies));
            mutate({ ...post, repliesAmount: post.repliesAmount + 1 });
          }
        }}
      />
      <Box borderTop='1px' borderColor={secondary} px={5}>
        {isLoadingReplies ? (
          <Spinner />
        ) : errorReplies || !replies ? (
          <>error!</>
        ) : (
          replies.map((p, i) => (
            <PostCard
              key={i}
              post={p}
              community_id={community_id as string}
              mutateLike={() => {
                if (!user) return;
                const newReplies = replies;
                if (p.likes.find((u: string) => u === user.id)) {
                  newReplies[i] = { ...p, likes: p.likes.filter((u: string) => u !== user.id) };
                } else {
                  newReplies[i] = { ...p, likes: p.likes.concat(user.id) };
                }
                mutateReplies(newReplies);
              }}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

export default PostDetailPage;
