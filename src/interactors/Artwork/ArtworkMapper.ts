import { DocumentData } from "@firebase/firestore";

import { ArtworkData, ArtworkDataWithRelativeData } from "@/interactors/Artwork/ArtworkTypes";
import FileInteractor from "@/interactors/File/FileInteractor";

import ArtworkInteractor from "./ArtworkInteractor";
import CommentInteractor from "../Comment/CommentInteractor";
import UserInteractor from "../User/UserInteractor";

export default class ArtworkMapper {
  static async mapDocDataToArtworkData(data: DocumentData): Promise<ArtworkData | null> {
    const file_data = await new FileInteractor().get(data.file_id);
    if (!file_data) return null;
    return {
      id: data.id,
      type: data.type,
      name: data.name,
      description: data.description,
      file: file_data,
      view_num: data.view_num,
      save_num: data.save_num,
      uploaded: new Date(data.uploaded),
      is_public: data.is_public || false, // TODO: 無理やり設定するのをやめる

      author_id: data.author_id,
      tags: data.tags,
      comment_ids: data.comment_ids,
      parent_ids: data.parent_ids,
    };
  }

  static async mapDocDataToArtworkDataWithRelativeData(
    data: DocumentData
  ): Promise<ArtworkDataWithRelativeData | null> {
    const file_data = await new FileInteractor().get(data.file_id);
    const user_data = await new UserInteractor().getPublicData(data.author_id);
    if (!file_data || !user_data) return null;

    const comment_interactor = new CommentInteractor();
    const comment_data_list = [];
    for (let i = 0; i < data.comment_ids.length; i++) {
      const comment_data = await comment_interactor.get(data.comment_ids[i]);
      if (comment_data !== null) comment_data_list.push(comment_data);
    }

    const artwork_interactor = new ArtworkInteractor();
    const artwork_data_list = [];
    for (let i = 0; i < data.parent_ids.length; i++) {
      const artwork_data = await artwork_interactor.get(data.parent_ids[i]);
      if (artwork_data !== null) artwork_data_list.push(artwork_data);
    }

    return {
      id: data.id,
      type: data.type,
      name: data.name,
      description: data.description,
      file: file_data,
      view_num: data.view_num,
      save_num: data.save_num,
      uploaded: new Date(data.uploaded),
      is_public: data.is_public || false, // TODO: 無理やり設定するのをやめる

      author: user_data,
      tags: data.tags,
      comments: comment_data_list,
      parents: artwork_data_list,
    };
  }
}
