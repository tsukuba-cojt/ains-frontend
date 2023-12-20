import { FileData } from "../File/FileTypes";
import { UserPublicData } from "../User/UserTypes";

export interface CommunityData {
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

export type CommunityCreateData = Omit<CommunityData, "id">;

export interface PostData {
  id: string;
  content: string;

  files?: FileData[];
  likes: string[];
  author: UserPublicData;
}
