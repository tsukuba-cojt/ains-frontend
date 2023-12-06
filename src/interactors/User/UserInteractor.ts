import { PartiallyIgnorePartial } from "@/types/util";

import UserMapper from "./UserMapper";
import { UserPublicData, UserData, UserFormData, UserCreateData } from "./UserTypes";
import { nOrLessGramTokenize } from "../../plugins/Utility/NGramTokenizer";
import BaseInteractor from "../BaseInteractor";

export default class UserInteractor {
  readonly interactor: BaseInteractor;
  readonly COLLECTION_NAME = "users";

  constructor() {
    this.interactor = new BaseInteractor();
  }

  async get(user_id: string): Promise<UserData | null> {
    const res_data = await this.interactor.get(this.COLLECTION_NAME, user_id);
    if (!res_data) return null;

    const user_data = UserMapper.mapDocDataToUserData(res_data);
    return user_data;
  }

  async getPublicData(user_id: string): Promise<UserPublicData | null> {
    const res_data = await this.interactor.get(this.COLLECTION_NAME, user_id);
    if (!res_data) return null;

    const user_public_data = UserMapper.mapDocDataToUserPublicData(res_data);
    return user_public_data;
  }

  async fullTextSearch(limitNum: number, serchWords: Array<string>) {
    const res_data = await this.interactor.fullTextSearch(this.COLLECTION_NAME, limitNum, serchWords);
    if (!res_data) return null;

    const user_data_list: UserPublicData[] = [];
    for (let i = 0; i < res_data.length; i++) {
      const new_user_data = await UserMapper.mapDocDataToUsePublicData(res_data[i]);
      if (new_user_data !== null) user_data_list.push(new_user_data);
    }

    return user_data_list;
  }

  async set(data: UserFormData): Promise<UserData | null> {
    const create_data: UserCreateData = {
      ...data,
      followers: [],
      follows: [],
    };
    const { id: {} = {}, ...body_data } = create_data; // ignore id property

    //検索に使うマップを作成
    const bigramtokens_map: any = {};
    nOrLessGramTokenize(body_data.name, 2).forEach((aToken) => {
      bigramtokens_map[aToken] = true;
    });

    const tags_map: any = {};
    /*
    body_data.tags.forEach((aTag) => {
      tags_map[aTag] = true;
    });
    */
    const body_data_with_serchtoken = Object.assign(body_data, {
      bigramtokens_map: bigramtokens_map,
      tags_map: tags_map,
    });

    const res_data = await this.interactor.set(this.COLLECTION_NAME, data.id, body_data_with_serchtoken);
    if (!res_data) return null;

    const user_data = UserMapper.mapDocDataToUserData(res_data);
    return user_data;
  }

  async update(data: PartiallyIgnorePartial<UserFormData, "id">): Promise<boolean | null> {
    const { id: {} = {}, ...update_data } = data; // ignore id property
    const result = await this.interactor.update(this.COLLECTION_NAME, data.id, update_data);
    return result;
  }
}
