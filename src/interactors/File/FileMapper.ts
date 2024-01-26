import { DocumentData } from "@firebase/firestore";

import { FileData } from "./FileTypes";

export default class FileMapper {
  static mapDocDataToFileData(data: DocumentData): FileData {
    return {
      id: data.id,
      path: data.path,
      url: data.url,
      created_at: data.created_at.toDate ? new Date(data.created_at.toDate()) : new Date(),
      updated_at: data.updated_at.toDate ? new Date(data.updated_at.toDate()) : new Date(),
    };
  }
}
