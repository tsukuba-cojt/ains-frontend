import { DocumentData } from "@firebase/firestore";

import { FileData } from "./FileTypes";

export default class FileMapper {
  static mapDocDataToFileData(data: DocumentData): FileData {
    return {
      id: data.id,
      path: data.path,
      url: data.url,
    };
  }
}
