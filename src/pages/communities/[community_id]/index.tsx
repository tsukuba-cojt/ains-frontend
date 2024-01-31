import { ChatIcon, CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Spinner,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import ErrorPage from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { FileIcon as ReactFileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";
import ResizeTextarea from "react-textarea-autosize";
import useSWR from "swr";

import { FirebaseAuthContext } from "@/components/FirebaseAuthProvider";
import LoadingPanel from "@/components/LoadingPanel";
import TextWithBreaks from "@/components/TextWithBreaks";
import FileIcon from "@/icons/FileIcon";
import HeartIcon from "@/icons/HeartIcon";
import HeartIconFill from "@/icons/HeartIconFill";
import CommunityInteractor from "@/interactors/Communities/CommunityInteractor";
import { PostData } from "@/interactors/Communities/CommunityTypes";
import { FileData } from "@/interactors/File/FileTypes";
import UserInteractor from "@/interactors/User/UserInteractor";
import { UserData } from "@/interactors/User/UserTypes";

import { theme } from "../../_app";

type UploadFileType = "image" | "video" | "audio" | "other";
interface UploadFileData {
  type: UploadFileType;
  data?: string;
  name: string;
  ext: string;
}
interface FilePreviewProps {
  file: File;
  onDelete?: () => void;
}

interface PostCardProps {
  post: PostData;
  community_id: string;
  mutateLike: () => void;
}

interface PostFormProps {
  communityId: string;
  originPost?: string;
  isDisabled: boolean;
  mutate: (newPost: PostData) => void;
}

const PREVIEW_SIZE = "80px";

const FilePreview = ({ file, onDelete }: FilePreviewProps) => {
  const PreviewIcon = ({ f }: { f: File }) => {
    const [fileData, setFileData] = useState<UploadFileData | null>(null);

    useEffect(() => {
      const reader = new FileReader();
      const type = f.type.split("/")[0];
      const ext = f.name.split(".").pop() || "";
      switch (type) {
        case "image":
        case "video":
        case "audio": {
          reader.onload = () => {
            setFileData({ type: type, data: reader.result as string, name: f.name, ext: ext });
          };
          reader.readAsDataURL(f);
          break;
        }
        default: {
          setFileData({ type: "other", name: f.name, ext: ext });
          break;
        }
      }
    }, [f]);

    if (!fileData) return <></>;

    switch (fileData.type) {
      case "image":
        return <Image src={fileData.data} w={PREVIEW_SIZE} h={PREVIEW_SIZE} alt={fileData.name} objectFit='contain' />;
      case "video":
        return <video controls src={fileData.data} width={PREVIEW_SIZE} height={PREVIEW_SIZE} />;
      case "audio":
        return <audio controls src={fileData.data} style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }} />;
      case "other":
        return (
          <Box w={`${parseInt(PREVIEW_SIZE) - 15}px`} h={`${parseInt(PREVIEW_SIZE) - 15}px`}>
            <ReactFileIcon extension={fileData.ext} {...defaultStyles[fileData.ext as DefaultExtensionType]} />
          </Box>
        );
    }
  };

  return (
    <Flex alignItems='center' position='relative'>
      {onDelete && (
        <CloseIcon
          top='-5px'
          right='-5px'
          bg='gray.600'
          rounded='full'
          w='20px'
          h='20px'
          position='absolute'
          onClick={onDelete}
          p='5px'
          color='white'
        />
      )}
      <PreviewIcon f={file} />
    </Flex>
  );
};

export const PostCard = ({ post, community_id, mutateLike }: PostCardProps) => {
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const { user } = useContext(FirebaseAuthContext);
  const [files, setFiles] = useState<(FileData & { mimetype: string })[]>([]);

  useEffect(() => {
    const checkMimetype = async () => {
      if (post.files) {
        const results = await Promise.all(post.files.map((f) => fetch(f.url)));
        const contentTypes = results.map((res) => res.headers.get("Content-Type"));
        const newFiles = post.files.map((f, i) => {
          return { ...f, mimetype: contentTypes[i] || "undefined/undefined" };
        });
        setFiles(newFiles);
      }
    };
    checkMimetype();
  }, [post.files]);

  const mediaElements = files
    .map((f, i) => {
      const Content = () => {
        const type = f.mimetype.split("/")[0];
        switch (type) {
          case "image": {
            return <Image src={f.url} alt={f.id} />;
          }
          case "video": {
            return <video controls src={f.url} />;
          }
          case "audio": {
            return <audio controls src={f.url} />;
          }
          default: {
            return null;
          }
        }
      };

      const content = Content();
      if (!content) return null;

      return (
        <GridItem display='flex' alignItems='center' key={i}>
          {content}
        </GridItem>
      );
    })
    .filter((e) => e !== null);

  const fileElements = files
    .map((f, i) => {
      const Content = () => {
        const [type, ext] = f.mimetype.split("/");
        switch (type) {
          case "image":
          case "video":
          case "audio": {
            return null;
          }
          default: {
            return <ReactFileIcon extension={ext} {...defaultStyles[ext as DefaultExtensionType]} />;
          }
        }
      };

      const content = Content();
      if (!content) return null;

      return (
        <GridItem display='flex' alignItems='center' key={i}>
          <a style={{ width: "100%" }} href={f.url} download>
            <Flex height='65px' gap={5} px={5} py={3} bg={secondary} rounded='lg' alignItems='center'>
              <Text>{f.name || `${f.id}.${f.mimetype.split("/")[1]}`}</Text>
              <Box ml='auto' w='40px'>
                {content}
              </Box>
            </Flex>
          </a>
        </GridItem>
      );
    })
    .filter((e) => e !== null);

  return (
    <Flex direction='column' gap={5} w='full' p={5} borderBottom='1px' borderColor={secondary}>
      <Link href={`/communities/${community_id}/${post.id}`}>
        <Flex alignItems='start' direction='column' gap={5} w='full'>
          <Box w='fit-content'>
            <Flex alignItems='center' gap={5}>
              <Avatar src={post.author.icon} name={post.author.name} />
              <Text fontWeight='bold'>{post.author.name}</Text>
            </Flex>
          </Box>
          <TextWithBreaks text={post.content} />
          <Text fontSize='xs'>
            {post.created_at.toLocaleDateString()} {post.created_at.toLocaleTimeString()}
          </Text>
        </Flex>
      </Link>
      <Grid gap={3} templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}>
        {mediaElements}
      </Grid>
      <Grid gap={3} templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}>
        {fileElements}
      </Grid>
      <Flex alignItems='center' justifyContent='space-between'>
        <Button
          onClick={async () => {
            if (!user) return;
            const result = await new CommunityInteractor().likePost({
              community_id: community_id,
              post_id: post.id,
              user_id: user.id,
              remove: post.likes.find((u: string) => u === user.id) !== undefined,
            });
            mutateLike();
          }}
          leftIcon={
            post.likes.find((u: string) => u === user?.id) !== undefined ? (
              <HeartIconFill boxSize='18px' />
            ) : (
              <HeartIcon boxSize='18px' />
            )
          }
          aria-label=''
          variant='ghost'
        >
          {post.likes.length}
        </Button>
        <Link href={`/communities/${community_id}/${post.id}`}>
          <Button leftIcon={<ChatIcon />} aria-label='' variant='ghost'>
            {post.repliesAmount}
          </Button>
        </Link>
        <IconButton icon={<ExternalLinkIcon boxSize='18px' />} aria-label='' variant='ghost' />
      </Flex>
    </Flex>
  );
};

export const PostForm = ({ communityId, originPost, mutate, isDisabled }: PostFormProps) => {
  const toast = useToast();
  const { user } = useContext(FirebaseAuthContext);

  const [postContent, setPostContent] = useState<string>("");
  const [postFiles, setPostFiles] = useState<File[]>([]);
  const postFileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadPost = async () => {
    if (!user) return;

    let result;
    if (originPost) {
      result = await new CommunityInteractor().reply({
        originPost: originPost,
        content: postContent,
        author: user.id,
        files: postFiles.length > 0 ? postFiles : undefined,
        communityId: communityId,
      });
    } else {
      result = await new CommunityInteractor().post({
        content: postContent,
        author: user.id,
        files: postFiles.length > 0 ? postFiles : undefined,
        communityId: communityId,
      });
    }

    if (result) {
      toast({
        title: `投稿しました`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setPostContent("");
      setPostFiles([]);
      mutate(result);
    } else {
      toast({
        title: "投稿に失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  if (isDisabled || !user) return <></>;

  return (
    <Flex direction='column' gap={3} py={3} position='sticky'>
      <Flex gap={5}>
        <Avatar src={user?.icon} name={user?.name} />
        <Textarea
          minH='unset'
          as={ResizeTextarea}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          resize='none'
        />
      </Flex>
      <Flex h={postFiles.length > 0 ? PREVIEW_SIZE : "auto"} gap={3}>
        {postFiles.map((f, index) => (
          <FilePreview
            file={f}
            key={index}
            onDelete={() => setPostFiles((current) => current.filter((_, i) => i !== index))}
          />
        ))}
      </Flex>
      <Flex alignItems='center'>
        <input
          onChange={(e) => {
            if (e.target.files === null || e.target.files.length < 1) return;
            setPostFiles((current) => Array.from(e.target.files!).concat(current));
          }}
          ref={postFileInputRef}
          style={{ display: "none" }}
          type='file'
        />
        <Button
          onClick={() => postFileInputRef.current?.click()}
          variant='ghost'
          leftIcon={<FileIcon boxSize='18px' />}
          isDisabled={postFiles.length >= 12}
        >
          ファイル追加
        </Button>
        <Button ml='auto' onClick={uploadPost}>
          投稿する
        </Button>
      </Flex>
    </Flex>
  );
};

const CommunityPage = () => {
  const communityInteractor = new CommunityInteractor();
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const cyan = useColorModeValue(theme.colors.primary[200], theme.colors.primary[100]);
  const router = useRouter();
  const toast = useToast();
  const { community_id } = router.query;

  const { user } = useContext(FirebaseAuthContext);

  const {
    data: community,
    isLoading,
    error,
    mutate,
  } = useSWR(`/communities/${community_id as string}`, () => communityInteractor.get(community_id as string));
  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: errorPosts,
    mutate: mutatePosts,
  } = useSWR(`/communities/${community_id as string}/posts`, () =>
    communityInteractor.getPosts(community_id as string)
  );
  const {
    data: likedPosts,
    isLoading: isLoadingLikedPosts,
    error: errorLikedPosts,
    mutate: mutateLikedPosts,
  } = useSWR(`/communities/${community_id as string}/liked/${user?.id}`, () =>
    communityInteractor.getLikedPosts(community_id as string, user?.id || null)
  );

  const all_members = community ? [community.owner].concat(community.admins, community.members) : [];
  const [userIcons, setUserIcons] = useState<Array<ReactNode>>([]);

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
  }, [community]);

  if (isLoading) return <LoadingPanel />;
  if (error || !community) return <ErrorPage statusCode={404} />;

  return (
    <Container maxW='container.lg'>
      <Box h={200} {...{ backgroundImage: community.banner && community.banner.url, backgroundColor: "primary.100" }}>
        {community.banner ? (
          <Image h='full' w='full' src={community.banner.url} objectFit='cover' alt='バナー画像' />
        ) : (
          <Box h='full' backgroundColor={cyan} />
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
          {all_members.find((u: string) => u === user?.id) ? (
            <Button
              onClick={async () => {
                if (user) {
                  await communityInteractor.leave(community_id as string, user.id);
                  mutate();
                }
              }}
              ml='auto'
            >
              コミュニティーを退会
            </Button>
          ) : (
            <Button
              onClick={async () => {
                if (user) {
                  await communityInteractor.join(community_id as string, user.id);
                  mutate();
                }
              }}
              ml='auto'
            >
              参加{!community.isPublic && "リクエスト"}
            </Button>
          )}
        </Flex>
      </Box>
      <PostForm
        isDisabled={!user || all_members.find((u: string) => u === user.id) === undefined}
        communityId={community_id as string}
        mutate={(result: PostData) => {
          if (posts) mutatePosts([result].concat(posts));
        }}
      />
      <Tabs align='center' defaultIndex={0}>
        <TabList>
          <Tab>投稿</Tab>
          <Tab>いいね</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            <VStack borderTop='1px' borderColor={secondary}>
              {isLoadingPosts ? (
                <Spinner />
              ) : errorPosts || !posts ? (
                <>エラー</>
              ) : (
                posts.map((p, i) => (
                  <PostCard
                    key={i}
                    post={p}
                    community_id={community_id as string}
                    mutateLike={() => {
                      if (!user) return;
                      const newPosts = posts;
                      if (p.likes.find((u: string) => u === user.id) !== undefined) {
                        newPosts[i] = { ...posts[i], ...{ likes: p.likes.filter((u: string) => u !== user.id) } };
                      } else {
                        newPosts[i] = { ...posts[i], ...{ likes: p.likes.concat(user.id) } };
                      }
                      mutatePosts(newPosts);
                    }}
                  />
                ))
              )}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack borderTop='1px' borderColor={secondary}>
              {isLoadingLikedPosts ? (
                <Spinner />
              ) : errorLikedPosts || !likedPosts ? (
                <>エラー</>
              ) : (
                likedPosts.map((p, i) => (
                  <PostCard
                    key={i}
                    post={p}
                    community_id={community_id as string}
                    mutateLike={() => {
                      if (!user) return;
                      const newPosts = likedPosts;
                      if (p.likes.find((u: string) => u === user.id) !== undefined) {
                        newPosts[i] = { ...likedPosts[i], ...{ likes: p.likes.filter((u: string) => u !== user.id) } };
                      } else {
                        newPosts[i] = { ...likedPosts[i], ...{ likes: p.likes.concat(user.id) } };
                      }
                      mutateLikedPosts(newPosts);
                    }}
                  />
                ))
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default CommunityPage;
