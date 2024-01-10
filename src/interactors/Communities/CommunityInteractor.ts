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

  async getLatests(limit: number): Promise<CommunityData[] | null> {
    const res_data = await this.interactor.getLatests(this.COLLECTION_NAME, limit);
    if (!res_data) return null;

    const community_data_list: CommunityData[] = [];
    for (let i = 0; i < res_data.length; i++) {
      const new_community_data = await CommunityMapper.mapDocDataToCommunityData(res_data[i]);
      if (new_community_data !== null) community_data_list.push(new_community_data);
    }

    return community_data_list;
  }

  async set(data: CommunityFormData): Promise<CommunityData | null> {
    const fileInteractor = new FileInteractor();
    const banner = data.banner && (await fileInteractor.upload(data.banner));
    const icon = data.icon && (await fileInteractor.upload(data.icon));
    const createData: CommunityCreateData = {
      ...data,
      banner: banner?.id || undefined,
      icon: icon?.id || undefined,
      admins: [],
      members: [],
    };
    const result = await this.interactor.set(this.COLLECTION_NAME, this.interactor.uuidv4(), createData);
    if (!result) return null;

    const community = CommunityMapper.mapDocDataToCommunityData(result);
    return community;
  }
}
