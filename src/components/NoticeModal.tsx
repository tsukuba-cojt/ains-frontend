import { Box, CloseButton, Text, Flex, Image, VStack, Link, AspectRatio, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import React from "react";
import { useState } from "react";

import { theme } from "@/pages/_app";
import { ImageListData } from "@/types/index";

interface Props {
  image_data: ImageListData;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  contents: string;
  author: {
    id: string;
    name: string;
  };
  icon_url: string;
}

const NoticeModal = (props: Props) => {
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  return (
    <Box overflowY='auto' overflowX='hidden' position='fixed' top='50px' right='0px' h='calc(100vh - 50px)' bg='green'>
      <AnimatePresence>
        {props.isOpen && isMessageOpen == false && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.0, duration: 0.2 },
            }}
          >
            <motion.div animate='open' exit='closed'>
              <>
                <CloseButton onClick={() => props.onClose()} />
                <VStack>
                  <Flex w='full' bg='black' p='4' alignItems='center' gap={5}>
                    <Link w='30%' as={NextLink} href={`/artworks/c7805656-6516-4df2-842b-1ac19ef888e2`}>
                      <AspectRatio w='100%' ratio={1}>
                        <video
                          boxSize='100%'
                          src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F2a080d31-56a3-43e0-ab3b-383a592a8913.mp4?alt=media&token=6ed02a2d-73c1-41c8-a1af-b893b89a3c63'
                        />
                      </AspectRatio>
                    </Link>
                    <Box>
                      <Text flex={1} fontSize='md'>
                        OOにいいね,コメントされました
                      </Text>
                    </Box>
                  </Flex>

                  <Flex w='full' bg='black' p='4' wrap='wrap' alignItems='center' gap={5}>
                    <Link w='30%' as={NextLink} href={`/artworks/511f1517-47de-4b15-aa3a-c1c6b1d7cda9`}>
                      <AspectRatio w='100%' ratio={1}>
                        <Image
                          boxSize='100%'
                          src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F1e0a3fee-7758-4bad-a69f-9da104841d47.jpg?alt=media&token=da876fed-c46f-4c53-8db2-a829c8c2371b'
                        />
                      </AspectRatio>
                    </Link>
                    <Box flex={1}>
                      <Text fontSize='md'>
                        OOが保存されましたaaaaaaaaaaaaaaaaaaaaaaaaaabbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaamnbvaaaaaa
                      </Text>
                    </Box>
                  </Flex>
                  <Box bg='black' p='4'>
                    <Link w='300px' as={NextLink} href={`/artworks/511f1517-47de-4b15-aa3a-c1c6b1d7cda9`}>
                      <AspectRatio w='100%' ratio={1}>
                        <Image
                          boxSize='100%'
                          src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F1e0a3fee-7758-4bad-a69f-9da104841d47.jpg?alt=media&token=da876fed-c46f-4c53-8db2-a829c8c2371b'
                        />
                      </AspectRatio>
                    </Link>
                    <Text fontSize='md'>
                      ←の参考アップロードがされました(参考元と参考先のどの画像を使用するか？)lkjhgfdfghjklkiujytrfrtyuiuytrewazxcghjikmnhgfdertg
                    </Text>
                  </Box>
                  <Box bg='black' p='4'>
                    <Flex>
                      <Text fontSize='md'> user1,user2にフォローされました</Text>
                    </Flex>
                  </Box>
                  <Box bg='black' p='4'>
                    <VStack alignItems='left'>
                      <Text fontSize='md'> user3にフォローされました</Text>
                      <Flex>
                        <Image borderRadius='full' boxSize='30px' src='https://bit.ly/dan-abramov' alt='User Icon' />
                      </Flex>
                    </VStack>
                  </Box>
                  <Box bg='black'>
                    <Text fontSize='xl'>アップデートのお知らせ</Text>
                    <Text fontSize='md'>
                      「相対性理論」と名づけられる理論が倚りかかっている大黒柱はいわゆる相対性原理［＃「相対性原理」は底本では「相対性理論］です。
                      私はまず相対性原理とは何であるかを明らかにしておこうと思います。私たちは二人の物理学者を考えてみましょう。
                      この二人の物理学者はどんな物理器械をも用意しています。そして各々一つの実験室をもっています。一人の物理学者の実験室はどこか普通の場所にあるとし、もう一人の実験室は一定の方向に一様な速さで動く汽車の箱のなかにあるとします。
                      相対性原理は次のことを主張するのです。
                      もしこの二人の物理学者が彼等のすべての器械を用いて、一人は静止せる実験室のなかで、もう一人は汽車のなかで、すべての自然法則を研究するならば、汽車が動揺せずに一様に走る限り、彼等は全く同じ自然法則を見出すでありましょう。幾らか抽象的にこう云うことも出来ます。
                      自然法則は相対性原理によれば基準体系の併移運動に関しません。
                      私達は今この相対性原理が旧来の力学でどんな役目をもっていたかをみましょう。
                      旧来の力学は第一にガリレイの原理の上に安坐しています。この原理に従えば、ある物体は他の物体の作用を受けない限り、直線的な一様な運動にあります。
                      もしこの法則が上に云うた実験室の一方に対して成り立つ［＃「成り立つ」は底本では「成リ立つ」］ならば、それはまた第二に対しても成り立ちます。
                      私達はそのことを直接に直観から取り出すことが出来ます。
                      私達はそれをしかしまたニウトン力学の方程式からも引き出すことが出来るのです。
                      私達はその方程式をもとの基準体系に対して一様に動いているものへ転換させればよいのです。
                    </Text>
                  </Box>
                </VStack>
              </>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default NoticeModal;
