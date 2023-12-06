import { CommentData } from "../Comment/CommentTypes";
import { FileData } from "../File/FileTypes";
import { UserPublicData } from "../User/UserTypes";

export type ArtworkType = "image" | "text" | "audio" | "video";

export interface ArtworkData {
  id: string;
  type: ArtworkType;
  name: string;
  description?: string;
  file: FileData;
  view_num: number;
  save_num: number;
  uploaded: Date;
  is_public: boolean;

  author_id: string;
  tags: string[];
  comment_ids: string[];
  parent_ids: string[];
}

export interface ArtworkDataWithRelativeData {
  id: string;
  type: ArtworkType;
  name: string;
  description?: string;
  file: FileData;
  view_num: number;
  save_num: number;
  uploaded: Date;
  is_public: boolean;

  author: UserPublicData;
  tags: string[];
  comments: CommentData[];
  parents: ArtworkData[];
}

export const INITIAL_ARTWORK_FORM_DATA: ArtworkFormData = {
  type: "image",
  name: "",
  description: "",
  file: null,

  author_id: "",
  tags: [],
  comment_ids: [],
  parent_ids: [],
};

export interface ArtworkFormData {
  type: ArtworkType;
  name: string;
  description?: string;
  file: Blob | null;

  author_id: string;
  tags: string[];
  comment_ids: string[];
  parent_ids: string[];
}

export interface ArtworkCreateData {
  type: ArtworkType;
  name: string;
  description?: string;
  view_num: number;
  save_num: number;

  file_id: string;
  author_id: string;
  tags: string[];
  comment_ids: string[];
  parent_ids: string[];
}
