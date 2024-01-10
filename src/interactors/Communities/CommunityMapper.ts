import { DocumentData } from "firebase/firestore";

import { CommunityData } from "./CommunityTypes";
import FileInteractor from "../File/FileInteractor";

export default class CommunityMapper {
  static async mapDocDataToCommunityData(data: DocumentData): Promise<CommunityData> {
    const fileInteractor = new FileInteractor();
    const banner = await fileInteractor.get(data.banner);
    const icon = await fileInteractor.get(data.icon);

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      banner: banner || undefined,
      icon: icon || undefined,
      isPublic: data.isPublic,
      admins: data.admins,
      members: data.members,
      owner: data.owner,
    };
  }
}
