//import ArtworkMapper from "./ArtworkMapper";
import DMMapper from "./DMMapper";
import { DMCreateData, DMDataWithRelativeData, DMMessageCreateData, DMMessageDataWithRelativeData } from "./DMTypes";
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

  async get_DM(DM_id: string): Promise<null | DMDataWithRelativeData> {
    const docData = await this.interactor.get(this.COLLECTION_NAME, DM_id);
    if (docData) {
      return DMMapper.mapDocDataToDMDataWithRelativeData(docData);
    } else {
      return null;
    }
  }

  async set_DM(data: DMCreateData): Promise<null | DMDataWithRelativeData> {
    const docData = await this.interactor.set(this.COLLECTION_NAME, this.interactor.uuidv4(), data);
    if (docData) {
      return DMMapper.mapDocDataToDMDataWithRelativeData(docData);
    } else {
      return null;
    }
  }

  //ユーザ-がメンバーとなっているDMを全て取得
  async getWithMemberID_DM(userId: string) {
    const filter: FilterArg = { key: "member_ids", operator: "array-contains", value: userId };
    const docDatas = await this.interactor.FilterAnd("DMs", [filter]);
    if (docDatas) {
      let retData: DMDataWithRelativeData[] = [];
      for (let i = 0; i < docDatas.length; i++) {
        const mappedData = await DMMapper.mapDocDataToDMDataWithRelativeData(docDatas[i]);
        if (mappedData) {
          retData.push(mappedData);
        }
      }
      return retData;
    } else {
      return null;
    }
  }

  async getLatests_DM(limit: number, startId: string | null = null) {
    const docDatas = await this.interactor.getLatests("DMs", limit, startId);
    if (docDatas) {
      let retData: DMDataWithRelativeData[] = [];
      for (let i = 0; i < docDatas.length; i++) {
        const mappedData = await DMMapper.mapDocDataToDMDataWithRelativeData(docDatas[i]);
        if (mappedData) {
          retData.push(mappedData);
        }
      }
      return retData;
    } else {
      return null;
    }
  }

  //DMMessage-------------------------------
  async get_DMMessage(DM_id: string, DMMessage_id: string) {
    const docData = await this.interactor.getSubCollection(
      this.COLLECTION_NAME,
      [DM_id, this.SUBCOLLECTION_NAME],
      DMMessage_id
    );
    if (docData) {
      return await DMMapper.mapDocDataToDMMessageDataWithRelativeData(docData);
    } else {
      return null;
    }
  }
  async set_DMMessage(DM_id: string, data: DMMessageCreateData) {
    const docData = await this.interactor.setSubCollection(
      this.COLLECTION_NAME,
      [DM_id, this.SUBCOLLECTION_NAME],
      this.interactor.uuidv4(),
      data
    );
    if (docData) {
      return await DMMapper.mapDocDataToDMMessageDataWithRelativeData(docData);
    } else {
      return null;
    }
  }

  //DMのメッセージを全て取得
  async getLatests_DMMessage(DM_id: string, limitNum: number, startId: string | null = null) {
    const docDatas = await this.interactor.getSubCollections(
      "DMs",
      [DM_id, this.SUBCOLLECTION_NAME],
      limitNum,
      startId
    );
    if (docDatas) {
      let retData: DMMessageDataWithRelativeData[] = [];
      for (let i = 0; i < docDatas.length; i++) {
        const mappedData = await DMMapper.mapDocDataToDMMessageDataWithRelativeData(docDatas[i]);
        if (mappedData) {
          retData.push(mappedData);
        }
      }
      return retData;
    } else {
      return null;
    }
  }

  async makeDM() {}
}
