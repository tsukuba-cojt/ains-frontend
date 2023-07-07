import { ArtworkCreateData, ArtworkData, ArtworkFormData } from "@/types/api/artwork";

import ArtworkMapper from "./ArtworkMapper";
import BaseInteractor from "../BaseInteractor";
import FileInteractor from "../File/FileInteractor";

export default class ArtworkInteractor {
  readonly interactor: BaseInteractor;
  readonly COLLECTION_NAME = "artworks";
  constructor() {
    this.interactor = new BaseInteractor();
  }

  async upload(data: ArtworkFormData): Promise<ArtworkData | null> {
    const file_interactor = new FileInteractor();
    const file_data = await file_interactor.upload(data.file);
    if (!file_data) return null;

    const doc_id = this.interactor.uuidv4();
    const artwork_create_data: ArtworkCreateData = {
      type: data.type,
      name: data.name,
      description: data.description,
      view_num: 0,
      save_num: 0,

      file_id: file_data.id,
      author_id: data.author_id,
      tag_ids: data.tag_ids,
      comment_ids: data.comment_ids,
      parent_ids: data.parent_ids,
    };
    const res_data = await this.interactor.set(this.COLLECTION_NAME, doc_id, artwork_create_data);
    if (!res_data) return null;

    const artwork_data = await ArtworkMapper.mapDocDataToArtworkData(res_data);
    return artwork_data;
  }
}
