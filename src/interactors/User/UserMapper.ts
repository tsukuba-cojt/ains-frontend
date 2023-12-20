import { DocumentData } from "firebase/firestore";

import { UserData, UserPublicData } from "./UserTypes";
import FileInteractor from "../File/FileInteractor";

export default class UserMapper {
  static async mapDocDataToUserData(data: DocumentData): Promise<UserData> {
    const file = await new FileInteractor().get(data.icon);

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      icon: file ? file.url : undefined,
      followers: data.followers,
      follows: data.follows,
    };
  }

  static async mapDocDataToUserPublicData(data: DocumentData): Promise<UserPublicData> {
    const file = await new FileInteractor().get(data.icon);

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      icon: file ? file.url : undefined,
      followers_count: data.followers.length,
      follows_count: data.follows.length,
    };
  }
}
