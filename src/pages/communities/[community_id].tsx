import { ChatIcon, CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Image,
  Spinner,
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
import CommunityInteractor from "@/interactors/Communities/CommunityInteractor";
import { PostData } from "@/interactors/Communities/CommunityTypes";
import UserInteractor from "@/interactors/User/UserInteractor";
import { UserData } from "@/interactors/User/UserTypes";

import { theme } from "../_app";

type UploadFileType = "image" | "video" | "audio" | "other";
interface UploadFileData {
  type: UploadFileType;
  data?: string;
  name: string;
  ext: string;
}
interface FilePreviewProps {
  file: File;
  onDelete: () => void;
}

interface PostCardProps {
  post: PostData;
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
        return <video src={fileData.data} width={PREVIEW_SIZE} height={PREVIEW_SIZE} />;
      case "audio":
        return <audio src={fileData.data} style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }} />;
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
      <PreviewIcon f={file} />
    </Flex>
  );
};

const PostCard = ({ post }: PostCardProps) => {
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  return (
    <Flex direction='column' gap={5} w='full' p={5} borderBottom='1px' borderColor={secondary}>
      <Box w='fit-content'>
        <Link href={`/users/${post.author.id}`}>
          <Flex alignItems='center' gap={5}>
            <Avatar src={post.author.icon} name={post.author.name} />
            <Text fontWeight='bold'>{post.author.name}</Text>
          </Flex>
        </Link>
      </Box>
      <TextWithBreaks text={post.content} />
      <Text fontSize='xs'>
        {post.created_at.toLocaleDateString()} {post.created_at.toLocaleTimeString()}
      </Text>
      <Flex alignItems='center' justifyContent='space-between'>
        <Button leftIcon={<HeartIcon boxSize='18px' />} aria-label='' variant='ghost'>
          {post.likes.length}
        </Button>
        <Button leftIcon={<ChatIcon />} aria-label='' variant='ghost'>
          {post.replies.length}
        </Button>
        <IconButton icon={<ExternalLinkIcon boxSize='18px' />} aria-label='' variant='ghost' />
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

  const {
    data: community,
    isLoading,
    error,
  } = useSWR(`/communities/${community_id as string}`, () => communityInteractor.get(community_id as string));
  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: errorPosts,
    mutate: mutatePosts,
  } = useSWR(`/communities/${community_id as string}/posts`, () =>
    communityInteractor.getPosts(community_id as string)
  );
  const { user } = useContext(FirebaseAuthContext);
  const postFileInputRef = useRef<HTMLInputElement | null>(null);

  const all_members = community ? [community.owner].concat(community.admins, community.members) : [];
  const [userIcons, setUserIcons] = useState<Array<ReactNode>>([]);
  const [postContent, setPostContent] = useState<string>("");
  const [postFiles, setPostFiles] = useState<File[]>([]);

  const uploadPost = async () => {
    if (!user || !community || !posts) return;
    const result = await communityInteractor.post({
      content: postContent,
      author: user.id,
      community_id: community.id,
    });

    if (result) {
      toast({
        title: `投稿しました`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      mutatePosts([result].concat(posts));
    } else {
      toast({
        title: "投稿に失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
          <Button ml='auto'>参加{!community.isPublic && "リクエスト"}</Button>
        </Flex>
      </Box>
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
          >
            ファイル追加
          </Button>
          <Button ml='auto' onClick={uploadPost}>
            投稿する
          </Button>
        </Flex>
      </Flex>
      <VStack>
        {isLoadingPosts ? (
          <Spinner />
        ) : errorPosts || !posts ? (
          <>エラー</>
        ) : (
          posts.map((p, i) => <PostCard key={i} post={p} />)
        )}
      </VStack>
    </Container>
  );
};

export default CommunityPage;
