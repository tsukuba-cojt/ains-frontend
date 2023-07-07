export interface ImageListData {
  id: string;
  name: string;
  url: string;
}

export interface FileData {
  id: string;
  path: string;
  url: string;
}

export interface FileCreateData {
  path: string;
  url: string;
}

export type ArtworkType = "image" | "novel" | "music" | "movie";

export interface ArtworkData {
  id: string;
  type: ArtworkType;
  name: string;
  description?: string;
  file: FileData;
  view_num: number;
  save_num: number;
  uploaded: Date;

  author_id: string;
  tag_ids: string[];
  comment_ids: string[];
  parent_ids: string[];
}

export interface ArtworkFormData {
  type: ArtworkType;
  name: string;
  description?: string;
  file: Blob;

  author_id: string;
  tag_ids: string[];
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
  tag_ids: string[];
  comment_ids: string[];
  parent_ids: string[];
}
