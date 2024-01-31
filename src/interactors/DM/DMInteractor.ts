//import ArtworkMapper from "./ArtworkMapper";
import { DMCreateData, DMMessageCreateData } from "./DMTypes";
import { FilterArg } from "../BaseInteractor";
import BaseInteractor from "../BaseInteractor";

export default class DMInteractor {
  readonly interactor: BaseInteractor;
  readonly COLLECTION_NAME = "DMs";
  readonly SUBCOLLECTION_NAME = "Messages";
  constructor() {
    this.interactor = new BaseInteractor();
  }

  //DM-----------------------------

  async get_DM(DM_id: string) {
    return await this.interactor.get(this.COLLECTION_NAME, DM_id);
  }

  async set_DM(data: DMCreateData) {
    await this.interactor.set(this.COLLECTION_NAME, this.interactor.uuidv4(), data);
  }

  //ユーザ-がメンバーとなっているDMを全て取得
  async getWithMemberID_DM(userId: string) {
    const filter: FilterArg = { key: "member_ids", operator: "array-contains", value: userId };
    return await this.interactor.FilterAnd("DMs", [filter]);
  }

  async getLatests_DM(limit: number, startId: string | null = null) {
    return await this.interactor.getLatests("DMs", limit, startId);
  }

  //DMMessage-------------------------------
  async get_DMMessage(DM_id: string, DMMessage_id: string) {
    return await this.interactor.getSubCollection(this.COLLECTION_NAME, [DM_id, this.SUBCOLLECTION_NAME], DMMessage_id);
  }
  async set_DMMessage(DM_id: string, data: DMMessageCreateData) {
    return await this.interactor.setSubCollection(
      this.COLLECTION_NAME,
      [DM_id, this.SUBCOLLECTION_NAME],
      this.interactor.uuidv4(),
      data
    );
  }

  //DMのメッセージを全て取得
  async getLatests_DMMessage(DM_id: string, limitNum: number, startId: string | null = null) {
    return await this.interactor.getSubCollections("DMs", [DM_id, this.SUBCOLLECTION_NAME], limitNum, startId);
  }

  async makeDM() {}
}
