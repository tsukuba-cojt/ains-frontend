import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDocs, updateDoc, getDocFromCache, deleteDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const userListName = "UserTable";
const worksListName = "UserWorks";
const worksPath = "UserWorks";

const getFileExt = (file: File): string => {
  return file.name.slice(file.name.lastIndexOf("."));
};

//ファイルをアップロードする。戻り値としてファイルのIDを返す
const uploadFile = async (file: File, userId: string): Promise<string> => {
  const db = getFirestore();

  const docRef = await addDoc(collection(db, userListName), {
    authorID: userId,
    filePath: "",
    type: "image",
  });

  const imgID = docRef.id;
  const filePath = worksListName + imgID;
  await updateDoc(docRef, {
    filePath: imgID,
  });

  return imgID;
};
const getImgURL = () => {};
const UploadFile = () => {};
