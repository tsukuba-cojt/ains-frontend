import { Box, Button, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import useSWR from "swr";

import GridArtworks from "@/components/GridArtworks";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import BaseInteractor from "@/interactors/BaseInteractor";

import { theme } from "./_app";

const SearchResultPage = () => {
  //const collectionName = "norlessgramSerchTest";
  const collectionName = "artworks";

  const auth = getAuth();
  const db = getFirestore();
  const { colorMode, toggleColorMode } = useColorMode();

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
    searchKeyWords !== ""
      ? new ArtworkInteractor().fullTextSearch(100, searchKeyWords.split(/\s+/))
      : searchTags !== ""
      ? new ArtworkInteractor().getWithTags(100, searchTags.split(/\s+/))
      : new ArtworkInteractor().getLatests(100)
  );
  console.log(`serach result:${artworks}`);

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

  const router = useRouter();

  let artworksBox: JSX.Element = <>Error!</>;
  if (error || artworks === null) {
    artworksBox = <>Errorだよ〜</>;
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
      {artworksBox}
    </Box>
  );
};

export default SearchResultPage;
