import { UserPublicData } from "../User/UserTypes";

export interface CommentData {
  id: string;
  text: string;
  author: UserPublicData;
}

export interface CommentCreateData {
  text: string;
  author_id: string;
}
