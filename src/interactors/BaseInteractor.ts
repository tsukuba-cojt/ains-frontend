import {
  Firestore,
  getFirestore,
  getDoc,
  doc,
  DocumentData,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  query,
  WhereFilterOp,
  collection,
  QueryFieldFilterConstraint,
  getDocs,
  DocumentSnapshot,
  or,
  serverTimestamp,
  Query,
  QueryConstraint,
} from "firebase/firestore";
import { orderBy, limit, startAt } from "firebase/firestore";
import { FirebaseStorage, getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { nOrLessGramTokenize } from "../plugins/Utility/NGramTokenizer";

export interface FilterArg {
  key: string;
  value: string | number;
  operator: WhereFilterOp;
}

export default class BaseInteractor {
  readonly db: Firestore;
  readonly storage: FirebaseStorage;

  constructor() {
    this.db = getFirestore();
    this.storage = getStorage();
  }

  uuidv4(): string {
    return uuidv4();
  }

  async get(collection_name: string, doc_id: string): Promise<DocumentData | null> {
    let snapshot;
    try {
      const ref = doc(this.db, collection_name, doc_id);

      const cacheKey = `get/${collection_name}/${doc_id}`;
      const cache = window.sessionStorage.getItem(cacheKey);
      if (cache) {
        console.log(cacheKey, cache);
        return JSON.parse(cache);
      }

      snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const result = Object.assign(snapshot.data(), { id: snapshot.id });
        window.sessionStorage.setItem(cacheKey, JSON.stringify(result));
        return result;
      } else {
        return null;
      }
    } catch (_err) {
      return null;
    }
  }

  async getSubCollections(collection_name: string, ...sub_path: string[]): Promise<Array<DocumentData> | null> {
    try {
      const collectionRef = collection(this.db, collection_name, ...sub_path);
      const q = query(collectionRef, orderBy("created_at", "desc"));

      const cacheKey = `getSub/${collection_name}/${sub_path.join("/")}`;
      const cache = window.sessionStorage.getItem(cacheKey);
      if (cache) {
        console.log(cacheKey, cache);
        return JSON.parse(cache);
      }

      const snapshot = await getDocs(q);
      const res_data: Array<DocumentData> = [];
      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        res_data.push(Object.assign(doc.data(), { id: doc.id }));
      });
      window.sessionStorage.setItem(cacheKey, JSON.stringify(res_data));
      return res_data;
    } catch (_err) {
      return null;
    }
  }

  async getLatests(
    collection_name: string,
    limitNum: number,
    startId: string | null = null
  ): Promise<Array<DocumentData> | null> {
    try {
      const collectionRef = collection(this.db, collection_name);
      const queryConstraints: QueryConstraint[] = [orderBy("created_at", "desc"), limit(limitNum)];
      if (startId) {
        const start = await getDoc(doc(this.db, collection_name, startId));
        if (start.exists()) queryConstraints.push(startAt(start));
      }
      const q = query(collectionRef, ...queryConstraints);

      const cacheKey = `getLatest/${collection_name}/${limitNum}/${startId ? startId : 0}`;
      const cache = window.sessionStorage.getItem(cacheKey);
      if (cache) {
        console.log(cacheKey, cache);
        return JSON.parse(cache);
      }

      const snapshot = await getDocs(q);
      const res_data: Array<DocumentData> = [];
      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        res_data.push(Object.assign(doc.data(), { id: doc.id }));
      });
      window.sessionStorage.setItem(cacheKey, JSON.stringify(res_data));
      console.log("!", res_data);
      return res_data;
    } catch (_err) {
      return null;
    }
  }

  async mapsBoolFieldNameSearch(
    collection_name: string,
    map_name: string,
    limitNum: number,
    boolField_names: Array<string>
  ) {
    try {
      /*
      const collectionRef = collection(this.db, collection_name);
      //const queryConstraints: Array<QueryConstraint> = [limit(limitNum)];
      let q = query(collectionRef, limit(limitNum));
      boolField_names.forEach((aName) => {
        q = query(q, where(`${map_name}.${aName}`, "==", true));
      });
      const snapshot = await getDocs(q);
      const res_data: Array<DocumentData> = [];
      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        res_data.push(Object.assign(doc.data(), { id: doc.id }));
      });
      */
      //query系を使った場合

      return await this.throwQuerys(
        this.mapsBoolFieldNameSearchQuery(this.baseQuery(collection_name, limitNum), map_name, boolField_names)
      );
    } catch (_err) {
      return null;
    }
  }

  async fullTextSearch(collection_name: string, limitNum: number, searchWords: Array<string>) {
    const validSearchWords = !searchWords ? [] : searchWords.filter((aWord) => aWord != "");
    if (validSearchWords.length <= 0) {
      return [];
    }
    try {
      return await this.throwQuerys(
        this.fullTextSearchQuery(this.baseQuery(collection_name, limitNum), validSearchWords)
      );
    } catch (_err) {
      return null;
    }
  }

  async getWithTags(collection_name: string, limitNum: number, tags: Array<string>) {
    const validtags = !tags ? [] : tags.filter((aWord) => aWord != "");
    if (validtags.length <= 0) {
      return [];
    }

    const cacheKey = `getWithTags/${collection_name}/${tags.join("#")}/${limitNum}`;
    const cache = window.sessionStorage.getItem(cacheKey);
    if (cache) {
      console.log(cacheKey, cache);
      return JSON.parse(cache);
    }

    try {
      const result = await this.throwQuerys(this.tagsSearchQuery(this.baseQuery(collection_name, limitNum), validtags));
      if (result !== null) window.sessionStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    } catch (_err) {
      return null;
    }
  }

  async fullTextAndTagSearch(
    collection_name: string,
    limitNum: number,
    searchWords: Array<string>,
    tags: Array<string>
  ) {
    const validtags = !tags ? [] : tags.filter((aWord) => aWord != "");
    const validSearchWords = !searchWords ? [] : searchWords.filter((aWord) => aWord != "");
    if (validtags.length <= 0 && validSearchWords.length <= 0) {
      return [];
    }
    try {
      return await this.throwQuerys(
        this.tagsSearchQuery(
          this.fullTextSearchQuery(this.baseQuery(collection_name, limitNum), validSearchWords),
          validtags
        )
      );
    } catch (_err) {
      return null;
    }
  }

  async FilterAnd(collection_name: string, args: FilterArg[]): Promise<DocumentData[] | null> {
    try {
      const ref = collection(this.db, collection_name);
      const where_list = args.map<QueryFieldFilterConstraint>((arg: FilterArg) => {
        return where(arg.key, arg.operator, arg.value);
      });
      const q = query(ref, ...where_list);
      const snapshots = await getDocs(q);

      const docs: DocumentData[] = [];
      snapshots.forEach((snap: DocumentSnapshot) => {
        const data = snap.data();
        if (data !== undefined) docs.push(Object.assign(data, { id: snap.id }));
      });
      return docs;
    } catch (_err) {
      return null;
    }
  }

  async FilterOr(collection_name: string, args: FilterArg[]): Promise<DocumentData[] | null> {
    try {
      const ref = collection(this.db, collection_name);
      const where_list = args.map<QueryFieldFilterConstraint>((arg: FilterArg) => {
        return where(arg.key, arg.operator, arg.value);
      });
      const q = query(ref, or(...where_list));
      const snapshots = await getDocs(q);

      const docs: DocumentData[] = [];
      snapshots.forEach((snap: DocumentSnapshot) => {
        const data = snap.data();
        if (data !== undefined) docs.push(Object.assign(data, { id: snap.id }));
      });

      return docs;
    } catch (_err) {
      return null;
    }
  }

  async set(collection_name: string, doc_id: string, data: DocumentData): Promise<DocumentData | null> {
    try {
      const ref = doc(this.db, collection_name, doc_id);
      data = Object.assign(data, { created_at: serverTimestamp(), updated_at: serverTimestamp() });
      await setDoc(ref, data).catch((_err) => {
        return null;
      });
      return Object.assign(data, { id: doc_id });
    } catch (_err) {
      return null;
    }
  }
  async setSubCollection(
    collection_name: string,
    sub_path: string[],
    doc_id: string,
    data: DocumentData
  ): Promise<DocumentData | null> {
    try {
      const ref = doc(this.db, collection_name, ...sub_path, doc_id);
      data = Object.assign(data, { created_at: serverTimestamp(), updated_at: serverTimestamp() });
      await setDoc(ref, data).catch((_err) => {
        return null;
      });
      return Object.assign(data, { id: doc_id });
    } catch (_err) {
      return null;
    }
  }

  async update(collection_name: string, doc_id: string, data: DocumentData): Promise<boolean | null> {
    try {
      const ref = doc(this.db, collection_name, doc_id);
      data = Object.assign(data, { updated_at: serverTimestamp() });
      await updateDoc(ref, data);
      return true;
    } catch (_err) {
      return null;
    }
  }

  async delete(collection_name: string, doc_id: string): Promise<boolean | null> {
    try {
      const ref = doc(this.db, collection_name, doc_id);
      await deleteDoc(ref);
      return true;
    } catch (_err) {
      return null;
    }
  }

  async uploadFile(path: string, file: Blob): Promise<string | null> {
    try {
      const ref = storageRef(this.storage, path);
      const result = await uploadBytes(ref, file);
      const url = await getDownloadURL(result.ref);
      return url;
    } catch (_err) {
      return null;
    }
  }

  //クエリ系-------------------
  async throwQuerys(q: Query<DocumentData>) {
    try {
      const snapshot = await getDocs(q);
      const res_data: Array<DocumentData> = [];
      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        res_data.push(Object.assign(doc.data(), { id: doc.id }));
      });
      return res_data;
    } catch (_err) {
      return null;
    }
  }

  baseQuery(collection_name: string, limitNum: number) {
    const collectionRef = collection(this.db, collection_name);
    return query(collectionRef, limit(limitNum));
  }

  mapsBoolFieldNameSearchQuery(orig_query: Query<DocumentData>, map_name: string, boolField_names: Array<string>) {
    let q = orig_query;
    boolField_names.forEach((aName) => {
      /*if (aName != "") */ q = query(q, where(`${map_name}.${aName}`, "==", true));
    });
    return q;
  }

  fullTextSearchQuery(orig_query: Query<DocumentData>, serchWords: Array<string>) {
    let serchTokens: Array<string> = [];
    serchWords.forEach((aSerchWord) => {
      //console.log(aSerchWord);
      serchTokens.push(...nOrLessGramTokenize(this.KatakanaToHiragana(aSerchWord.toLowerCase()), 2));
    });
    //console.log(serchTokens);
    return this.mapsBoolFieldNameSearchQuery(orig_query, "bigramtokens_map", serchTokens);
  }

  tagsSearchQuery(orig_query: Query<DocumentData>, searchTags: Array<string>) {
    return this.mapsBoolFieldNameSearchQuery(orig_query, "tags_map", searchTags);
  }

  KatakanaToHiragana(word: string) {
    return word.replace(/[\u30a1-\u30f6]/g, (aChar) => {
      return String.fromCharCode(aChar.charCodeAt(0) - 0x60);
    });
  }
}
