import { BaseModel } from "../BaseTypes";
import { FileData } from "../File/FileTypes";
import { UserPublicData } from "../User/UserTypes";

export interface CommunityData extends BaseModel {
  id: string;
  name: string;
  description?: string;
  banner?: FileData;
  icon?: FileData;
  isPublic: boolean;

  admins: string[];
  members: string[];
  owner: string;
}

export interface CommunityFormData {
  name: string;
  description?: string;
  banner?: File;
  icon?: File;
  isPublic: boolean;
  owner: string;
}

export type CommunityCreateData = Omit<CommunityData, "id" | "banner" | "icon" | "created_at" | "updated_at"> & {
  banner?: string;
  icon?: string;
};

export interface PostData extends BaseModel {
  id: string;
  content: string;

  files?: FileData[];
  likes: string[];
  replies: ReplyData[];
  author: UserPublicData;
}
export type ReplyData = Omit<PostData, "replies"> & { replies_num: number };

export interface PostFormData {
  community_id: string;
  content: string;
  files?: File[];
  author: string;
}
export type ReplyFormData = PostFormData & { originPost: string };

export interface PostCreateData {
  content: string;
  files?: string[];
  likes: string[];
  author: string;
}
