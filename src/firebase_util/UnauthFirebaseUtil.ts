import { getDoc, getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDocs, updateDoc, getDocFromCache, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject, getDownloadURL, uploadBytes } from "firebase/storage";

const usersListName = "UserTable";
const worksListName = "UserWorks";
const worksDirPath = "UserWorks";
const db = getFirestore();
const storage = getStorage();

const getFileExt = (file: File): string => {
  return file.name.slice(file.name.lastIndexOf("."));
};
const getStrExt = (str: string): string => {
  return str.slice(str.lastIndexOf("."));
};

export const getAllWorksID = async (): Promise<Array<string>> => {
  const querySnapshot = await getDocs(collection(db, worksListName));
  let IDList: Array<string> = [];
  querySnapshot.forEach((doc) => IDList.push(doc.id));
  return IDList;
};

//IDに対応する作品のデータ(authorID,name,description,type,vc,sc,created_at)を返す
export const getDatas = async (worksID: string): Promise<Object> => {
  const docRef = doc(db, worksListName, worksID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    //worksIDに対応する作品がデータベース上にない場合
    console.log("作品ID" + worksID + "は存在しません");
    return {};
  }
};

//ファイルをアップロードする。返り値として作品のIDを返す
export const uploadFileAndGetWorksID = async (file: File, userId: string): Promise<string> => {
  const docRef = await addDoc(collection(db, worksListName), {
    authorID: userId,
    name: "作品1",
    description: "",
    filePath: "",
    type: "image",
    vc: 0,
    sc: 0,
    created_at: "",
  });

  //ここでdocumentに割り当てられたIDを作品のIDとする
  const worksID = docRef.id;
  //ファイル名が重複しないようファイル名にIDを使う。
  const filePath = worksDirPath + "/" + worksID + getFileExt(file);

  const storageRef = ref(storage, filePath);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file! ID:" + worksID);
  });
  await updateDoc(docRef, {
    filePath: filePath,
  });
  return worksID;
};

//worksIDに対応する作品のurlを返す
export const getWorksURL = async (worksID: string): Promise<string> => {
  const docRef = doc(db, worksListName, worksID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const gotString = await getDownloadURL(ref(storage, docSnap.data().filePath));
    return gotString;
  }
  //worksIDに対応する作品がデータベース上にない場合
  console.log("作品ID" + worksID + "は存在しません");
  return "";
};

//worksIDに対応する作品をデータベース及びストレージから削除する
export const deleteImg = async (worksID: string): Promise<void> => {
  console.log("delete " + worksID);
  const docRef = doc(db, worksListName, worksID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const imgRef = ref(storage, docSnap.data().filePath);
    deleteObject(imgRef);
    deleteDoc(docRef);
    console.log(worksID + " deleted");
  } else {
    //worksIDに対応する作品がデータベース上にない場合
    console.log("作品ID" + worksID + "は存在しません");
  }
};
