import {
  Avatar,
  AvatarGroup,
  Box,
  CloseButton,
  Text,
  Flex,
  Image,
  VStack,
  HStack,
  Link,
  AspectRatio,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import React, { ReactNode } from "react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
interface ItemData {
  item_link: string;
  item_src: string;
  item_string: string;
  user_src: string[];
  user_name: string;
  user_number: number;
  update_text: string;
  update_title: string;
  item_type: string;
}

const ComNotice = (itemData: ItemData) => {
  switch (itemData.item_type) {
    case "image": {
      return (
        <HStack w='full' bg='black' p='4' wrap='wrap' alignItems='center' gap={5}>
          <Link w='30%' as={NextLink} href={itemData.item_link}>
            <AspectRatio w='100%' ratio={1}>
              <Image boxSize='100%' src={itemData.item_src} />
            </AspectRatio>
          </Link>
          <Box flex={1} w='70%' overflowY='auto'>
            <Text fontSize='md'>{itemData.item_string}</Text>
          </Box>
        </HStack>
      );
    }
    case "text": {
      return (
        <HStack w='full' bg='black' p='4' wrap='wrap' alignItems='center' gap={5}>
          <Link w='30%' as={NextLink} href={itemData.item_link}>
            <AspectRatio w='100%' ratio={1}>
              <Image boxSize='100%' src={itemData.item_src} />
            </AspectRatio>
          </Link>
          <Box flex={1} w='70%' overflowY='auto'>
            <Text fontSize='md'>{itemData.item_string}</Text>
          </Box>
        </HStack>
      );
    }
    case "audio": {
      return (
        <HStack w='full' bg='black' p='4' wrap='wrap' alignItems='center' gap={5}>
          <Link w='30%' as={NextLink} href={itemData.item_link}>
            <AspectRatio w='100%' ratio={1}>
              <Image boxSize='100%' src={itemData.item_src} />
            </AspectRatio>
          </Link>
          <Box flex={1} w='70%' overflowY='auto'>
            <Text fontSize='md'>{itemData.item_string}</Text>
          </Box>
        </HStack>
      );
    }
    case "video": {
      return (
        <HStack w='full' bg='black' p='4' wrap='wrap' alignItems='center' gap={5}>
          <Link w='30%' as={NextLink} href={itemData.item_link}>
            <AspectRatio w='100%' ratio={1}>
              <video boxSize='100%' src={itemData.item_src} />
            </AspectRatio>
          </Link>
          <Box flex={1} w='70%' overflowY='auto'>
            <Text fontSize='md'>{itemData.item_string}</Text>
          </Box>
        </HStack>
      );
    }
    case "user-follw": {
      const avatarDisplay = (numbers: number): ReactNode => {
        return Array.from({ length: numbers }).map((n, i) => (
          <Avatar name={itemData.user_name} src={itemData.user_src[i]} />
        ));
      };
      return (
        <Box w='full' bg='black' p='4' wrap='wrap' alignItems='center' gap={5}>
          <VStack alignItems='left'>
            <Text fontSize='md'> {itemData.user_name}にフォローされました</Text>
            <Flex>
              <AvatarGroup max={6}>{avatarDisplay(itemData.user_number)}</AvatarGroup>
            </Flex>
          </VStack>
        </Box>
      );
    }
    case "notify": {
      return (
        <Box w='full' bg='black' p='4' wrap='wrap' alignItems='center' gap={5}>
          <Text fontSize='xl'>{itemData.update_title}</Text>
          <Text fontSize='md'>{itemData.update_text}</Text>
        </Box>
      );
    }
    default: {
      <HStack w='full' bg='black' p='4' wrap='wrap' alignItems='center' gap={5}>
        <Box flex={1} w='70%' overflowY='auto'>
          <Text fontSize='md'>switchのtypeとかのエラー!!!!!!!!</Text>
        </Box>
      </HStack>;
      break;
    }
  }
};

const NoticeModal = (props: Props) => {
  const [isNoticeOpen, setIsNoticeOpen] = useState<boolean>(false);

  return (
    <Box
      overflowY='auto'
      overflowX='hidden'
      position='fixed'
      top='50px'
      right='0px'
      h='calc(100vh - 50px)'
      bg='blue.300'
    >
      <AnimatePresence>
        {props.isOpen && isNoticeOpen == false && (
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
                  <ComNotice
                    item_link='/artworks/c7805656-6516-4df2-842b-1ac19ef888e2'
                    item_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F2a080d31-56a3-43e0-ab3b-383a592a8913.mp4?alt=media&token=6ed02a2d-73c1-41c8-a1af-b893b89a3c63'
                    item_string='雲の背景にいいね,コメントされました'
                    item_type='video'
                  />
                  <ComNotice
                    item_link='/artworks/be82cadd-6139-4e95-b0b6-758be0ac0a46'
                    item_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2Ff524dc8c-a675-41b0-8c9d-227ce812a13b.jpg?alt=media&token=65a5db82-b829-4413-8798-9f6b51408e3a'
                    item_string='長文1が保存されました'
                    item_type='text'
                  />

                  <ComNotice
                    item_link='/artworks/74b3ab5a-225c-4f5c-98f1-a28ad1a99fc7'
                    item_src='https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F1e0a3fee-7758-4bad-a69f-9da104841d47.jpg?alt=media&token=da876fed-c46f-4c53-8db2-a829c8c2371b'
                    item_string='参考アップロードがされました'
                    item_type='image'
                  />

                  <ComNotice
                    user_name='ワニ'
                    user_src={[
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F69aba3b2-9645-4c3c-9765-95b44a2a8a1e.jpg?alt=media&token=eaa52a3c-f679-41e1-8ea5-0a743ff4d023",
                    ]}
                    user_number={1}
                    item_type='user-follw'
                  />

                  <ComNotice
                    user_name='ワニ,sakana'
                    user_src={[
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F69aba3b2-9645-4c3c-9765-95b44a2a8a1e.jpg?alt=media&token=eaa52a3c-f679-41e1-8ea5-0a743ff4d023",
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F06fc35c6-70df-4897-b590-0e0c7bda5ceb.jpg?alt=media&token=ac1073ce-4788-4be9-b2f1-8adfcdc1c64f",
                    ]}
                    user_number={2}
                    item_type='user-follw'
                  />

                  <ComNotice
                    user_name='ワニ,sakana,コリオリ,キング,ネズミ,ワニ2,眼鏡眼鏡'
                    user_src={[
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F69aba3b2-9645-4c3c-9765-95b44a2a8a1e.jpg?alt=media&token=eaa52a3c-f679-41e1-8ea5-0a743ff4d023",
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F06fc35c6-70df-4897-b590-0e0c7bda5ceb.jpg?alt=media&token=ac1073ce-4788-4be9-b2f1-8adfcdc1c64f",
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F6ea23b9f-0daf-44ed-971a-4e7b8df9d143.JPG?alt=media&token=67681797-ab5e-49f1-915d-822fe06ccbf0",
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2Ff524dc8c-a675-41b0-8c9d-227ce812a13b.jpg?alt=media&token=65a5db82-b829-4413-8798-9f6b51408e3a",
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F9322477a-0362-4e21-bdd7-2a204c03367d.jpg?alt=media&token=ca378ce0-79e2-4587-b4ad-d5f0c8c53059",
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F336d621d-0384-4767-a0ec-70fee05b15f1.jpg?alt=media&token=d053633d-6175-41de-aa1f-cfccc06aa279",
                      "https://firebasestorage.googleapis.com/v0/b/ains-backend.appspot.com/o/files%2F7539ab81-72cf-41f2-b9a4-6da0ffdcd05a.png?alt=media&token=8994a24e-b0c3-4993-a2dc-7feb90206c07",
                    ]}
                    user_number={7}
                    item_type='user-follw'
                  />

                  <ComNotice
                    update_title='アップデートのお知らせ'
                    update_text='「相対性理論」と名づけられる理論が倚りかかっている大黒柱はいわゆる相対性原理［＃「相対性原理」は底本では「相対性理論］です。
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
                      私達はその方程式をもとの基準体系に対して一様に動いているものへ転換させればよいのです。'
                    item_type='notify'
                  />
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
