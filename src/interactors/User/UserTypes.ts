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

export type UserCreateData = UserData;
