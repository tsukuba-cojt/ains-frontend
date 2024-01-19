export interface UserData {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  follows: string[];
  followers: string[];
}

export interface UserPublicData {
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
};

export type UserCreateData = UserData;
