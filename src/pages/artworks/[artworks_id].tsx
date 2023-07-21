import {
  Container,
  Tag,
  HStack,
  VStack,
  Box,
  Flex,
  Image,
  Heading,
  Text,
  useColorModeValue,
  Spacer,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

import CommentBox from "@/components/CommentBox";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/types/api/artwork";

import { theme } from "../_app";

const ArtworkDetailPage = () => {
  const router = useRouter();
  const { artworks_id } = router.query;

  const [doesExpandDescription, setDoesExpandDescription] = useState<boolean>(false);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const getArtworksData = async (): Promise<ArtworkData | null> => {
    const interactor = new ArtworkInteractor();

    if (typeof artworks_id === typeof "string") {
      const artworkData: ArtworkData | null = await interactor.get(artworks_id as string);
      if (artworkData) {
        console.log(artworkData);
        return artworkData;
      }
    }
    console.log(`${artworks_id}を取得できませんでした`);
    return null;
  };
  const { data: artworks, error, isLoading } = useSWR(`/artworks/${artworks_id as string}`, getArtworksData);
  if (artworks) {
    console.log("いやぁぁっぁ");
    console.log(artworks);
  }

  if (error || artworks === null) return <>Error!</>;
  if (isLoading || artworks === undefined) return <>Loading!</>;

  return (
    <Container maxW='container.lg' p={5}>
      <Flex justify='center' direction={{ base: "column", md: "row" }} gap={10}>
        <VStack>
          <Image maxH='80vh' maxW='40vw' src={`/${artworks_id}`} alt='tmp string' />
          <Spacer />
        </VStack>
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
            <Image boxSize='2.5rem' src='https://bit.ly/dan-abramov' rounded='full' alt='user icon' />
            <Text>Dan Abramov</Text>
          </Flex>
          <HStack>
            <Tag>hoge</Tag>
            <Tag>fuga</Tag>
            <Tag>piyo</Tag>
          </HStack>
          <Button>参考アップロード</Button>
          <Box p={3} rounded='md' bg={secondary}>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      コメント
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                  <CommentBox icon_url='https://bit.ly/dan-abramov' username='andrew' text='Good!\nI like this!!' />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Flex>
      </Flex>
      <Text>
        ［＃１字下げ］叢書序［＃「叢書序」は中見出し］
        　本叢書は洽ねく大家の手に成るもの、或は青年の必讀書として世に傳はるものゝ中より、其内容文章共に英文の至珍とすべく、特に我青年諸氏に利益と快樂とを與ふるものを撰拔せり。
        　英語を學ぶに當り、文法字義を明かにし、所謂難句集に見る如き短文を攻究するの要あるは云ふまでもなしと雖も、亦可成多く一篇を成せる名家の著を讀み、英文に對する趣味を養ひ、不知不識其の豐富なる語類成句に習熟することを怠るべからず。前者は專ら學課として教師の指導に待つべきも、後者は學生諸子自ら講學の餘暇を利用して之を心掛くべきなり。著者等は親しく學生諸子に接し、教場以外獨習の助けとなるべきものゝ要求を知れり、是れ本叢書刊行の企ある所以にして、其冊子の小なるも諸子が携帶の便を計りたればなり。
        　直譯なるもの及び之れと密接の關係ある不完全なる和譯英字書の譯語を其儘に用うるの弊害世に知られて、英學界の呪詛となりたれども、單に代名詞、助動詞等の譯し振りを變じたるのみにして、種々の事情より此弊未だ一掃せられず、此形式的譯法は原文の意義を發揮するに於て甚だ不完全のみならず、諸子一度此習癖に染まば修學上の害測り知るべからざるものあらん。又之れと全く反對の自由なる意譯法は、單に譯文として見る時は兎に角、諸子が修學の助けとして遺憾甚だ多し。著者等は原文の成句成文を單位として其意義を十分に譯出し、邦語の語法の許す限りは原文の一語をも忽かせにせざらんことを努め、且つ譯文中に屡々原文を※［＃「插」でつくりの縦棒が下に突き抜けている、第4水準2-13-28］入して譯文との關係を示し、又其※［＃「插」でつくりの縦棒が下に突き抜けている、第4水準2-13-28］入の原文は直ちに和文英譯の參考たらんことに意を用ゐたり。盖し是れ至難の業、茲には著者等の意のある所を一言し、如何に之れに成功したるかは諸子の判斷に委せんとす。
        　最後に諸子の注意を促さんに、原文と譯文とを對照して其意義を解したるのみに放擲せば、諸子の惱中に留まるは恐らく譯文にして原文にあらざらん、是れ英文を讀むと稱するも其實邦文を讀みたるものなり。著者等は諸子に切言す、相對照して其意義を明かにしたる後更に原文のみを數回音讀して其印象を得られんことを、且つ譯文によりて和文英譯を試みられなば頗る有益の練習となり、著者等が此微々たる盡力を最大に利益に應用するものと云ふべし。
        ［＃地から１字上げ］譯註者識 　　　　　　　　—————— 　　　　　　　　　　注意
        　譯解の都合上原書の一パラグラフを幾段にも分つの必要を生ぜり、但し段落の初行を一字劃右に寄せたるが原書に於けるパラグラフの始めと知るべし。
        ［＃改丁］ ［＃５字下げ］本篇緒言［＃「本篇緒言」は中見出し］
        　譯者は本叢書第六篇『無人島日記』の緒言に於て、『ロビンソン、クルーソー漂流記』は冐險的、商業的、實際的なるアングロサキソンの特性を具體にしたるものなることを云へり。然れども是等の特色は未だ以て偉大なる國民を形成するに足らず、更に個人の品性を堅實にし、國民の理想を高遠ならしむる、道徳的、靈性的勢力の大なるものあるを要す。譯者は茲に本篇『アーサー王物語』に於て、アングロサキソン人種をして眞に偉大なる國民たらしめたる、更に重要にして根本的なる其性格理想の幾分を諸子に紹介するの機を得たるを悦ぶ。
        　アーサー王圓卓士の物語は、五世紀の半ばより數世紀に亘れる、ブリトン、アングロサキソン、兩人種が苦鬪中の事蹟に起原し、十二世紀の半ば頃初めてヂヨフレー、オブ、マンマスの『ブリトン王列傳』中に記されたるもの正確なる歴史的考證を欠くと雖も、不思議にも、アングロサキソン人種の武士道的理想は此漠然たるケルティツク王の口碑を藉りて表現し、アーサー王物語は、恰も彼の煙の如き星雲が幾百千年の時を經て次第に爛然たる星宿となるが如く、屡々詩となり文となり、マローリーの散文（Morte
        Arthur）に映じ、スペンサーの詩（Faerie
        Queene）に輝き、將さにミルトンのエピツク（epic）とならんとして果さず、終に十九世紀の大詩人テニソン卿の靈筆によりて
        The Idylls of the King となり、文學界の不滅なる明星として天下の人其光芒を仰ぐに至れり。
        　本篇は、『十九世紀の理想を以て詠じたる武士道詩』と稱せらるる此 The Idylls of the King
        の梗概の一部也。紙數限りありて其全體を對譯する能はざるを憾みとすれども、本篇の收むる所亦自ら一の物語を成せり。以て英國武士道の一班を窺ふを得べく且つ諸子が後日テニソンの原作を閲讀するの手引となすに足らん。
        ［＃地から３字上げ］譯註者識
      </Text>
    </Container>
  );
};

export default ArtworkDetailPage;
