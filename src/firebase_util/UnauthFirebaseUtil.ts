import { getDoc, getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDocs, updateDoc, getDocFromCache, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject, getDownloadURL, uploadBytes } from "firebase/storage";

const userListName = "UserTable";
const worksListName = "UserWorks";
const worksPath = "UserWorks";
const db = getFirestore();
const storage = getStorage();

const getFileExt = (file: File): string => {
  return file.name.slice(file.name.lastIndexOf("."));
};
const getStrExt = (str: string): string => {
  return str.slice(str.lastIndexOf("."));
};
//console.log(getStrExt("fffegrf.txt.exe"));

//ファイルをアップロードする。戻り値としてファイルのIDを返す
export const uploadFileAndGetImgID = async (file: File, userId: string): Promise<string> => {
  const docRef = await addDoc(collection(db, worksListName), {
    authorID: userId,
    name: "",
    description: "",
    filePath: "",
    type: "image",
    vc: 0,
    sc: 0,
    created_at: "",
  });

  const imgID = docRef.id;
  const filePath = worksPath + "/" + imgID + getFileExt(file);

  const storageRef = ref(storage, filePath);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file! ID:" + imgID);
  });
  await updateDoc(docRef, {
    filePath: filePath,
  });
  return imgID;
};
export const getImgURL = async (imgID: string): Promise<string> => {
  const docRef = doc(db, worksListName, imgID);
  const docSS = await getDoc(docRef);
  if (docSS.exists()) {
    const gotString = await getDownloadURL(ref(storage, docSS.data().filePath));
    return gotString;
  }
  return "";
};

export const deleteImg = async (imgID: string): Promise<void> => {
  console.log("delete " + imgID);
  const docRef = doc(db, worksListName, imgID);
  const docSS = await getDoc(docRef);
  if (docSS.exists()) {
    const imgRef = ref(storage, docSS.data().filePath);
    deleteObject(imgRef);
    deleteDoc(docRef);
    console.log("img deleted");
  } else {
    console.log("作品ID" + imgID + "は存在しません");
  }
};
