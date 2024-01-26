import { increment } from "firebase/firestore";

import CommunityMapper from "./CommunityMapper";
import {
  CommunityCreateData,
  CommunityData,
  CommunityFormData,
  PostCreateData,
  PostData,
  PostFormData,
  ReplyData,
  ReplyFormData,
} from "./CommunityTypes";
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

  async getLatests(limit: number, startId: string | null = null): Promise<CommunityData[] | null> {
    const res_data = await this.interactor.getLatests(this.COLLECTION_NAME, limit, startId);
    if (!res_data) return null;

    const community_data_list: CommunityData[] = [];
    for (let i = 0; i < res_data.length; i++) {
      const new_community_data = await CommunityMapper.mapDocDataToCommunityData(res_data[i]);
      if (new_community_data !== null) community_data_list.push(new_community_data);
    }

    return community_data_list;
  }

  async getPosts(community_id: string): Promise<PostData[] | null> {
    const data = await this.interactor.getSubCollections(this.COLLECTION_NAME, community_id, "posts");
    if (!data) return null;

    return await Promise.all(data.map((d) => CommunityMapper.mapDocDataToPostData(d)));
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

  async post(data: PostFormData): Promise<PostData | null> {
    const fileInteractor = new FileInteractor();
    const nullableFiles =
      data.files && (await Promise.all(data.files.map(async (f: File) => fileInteractor.upload(f))));
    const fileIds = nullableFiles && nullableFiles.filter((f) => f).map((f) => f!.id);
    const createData: PostCreateData = {
      ...data,
      files: fileIds,
      likes: [],
    };

    const result = await this.interactor.setSubCollection(
      this.COLLECTION_NAME,
      [data.community_id, "posts"],
      this.interactor.uuidv4(),
      createData
    );
    if (!result) return null;

    return CommunityMapper.mapDocDataToPostData(result);
  }

  async getReplies(postId: string): Promise<ReplyData[] | null> {
    const subCollections = await this.interactor.getSubCollections(this.COLLECTION_NAME, postId, "replies");
    if (!subCollections) return null;

    return await Promise.all(subCollections.map(async (data) => CommunityMapper.mapDocDataToReplyData(data)));
  }

  async reply(data: ReplyFormData): Promise<ReplyData | null> {
    const fileInteractor = new FileInteractor();
    const nullableFiles =
      data.files && (await Promise.all(data.files.map(async (f: File) => fileInteractor.upload(f))));
    const fileIds = nullableFiles && nullableFiles.filter((f) => f).map((f) => f!.id);
    const createData: PostCreateData = {
      ...{ ...data, originPost: undefined },
      files: fileIds,
      likes: [],
    };

    const result = await this.interactor.setSubCollection(
      this.COLLECTION_NAME,
      [data.community_id, "posts", data.originPost, "replies"],
      this.interactor.uuidv4(),
      createData
    );
    if (!result) return null;

    if (!(await this.interactor.update(this.COLLECTION_NAME, data.originPost, { replies_num: increment(1) })))
      return null;

    return CommunityMapper.mapDocDataToReplyData(result);
  }
}
