import { Box, Button, Text, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";

import { FilterArg } from "@/interactors/BaseInteractor";
import BaseInteractor from "@/interactors/BaseInteractor";
import DMInteractor from "@/interactors/DM/DMInteractor";
import { DMCreateData, DMMessageCreateData } from "@/interactors/DM/DMTypes";

import { theme } from "./_app";

const FirebaseTestPage = () => {
  const auth = getAuth();
  const db = getFirestore();
  const { colorMode, toggleColorMode } = useColorMode();
  const [count, setCount] = useState<number>(0);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const hoge_func = async () => {
    console.log("nnnnnnnnn");
    const interactor = new BaseInteractor();
    const dminteractor = new DMInteractor();
    //console.log(await interactor.get("o8S50pCLAIcpOtl6cGtj"));
    //const fddd: FilterArg = { key: "tags", operator: "array-contains", value: "temple" };
    //console.log(await interactor.FilterAnd("artworks", [fddd]));
    const fddd: FilterArg = { key: "member_ids", operator: "array-contains", value: "fKlgkoss0nNWYamOJkMuLxOWGEW2" };
    //console.log(await interactor.FilterAnd("DMs", [fddd]));
    console.log(await dminteractor.getWithMemberID_DM("fKlgkoss0nNWYamOJkMuLxOWGEW2"));
    console.log(await interactor.getSubCollections("DMs", ["o8S50pCLAIcpOtl6cGtj", "Comments"], 100));
  };

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

  const addDM = async (): Promise<void> => {
    const interactor: DMInteractor = new DMInteractor();
    const createData: DMCreateData = { name: "DMだよ!", member_ids: [] };
    await interactor.set_DM(createData);
    console.log("つくったよ");
  };
  const addDMMessage = async (): Promise<void> => {
    const interactor: DMInteractor = new DMInteractor();
    const createData: DMMessageCreateData = {
      sender_id: "fKlgkoss0nNWYamOJkMuLxOWGEW2",
      content: "よろしくお願いします",
    };
    await interactor.set_DMMessage("d753e91f-7afb-4da1-8547-09d8e6d67d23", createData);
    console.log("おくったよ");
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
      <Button onClick={hoge_func}>hoge</Button>
      <Button onClick={showIsVerificated}>showVerificated</Button>
      <Button onClick={emailVerification}>verificationdayo</Button>
      <Button onClick={LoginWithEmailAndPass}>Logindayo</Button>
      <Button onClick={signoutUser}>signoutDayo</Button>
      <Button onClick={addDM}>addDM</Button>
      <Button onClick={addDMMessage}>addMessage</Button>

      <Button onClick={deleteData}>deleteData</Button>
      <Button onClick={getData}>GetData</Button>
      <Button onClick={updateData}>UpdateData</Button>
      <input name='file' type='file' accept='image/*' onChange={onChangeFile} />
      <Button onClick={submitFile}>送信</Button>
    </Box>
  );
};

export default FirebaseTestPage;
