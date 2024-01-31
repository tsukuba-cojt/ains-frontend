import { BaseModel } from "../BaseTypes";
import { UserPublicData } from "../User/UserTypes";

export interface DMData extends BaseModel {
  id: string;
  name: string;
  members: UserPublicData[];
}

export interface DMCreateData {
  name: string;
  member_ids: string[];
}

export interface DMMessageData extends BaseModel {
  id: string;
  content: string;
  sender: UserPublicData;
}

export interface DMMessageCreateData {
  content: string;
  sender_id: string;
}
