import { Box, Button, Text, useColorMode, useColorModeValue, Input } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

import BaseInteractor from "@/interactors/BaseInteractor";

import { theme } from "./_app";

const SerchTestPage = () => {
  const auth = getAuth();
  const db = getFirestore();
  const { colorMode, toggleColorMode } = useColorMode();
  const [serchTexts, setSerchTexts] = useState("");
  const [serchTags, setSerchTags] = useState("");
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);
  const interactor = new BaseInteractor();

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
    signInWithEmailAndPassword(auth, "toktabea@gmail.com", "xp2800ch")
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
    (await interactor.fullTextSearch("bigramSerchTest", 10, serchTexts.split(/\s+/)))?.forEach((aDoc) => {
      console.log(aDoc.name);
    });
  };

  const onClickedTagsSerchButton = async () => {
    (await interactor.getWithTags("bigramSerchTest", 10, serchTags.split(/\s+/)))?.forEach((aDoc) => {
      console.log(aDoc.name);
    });
  };
  const MakeData = async () => {
    const ngramTokenize = (serchWord: string, n: number): string[] => {
      let tokens = [];
      for (let i = n; i <= serchWord.length; i++) {
        tokens.push(serchWord.slice(i - n, i));
      }
      return tokens;
    };
    let tagsMap: any = {};
    serchTags.split(/\s+/).forEach((aTag) => {
      if (aTag !== "") {
        tagsMap[aTag] = true;
      }
    });

    let bigramtokensMap: any = {};
    ngramTokenize(serchTexts, 2).forEach((aToken) => {
      bigramtokensMap[aToken] = true;
    });

    const docRef = await addDoc(collection(db, "bigramSerchTest"), {
      name: serchTexts,
      tags_map: tagsMap,
      bigramtokens_map: bigramtokensMap,
    });
  };

  const router = useRouter();

  return (
    <Box>
      <Box>
        <p>Current color mode: {colorMode}</p>
        <Button onClick={toggleColorMode}>Change color mode</Button>
      </Box>
      <Text color={secondary}>hoge</Text>
      <Box bg={secondary} w='100px' h='100px'></Box>
      <Button onClick={LoginWithEmailAndPass}>Logindayo</Button>
      <Button onClick={signoutUser}>Signoutdayo</Button>
      <Text>SerchText</Text>
      <Input onChange={(event) => setSerchTexts(event.target.value)} />
      <Text>Tags</Text>
      <Input onChange={(event) => setSerchTags(event.target.value)} />
      <Button onClick={onClickedKeywordSerchButton}>キーワード検索</Button>
      <Button onClick={onClickedTagsSerchButton}>タグ検索</Button>
      <Button onClick={MakeData}>データ作成</Button>
    </Box>
  );
};

export default SerchTestPage;
