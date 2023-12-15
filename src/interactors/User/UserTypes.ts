export interface UserData {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  follows: string[];
  followers: string[];
}

export interface UserPublicData {
  id: string;
  name: string;
  description?: string;
  icon_url: string;
  follows_count: number;
  followers_count: number;
}

export interface UserFormData {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
}

export type UserCreateData = UserData;
