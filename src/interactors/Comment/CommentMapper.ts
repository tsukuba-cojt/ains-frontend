import { DocumentData } from "firebase/firestore";

import { CommentData } from "./CommentTypes";
import UserInteractor from "../User/UserInteractor";

export default class CommentMapper {
  static async mapDocDataToCommentData(data: DocumentData): Promise<CommentData | null> {
    const user_data = await new UserInteractor().getPublicData(data.author_id);
    if (!user_data) return null;

    return {
      id: data.id,
      text: data.text,
      author: user_data,
    };
  }
}
