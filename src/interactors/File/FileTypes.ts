import { BaseModel } from "../BaseTypes";

export interface FileData extends BaseModel {
  id: string;
  path: string;
  url: string;
  name?: string;
}

export interface FileCreateData {
  path: string;
  url: string;
  name?: string;
}
