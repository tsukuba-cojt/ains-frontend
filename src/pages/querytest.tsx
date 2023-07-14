import { Box, Button, Text, Flex, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";

import { theme } from "./_app";
import BaseInteractor from "../interactors/BaseInteractor";

const QueryTestPage = () => {
  const auth = getAuth();
  const db = getFirestore();
  const { colorMode, toggleColorMode } = useColorMode();
  const [count, setCount] = useState<number>(0);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const signoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("サインアウトしたよ~");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const LoginUnverifyUser = () => {
    signInWithEmailAndPassword(auth, "mininsyou@gmail.com", "mininsyoudesu")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("mininsyou@gmail.comでログインしたよ");
        console.log(auth.currentUser?.emailVerified);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const LoginVerifyUser = () => {
    signInWithEmailAndPassword(auth, "tokatabea@gmail.com", "qawsedrftgyhujikolp")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("tokatabea@gmail.comでログインしたよ");
        console.log(auth.currentUser?.emailVerified);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const queryTest1 = async (): Promise<void> => {
    const interacter: BaseInteractor = new BaseInteractor();
    console.log(await interacter.getLatests("UserWorks", 10));
  };

  const addData = async (): Promise<void> => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const getData = async (): Promise<void> => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  };
  const updateData = async (): Promise<void> => {
    const docRef = doc(db, "users", "bvJup5fhaPXLPgJlduhr");
    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      bornDif: true,
    });
  };

  const deleteData = async (): Promise<void> => {
    await deleteDoc(doc(db, "users", "bvJup5fhaPXLPgJlduhr"));
    console.log("DataDeleted");
  };

  const uploadPicture = async (): Promise<void> => {
    // Create a root reference
    const storage = getStorage();

    // Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = ref(storage, "images/mountains.jpg");

    const metadata = {
      contentType: "image/jpeg",
    };
  };

  const getImgURL = async (): Promise<void> => {
    const storage = getStorage();
    getDownloadURL(ref(storage, "bib.jpg")).then((url) => {
      console.log(url);
      const img = document.getElementById("myimg");
      if (img) {
        img.setAttribute("src", url);
      }
    });
  };
  const [file, setFile] = useState<File | null>(null);
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const submitFile = () => {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    } else {
      console.log("file is not selected");
    }
  };

  const emailVerification = () => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser).then(() => {
        console.log("uwaaaaa");
      });
    }
  };
  const showIsVerificated = () => {
    if (auth.currentUser) {
      console.log(auth.currentUser.emailVerified);
    }
  };

  const router = useRouter();
  const goToRoot = () => {
    if (auth.currentUser) {
      console.log(auth.currentUser.emailVerified);
      router.push("/");
    }
  };

  return (
    <Box>
      <Box>
        <p>Current color mode: {colorMode}</p>
        <Button onClick={toggleColorMode}>Change color mode</Button>
      </Box>
      <Text color={secondary}>hoge</Text>
      <Box bg={secondary} w='100px' h='100px'></Box>
      <Box bg={secondary} w='100px' h='100px'>
        <Image id='myimg' src='' alt='代替テキスト' />
      </Box>
      <Button>hoge</Button>
      <Button onClick={LoginUnverifyUser}>unverifyUser</Button>
      <Button onClick={LoginVerifyUser}>verifyUser</Button>
      <Button onClick={signoutUser}>signoutDayo</Button>
      <Button onClick={queryTest1}>queryTest</Button>
      <Button onClick={addData}>addData</Button>
      <Button onClick={deleteData}>deleteData</Button>
      <Button onClick={getData}>GetData</Button>
      <Button onClick={updateData}>UpdateData</Button>
      <Button onClick={getImgURL}>getImgURL</Button>
      <Button onClick={goToRoot}>GoToRoot</Button>
      <input name='file' type='file' accept='image/*' onChange={onChangeFile} />
      <Button onClick={submitFile}>送信</Button>
      <Flex align='center' gap={2}>
        <Button colorScheme='blue' onClick={addData}>
          sub
        </Button>
        <p>{count}</p>
        <Button colorScheme='red' onClick={addData}>
          add
        </Button>
      </Flex>
    </Box>
  );
};

export default QueryTestPage;
