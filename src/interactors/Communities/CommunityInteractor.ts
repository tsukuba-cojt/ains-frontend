import { increment, arrayUnion, arrayRemove } from "firebase/firestore";

import CommunityMapper from "./CommunityMapper";
import {
  CommunityCreateData,
  CommunityData,
  CommunityFormData,
  LikePostFormData,
  PostCreateData,
  PostData,
  PostFormData,
} from "./CommunityTypes";
import BaseInteractor from "../BaseInteractor";
import FileInteractor from "../File/FileInteractor";
import { FileData } from "../File/FileTypes";

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

  async getPost(community_id: string, post_id: string): Promise<PostData | null> {
    const data = await this.interactor.getSubCollection(this.COLLECTION_NAME, [community_id, "posts"], post_id);
    if (!data) return null;

    return await CommunityMapper.mapDocDataToPostData(data, community_id);
  }

  async getPosts(community_id: string): Promise<PostData[] | null> {
    const data = await this.interactor.FilterAndSubCollections(
      this.COLLECTION_NAME,
      [community_id, "posts"],
      [{ key: "originPost", operator: "==", value: null }]
    );
    if (!data) return null;

    return await Promise.all(data.map((d) => CommunityMapper.mapDocDataToPostData(d, community_id)));
  }

  async getLikedPosts(community_id: string, user_id: string | null): Promise<PostData[] | null> {
    if (!user_id) return [];
    const data = await this.interactor.FilterAndSubCollections(
      this.COLLECTION_NAME,
      [community_id, "posts"],
      [{ key: "likes", operator: "array-contains", value: user_id }]
    );
    if (!data) return null;

    return await Promise.all(data.map((d) => CommunityMapper.mapDocDataToPostData(d, community_id)));
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
      originPost: null,
      repliesAmount: 0,
      files: fileIds,
      likes: [],
    };

    const result = await this.interactor.setSubCollection(
      this.COLLECTION_NAME,
      [data.communityId, "posts"],
      this.interactor.uuidv4(),
      createData
    );
    if (!result) return null;

    return CommunityMapper.mapDocDataToPostData(result, data.communityId);
  }

  async getReplies(communityId: string, postId: string): Promise<PostData[] | null> {
    const subCollections = await this.interactor.FilterAndSubCollections(
      this.COLLECTION_NAME,
      [communityId, "posts"],
      [{ key: "originPost", operator: "==", value: postId }]
    );
    if (!subCollections) return null;

    return await Promise.all(
      subCollections.map(async (data) => CommunityMapper.mapDocDataToPostData(data, communityId))
    );
  }

  async reply(data: PostFormData & { originPost: string }): Promise<PostData | null> {
    const fileInteractor = new FileInteractor();
    const nullableFiles =
      data.files && (await Promise.all(data.files.map(async (f: File) => fileInteractor.upload(f))));
    const fileIds = nullableFiles && nullableFiles.filter((f: FileData | null) => f).map((f: FileData) => f!.id);
    const createData: PostCreateData = {
      ...data,
      files: fileIds,
      likes: [],
      repliesAmount: 0,
    };

    const result = await this.interactor.setSubCollection(
      this.COLLECTION_NAME,
      [data.communityId, "posts"],
      this.interactor.uuidv4(),
      createData
    );
    if (!result) return null;

    if (
      !(await this.interactor.updateSubCollection(this.COLLECTION_NAME, [data.communityId, "posts"], data.originPost, {
        repliesAmount: increment(1),
      }))
    )
      return null;

    return CommunityMapper.mapDocDataToPostData(result, data.communityId);
  }

  async likePost(data: LikePostFormData): Promise<boolean | null> {
    return await this.interactor.updateSubCollection(this.COLLECTION_NAME, [data.community_id, "posts"], data.post_id, {
      likes: data.remove ? arrayRemove(data.user_id) : arrayUnion(data.user_id),
    });
  }

  async join(community_id: string, user_id: string): Promise<boolean | null> {
    return await this.interactor.update(this.COLLECTION_NAME, community_id, { members: arrayUnion(user_id) });
  }

  async leave(community_id: string, user_id: string): Promise<boolean | null> {
    return await this.interactor.update(this.COLLECTION_NAME, community_id, { members: arrayRemove(user_id) });
  }
}
