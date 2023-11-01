import { DocumentData } from "firebase/firestore";

import { UserData, UserPublicData } from "./UserTypes";

export default class UserMapper {
  static mapDocDataToUserData(data: DocumentData): UserData {
    return {
      id: data.id,
      name: data.name,
      icon_url: data.icon_url,
    };
  }

  static mapDocDataToUsePublicData(data: DocumentData): UserPublicData {
    return {
      id: data.id,
      name: data.name,
      icon_url: data.icon_url,
    };
  }
}
