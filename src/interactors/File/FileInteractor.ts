import { FileCreateData, FileData } from "@/interactors/Artwork/artwork";

import FileMapper from "./FileMapper";
import BaseInteractor from "../BaseInteractor";

export default class FileInteractor {
  readonly interactor: BaseInteractor;
  readonly COLLECTION_NAME = "files";
  constructor() {
    this.interactor = new BaseInteractor();
  }

  generateFilePath(file_id: string, file_name: string): string | null {
    if (file_name.split(".").length < 2) {
      return null;
    }
    const file_ext = file_name.split(".").slice(-1)[0];

    return `/${this.COLLECTION_NAME}/${file_id}.${file_ext}`;
  }

  async upload(file: Blob): Promise<FileData | null> {
    const doc_id = this.interactor.uuidv4();

    const file_path = this.generateFilePath(doc_id, file.name);
    if (!file_path) return null;

    const url = await this.interactor.uploadFile(file_path, file);
    if (!url) return null;

    const file_create_data: FileCreateData = {
      path: file_path,
      url: url,
    };
    const res_data = await this.interactor.set(this.COLLECTION_NAME, doc_id, file_create_data);
    if (!res_data) return null;

    const file_data = FileMapper.mapDocDataToFileData(res_data);
    return file_data;
  }

  async get(file_id: string): Promise<FileData | null> {
    const res_data = await this.interactor.get(this.COLLECTION_NAME, file_id);
    if (!res_data) return null;
    const file_data = FileMapper.mapDocDataToFileData(res_data);
    return file_data;
  }
}
