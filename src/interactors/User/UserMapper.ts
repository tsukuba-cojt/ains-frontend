import { DocumentData } from "firebase/firestore";

import { UserData, UserPublicData } from "./UserTypes";

export default class UserMapper {
  static mapDocDataToUserData(data: DocumentData): UserData {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      icon_url: data.icon_url,
      followers: data.followers,
      follows: data.follows,
    };
  }

  static mapDocDataToUserPublicData(data: DocumentData): UserPublicData {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      icon_url: data.icon_url,
      followers_count: data.followers.length,
      follows_count: data.follows.length,
    };
  }
}
