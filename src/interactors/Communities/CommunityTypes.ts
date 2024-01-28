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
  originPost: PostData | null;
  repliesAmount: number;
  author: UserPublicData;
}

export interface PostFormData {
  communityId: string;
  content: string;
  files?: File[];
  author: string;
}

export interface PostCreateData {
  content: string;
  files?: string[];
  likes: string[];
  originPost: string | null;
  repliesAmount: number;
  author: string;
}

export interface LikePostFormData {
  community_id: string;
  post_id: string;
  user_id: string;
  remove: boolean;
}
