export interface ImageListData {
  id: string;
  name: string;
  url: string;
}

export type ArtworkType = "image" | "novel" | "music" | "movie";

export interface ArtworkGet {
  id: string;
  type: ArtworkType;
  name: string;
  description?: string;
  url: string;
  view_num: number;
  save_num: number;
  uploaded: Date;

  author_id: string;
  tag_ids: string[];
  comment_ids: string[];
  parent_ids: string[];
}

export interface ArtworkCreate {
  type: ArtworkType;
  name: string;
  description?: string;
  file: Blob;
  author_id: string;
  parent_ids: string[];
}
