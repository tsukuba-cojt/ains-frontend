import CommunityMapper from "./CommunityMapper";
import { CommunityCreateData, CommunityData, CommunityFormData } from "./CommunityTypes";
import BaseInteractor from "../BaseInteractor";
import FileInteractor from "../File/FileInteractor";

export default class CommunityInteractor {
  interactor: BaseInteractor;
  COLLECTION_NAME = "communities";

  constructor() {
    this.interactor = new BaseInteractor();
  }

  async get(community_id: string): Promise<CommunityData | null> {
    const data = await this.interactor.get(this.COLLECTION_NAME, community_id);
    if (!data) return null;

    const community = await CommunityMapper.mapDocDataToCommunityData(data);
    return community;
  }

  async set(data: CommunityFormData): Promise<CommunityData | null> {
    const fileInteractor = new FileInteractor();
    const banner = data.banner && (await fileInteractor.upload(data.banner));
    const icon = data.icon && (await fileInteractor.upload(data.icon));
    const createData: CommunityCreateData = {
      ...data,
      banner: banner || undefined,
      icon: icon || undefined,
      admins: [],
      members: [],
    };
    const result = await this.interactor.set(this.COLLECTION_NAME, this.interactor.uuidv4(), createData);
    if (!result) return null;

    const community = CommunityMapper.mapDocDataToCommunityData(result);
    return community;
  }
}
