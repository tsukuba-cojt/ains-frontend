import { ArtworkCreate } from "@/types/api/artworks";

import BaseInteractor from "../BaseInteractor";

export default class ArtworkInteractor {
  readonly interactor: BaseInteractor;
  readonly COLLECTION_NAME = "artworks";
  constructor() {
    this.interactor = new BaseInteractor();
  }

  upload(data: ArtworkCreate) {
    const new_artwork = this.interactor.set(this.COLLECTION_NAME, {
      type: data.type,
      name: data.name,
      description: data.description,
      view_num: 0,
      save_num: 0,

      author_id: data.author_id,
      tag_ids: [],
      comment_ids: [],
      parent_ids: data.parent_ids,
    });
  }

  // upload file and set url
}
