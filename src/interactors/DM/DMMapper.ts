import { DocumentData } from "@firebase/firestore";

import { DMData, DMDataWithRelativeData, DMMessageData, DMMessageDataWithRelativeData } from "../DM/DMTypes";
import UserInteractor from "../User/UserInteractor";
import { UserPublicData } from "../User/UserTypes";

export default class DMMapper {
  static mapDocDataToDMData(data: DocumentData): DMData {
    return {
      id: data.id,
      name: data.name,
      member_ids: data.member_ids,

      created_at: data.created_at.toDate ? new Date(data.created_at.toDate()) : new Date(),
      updated_at: data.updated_at.toDate ? new Date(data.updated_at.toDate()) : new Date(),
    };
  }

  static async mapDocDataToDMDataWithRelativeData(data: DocumentData): Promise<DMDataWithRelativeData | null> {
    const interactor = new UserInteractor();
    let members_data: UserPublicData[] = [];
    //console.log(data.member_ids.length);
    for (let i = 0; i < data.member_ids.length; i++) {
      const member_pubData = await interactor.getPublicData(data.member_ids[i]);
      if (member_pubData) {
        members_data.push(member_pubData);
      }
    }
    return {
      id: data.id,
      name: data.name,
      members: members_data,
      created_at: data.created_at.toDate ? new Date(data.created_at.toDate()) : new Date(),
      updated_at: data.updated_at.toDate ? new Date(data.updated_at.toDate()) : new Date(),
    };
  }

  static mapDocDataToDMMessageData(data: DocumentData): DMMessageData {
    return {
      id: data.id,
      content: data.content,
      sender_id: data.sender_id,

      created_at: data.created_at.toDate ? new Date(data.created_at.toDate()) : new Date(),
      updated_at: data.updated_at.toDate ? new Date(data.updated_at.toDate()) : new Date(),
    };
  }

  static async mapDocDataToDMMessageDataWithRelativeData(
    data: DocumentData
  ): Promise<DMMessageDataWithRelativeData | null> {
    const interactor = new UserInteractor();
    const sender_data: UserPublicData | null = await interactor.getPublicData(data.sender_id);
    if (!sender_data) {
      return null;
    }
    return {
      id: data.id,
      content: data.content,
      sender: sender_data,
      created_at: data.created_at.toDate ? new Date(data.created_at.toDate()) : new Date(),
      updated_at: data.updated_at.toDate ? new Date(data.updated_at.toDate()) : new Date(),
    };
  }
}
