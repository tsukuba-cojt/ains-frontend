import { PartiallyIgnorePartial } from "@/types/util";

import UserMapper from "./UserMapper";
import { UserPublicData, UserData, UserFormData, UserCreateData } from "./UserTypes";
import BaseInteractor from "../BaseInteractor";
import FileInteractor from "../File/FileInteractor";
import { FileData } from "../File/FileTypes";

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

  async set(data: UserFormData): Promise<UserData | null> {
    let file: FileData | null = null;
    if (data.icon) {
      file = await new FileInteractor().upload(data.icon);
    }

    const create_data: UserCreateData = {
      ...data,
      icon: file?.url || undefined,
      followers: [],
      follows: [],
    };
    const { id: {} = {}, ...body_data } = create_data; // ignore id property
    const res_data = await this.interactor.set(this.COLLECTION_NAME, data.id, body_data);
    if (!res_data) return null;

    const user_data = UserMapper.mapDocDataToUserData(res_data);
    return user_data;
  }

  async update(data: PartiallyIgnorePartial<UserFormData, "id">): Promise<boolean | null> {
    let file: FileData | null = null;
    if (data.icon) {
      file = await new FileInteractor().upload(data.icon);
    }

    const update_data = {
      ...data,
      icon: file?.id || undefined,
    };
    const { id: {} = {}, ...no_id_update_data } = update_data; // ignore id property
    const result = await this.interactor.update(this.COLLECTION_NAME, data.id, no_id_update_data);
    return result;
  }
}
