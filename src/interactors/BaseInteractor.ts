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
} from "firebase/firestore";
import { FirebaseStorage, getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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
    try {
      const ref = doc(this.db, collection_name, doc_id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        return Object.assign(snapshot.data(), { id: snapshot.id });
      } else {
        return null;
      }
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

  async update(collection_name: string, doc_id: string, data: DocumentData): Promise<DocumentData | null> {
    try {
      const ref = doc(this.db, collection_name, doc_id);
      data = Object.assign(data, { updated_at: serverTimestamp() });
      await updateDoc(ref, data);
      return Object.assign(data, { id: doc_id });
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
}
