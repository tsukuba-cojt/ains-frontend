import UserMapper from "./UserMapper";
import { UserCreateData, UserPublicData, UserData } from "./UserTypes";
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

    const user_public_data = UserMapper.mapDocDataToUsePublicData(res_data);
    return user_public_data;
  }

  async set(data: UserCreateData): Promise<UserData | null> {
    const { id: {} = {}, ...body_data } = data; // ignore id property
    const res_data = await this.interactor.set(this.COLLECTION_NAME, data.id, body_data);
    if (!res_data) return null;

    const user_data = UserMapper.mapDocDataToUserData(res_data);
    return user_data;
  }
}
