import {
  ArtworkCreateData,
  ArtworkData,
  ArtworkDataWithRelativeData,
  ArtworkFormData,
} from "@/interactors/Artwork/ArtworkTypes";

import ArtworkMapper from "./ArtworkMapper";
import { nOrLessGramTokenize } from "../../plugins/Utility/NGramTokenizer";
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
    const res_data = await this.interactor.get(this.COLLECTION_NAME, artwork_id);
    if (!res_data) return null;

    const artwork_data = await ArtworkMapper.mapDocDataToArtworkDataWithRelativeData(res_data);
    return artwork_data;
  }

  async getLatests(limit: number, startId: string | null = null): Promise<ArtworkData[] | null> {
    const res_data = await this.interactor.getLatests(this.COLLECTION_NAME, limit, startId);
    if (!res_data) return null;

    const artwork_data_list: ArtworkData[] = [];
    for (let i = 0; i < res_data.length; i++) {
      const new_artwork_data = await ArtworkMapper.mapDocDataToArtworkData(res_data[i]);
      if (new_artwork_data !== null) artwork_data_list.push(new_artwork_data);
    }

    return artwork_data_list;
  }

  async fullTextSearch(limitNum: number, serchWords: Array<string>) {
    const res_data = await this.interactor.fullTextSearch(this.COLLECTION_NAME, limitNum, serchWords);
    if (!res_data) return null;

    const artwork_data_list: ArtworkData[] = [];
    for (let i = 0; i < res_data.length; i++) {
      const new_artwork_data = await ArtworkMapper.mapDocDataToArtworkData(res_data[i]);
      if (new_artwork_data !== null) artwork_data_list.push(new_artwork_data);
    }
    return artwork_data_list;
  }
  async getWithTags(limitNum: number, tags: Array<string>) {
    const res_data = await this.interactor.getWithTags(this.COLLECTION_NAME, limitNum, tags);
    if (!res_data) {
      return null;
    }

    const artwork_data_list: ArtworkData[] = [];
    for (let i = 0; i < res_data.length; i++) {
      const new_artwork_data = await ArtworkMapper.mapDocDataToArtworkData(res_data[i]);
      if (new_artwork_data !== null) artwork_data_list.push(new_artwork_data);
    }
    return artwork_data_list;
  }

  async fullTextAndTagSearch(limitNum: number, serchWords: Array<string>, tags: Array<string>) {
    const res_data = await this.interactor.fullTextAndTagSearch(this.COLLECTION_NAME, limitNum, serchWords, tags);
    if (!res_data) {
      return null;
    }

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

    //検索に使うマップを作成
    const bigramtokens_map: any = {};
    nOrLessGramTokenize(artwork_create_data.name + " " + artwork_create_data.description, 2).forEach((aToken) => {
      bigramtokens_map[aToken] = true;
    });
    const tags_map: any = {};
    artwork_create_data.tags.forEach((aTag) => {
      tags_map[aTag] = true;
    });
    const artwork_create_data_with_serchtoken = Object.assign(artwork_create_data, {
      bigramtokens_map: bigramtokens_map,
      tags_map: tags_map,
    });

    //const res_data = await this.interactor.set(this.COLLECTION_NAME, doc_id, artwork_create_data);
    //検索用のデータ付きのオブジェクトをfirebaseに登録
    const res_data = await this.interactor.set(this.COLLECTION_NAME, doc_id, artwork_create_data_with_serchtoken);
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
