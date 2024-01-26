import {
  ArtworkCreateData,
  ArtworkData,
  ArtworkDataWithRelativeData,
  ArtworkFormData,
} from "@/interactors/Artwork/ArtworkTypes";

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

  async getWithRelativeData(artwork_id: string): Promise<ArtworkDataWithRelativeData | null> {
    try {
      const res_data = await this.interactor.get(this.COLLECTION_NAME, artwork_id);
      if (!res_data) return null;

      const artwork_data = await ArtworkMapper.mapDocDataToArtworkDataWithRelativeData(res_data);
      if (artwork_data !== null) {
        console.log("uploaded:", artwork_data.uploaded);
        return artwork_data;
      } else {
        console.error("artwork_data is null");
        return null;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  }

  async getLatestArtworks(limit: number): Promise<ArtworkData[] | null> {
    const res_data = await this.interactor.getLatests(this.COLLECTION_NAME, limit);
    if (!res_data) return null;

    const currentDate = new Date();
    const latestArtworks: ArtworkData[] = [];

    for (let i = 0; i < res_data.length; i++) {
      const new_artwork_data = await ArtworkMapper.mapDocDataToArtworkData(res_data[i]);

      if (new_artwork_data !== null) {
        // 新着作品の判定例: 最終更新日が1週間以内の場合
        const lastUpdatedDate = new Date(new_artwork_data.uploaded);
        const isNew = currentDate.getTime() - lastUpdatedDate.getTime() <= 7 * 24 * 60 * 60 * 1000;

        new_artwork_data.isNew = isNew;

        latestArtworks.push(new_artwork_data);
      }
    }

    return latestArtworks;
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

  async addComment(artwork_id: string, comment_id: string): Promise<boolean | null> {
    const artwork_data = await this.get(artwork_id);
    if (!artwork_data) return null;

    const res_data = await this.interactor.update(this.COLLECTION_NAME, artwork_data.id, {
      comment_ids: artwork_data.comment_ids.concat(comment_id),
    });
    if (!res_data) return null;

    return true;
  }

  async update(data: any): Promise<boolean | null> {
    // TODO
    return false;
  }

  async delete(data: any): Promise<boolean | null> {
    // TODO
    return false;
  }
}
