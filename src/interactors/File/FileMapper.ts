import { DocumentData } from "@firebase/firestore";

import { FileData } from "@/types/api/artwork";

export default class FileMapper {
  static mapDocDataToFileData(data: DocumentData): FileData {
    return {
      id: data.id,
      path: data.path,
      url: data.url,
    };
  }
}
