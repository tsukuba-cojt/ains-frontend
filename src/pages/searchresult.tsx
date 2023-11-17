import { Box, Button, Text, useColorMode, useColorModeValue, Input } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

import GridArtworks from "@/components/GridArtworks";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import BaseInteractor from "@/interactors/BaseInteractor";

import { theme } from "./_app";
import { nOrLessGramTokenize } from "../plugins/Utility/NGramTokenizer";

const SearchResultPage = () => {
  //const collectionName = "norlessgramSerchTest";
  const collectionName = "artworks";

  const auth = getAuth();
  const db = getFirestore();
  const { colorMode, toggleColorMode } = useColorMode();
  const [serchTexts, setSerchTexts] = useState("");
  const [serchTags, setSerchTags] = useState("");
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const interactor = new BaseInteractor();

  const searchParams = useSearchParams();
  const getKeyword = searchParams.get("keywords");
  const searchKeyWords = getKeyword ? getKeyword : "";
  const getTags = searchParams.get("tags");
  const searchTags = getTags ? getTags : "";

  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR(`/artworks/search?keywords=${searchKeyWords}&tags=${searchTags}`, () =>
    new ArtworkInteractor().fullTextSearch(100, searchKeyWords.split(/\s+/))
  );

  const signoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("サインアウトしたよ~");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const LoginWithEmailAndPass = () => {
    signInWithEmailAndPassword(auth, "tokatabea@gmail.com", "xp2800ch")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("ログインしたよ");
        console.log(user.displayName + "/" + user.email + "/" + user.uid + "/" + user.getIdToken());
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const onClickedKeywordSerchButton = async () => {
    (await interactor.fullTextSearch(collectionName, 10, serchTexts.split(/\s+/)))?.forEach((aDoc) => {
      console.log(aDoc.name);
      //console.log(aDoc);
    });
  };

  const onClickedTagsSerchButton = async () => {
    (await interactor.getWithTags(collectionName, 10, serchTags.split(/\s+/)))?.forEach((aDoc) => {
      console.log(aDoc.name);
      //console.log(aDoc);
    });
  };
  const MakeData = async () => {
    let tagsMap: any = {};
    serchTags.split(/\s+/).forEach((aTag) => {
      if (aTag !== "") {
        tagsMap[aTag] = true;
      }
    });

    let bigramtokensMap: any = {};
    nOrLessGramTokenize(serchTexts, 2).forEach((aToken) => {
      bigramtokensMap[aToken] = true;
    });

    const docRef = await addDoc(collection(db, collectionName), {
      name: serchTexts,
      tags_map: tagsMap,
      bigramtokens_map: bigramtokensMap,
    });
  };

  const router = useRouter();

  let artworksBox: JSX.Element = <>Error!</>;
  if (error || artworks === null) {
    artworksBox = <>Error!</>;
  } else if (isLoading || artworks === undefined) {
    artworksBox = <>検索しています!</>;
  } else {
    artworksBox = <GridArtworks artworks={artworks} />;
  }

  return (
    <Box>
      <Box>
        <p>Current color mode: {colorMode}</p>
        <Button onClick={toggleColorMode}>Change color mode</Button>
      </Box>
      <Text color={secondary}>hoge</Text>
      <Button onClick={LoginWithEmailAndPass}>Logindayo</Button>
      <Button onClick={signoutUser}>Signoutdayo</Button>
      <Text>SerchText</Text>
      <Input onChange={(event) => setSerchTexts(event.target.value)} />
      <Text>Tags</Text>
      <Input onChange={(event) => setSerchTags(event.target.value)} />
      <Button onClick={onClickedKeywordSerchButton}>キーワード検索</Button>
      <Button onClick={onClickedTagsSerchButton}>タグ検索</Button>
      <Button onClick={MakeData}>データ作成</Button>
      {artworksBox}
    </Box>
  );
};

export default SearchResultPage;
