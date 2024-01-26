import { BaseModel } from "../BaseTypes";
import { UserPublicData } from "../User/UserTypes";

export interface CommentData extends BaseModel {
  id: string;
  text: string;
  author: UserPublicData;
}

export interface CommentCreateData {
  artwork_id: string;
  text: string;
  author_id: string;
}
