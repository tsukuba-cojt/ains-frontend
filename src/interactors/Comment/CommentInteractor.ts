import CommentMapper from "./CommentMapper";
import { CommentCreateData, CommentData } from "./CommentTypes";
import ArtworkInteractor from "../Artwork/ArtworkInteractor";
import BaseInteractor from "../BaseInteractor";

export default class CommentInteractor {
  readonly interactor: BaseInteractor;
  readonly COLLECTION_NAME = "comments";

  constructor() {
    this.interactor = new BaseInteractor();
  }

  async get(comment_id: string): Promise<CommentData | null> {
    const res_data = await this.interactor.get(this.COLLECTION_NAME, comment_id);
    if (!res_data) return null;

    const comment_data = await CommentMapper.mapDocDataToCommentData(res_data);
    return comment_data;
  }

  async set(data: CommentCreateData): Promise<CommentData | null> {
    const comment_res_data = await this.interactor.set(this.COLLECTION_NAME, this.interactor.uuidv4(), data);
    if (!comment_res_data) return null;

    const comment_data = await CommentMapper.mapDocDataToCommentData(comment_res_data);
    if (!comment_data) return null;

    const result = await new ArtworkInteractor().addComment(data.artwork_id, comment_data.id);
    if (!result) return null;

    return comment_data;
  }
}
