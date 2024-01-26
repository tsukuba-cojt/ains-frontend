import { BaseModel } from "../BaseTypes";

export interface UserData extends BaseModel {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  follows: string[];
  followers: string[];
}

export interface UserPublicData extends BaseModel {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  follows_count: number;
  followers_count: number;
}

export interface UserFormData {
  id: string;
  name: string;
  description?: string;
  icon?: File;
}

export const deletedUser: UserPublicData = {
  id: "",
  name: "削除済みユーザー",
  follows_count: 0,
  followers_count: 0,
  created_at: new Date(),
  updated_at: new Date(),
};

export type UserCreateData = Omit<UserData, "created_at" | "updated_at">;
