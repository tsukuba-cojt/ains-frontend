import { DocumentData } from "@firebase/firestore";

import { ArtworkData } from "@/types/api/artwork";

import FileInteractor from "../File/FileInteractor";

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

      author_id: data.author_id,
      tags: data.tags,
      comment_ids: data.comment_ids,
      parent_ids: data.parent_ids,
    };
  }
}
