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

  async get(artwork_id: string): Promise<ArtworkData | null> {
    const res_data = await this.interactor.get(this.COLLECTION_NAME, artwork_id);
    if (!res_data) return null;

    const artwork_data = await ArtworkMapper.mapDocDataToArtworkData(res_data);
    return artwork_data;
  }

  async getLatests(limit: number): Promise<ArtworkData[] | null> {
    const res_data = await this.interactor.getLatests(this.COLLECTION_NAME, limit);
    if (!res_data) return null;

    const artwork_data_list: ArtworkData[] = [];
    for (let i = 0; i < res_data.length; i++) {
      const new_artwork_data = await ArtworkMapper.mapDocDataToArtworkData(res_data[i]);
      if (new_artwork_data !== null) artwork_data_list.push(new_artwork_data);
    }

    return artwork_data_list;
  }

  async upload(data: ArtworkFormData): Promise<ArtworkData | null> {
    if (!data.file) return null;

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
      tags: data.tags,
      comment_ids: data.comment_ids,
      parent_ids: data.parent_ids,
    };
    const res_data = await this.interactor.set(this.COLLECTION_NAME, doc_id, artwork_create_data);
    if (!res_data) return null;

    const artwork_data = await ArtworkMapper.mapDocDataToArtworkData(res_data);
    return artwork_data;
  }
}
