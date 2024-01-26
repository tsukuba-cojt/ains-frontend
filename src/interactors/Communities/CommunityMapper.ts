import { DocumentData } from "firebase/firestore";

import CommunityInteractor from "./CommunityInteractor";
import { CommunityData, PostData, ReplyData } from "./CommunityTypes";
import FileInteractor from "../File/FileInteractor";
import UserInteractor from "../User/UserInteractor";
import { deletedUser } from "../User/UserTypes";

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
      created_at: data.created_at.toDate ? new Date(data.created_at.toDate()) : new Date(),
      updated_at: data.updated_at.toDate ? new Date(data.updated_at.toDate()) : new Date(),
    };
  }

  static async mapDocDataToPostData(data: DocumentData): Promise<PostData> {
    const fileInteractor = new FileInteractor();
    const files =
      data.files &&
      Array.isArray(data.files) &&
      (await Promise.all(data.files.map((fileId: string) => fileInteractor.get(fileId))));

    const author = (await new UserInteractor().getPublicData(data.author)) || deletedUser;

    const replies = await new CommunityInteractor().getReplies(data.id);

    return {
      id: data.id,
      content: data.content,
      files: files,
      likes: data.likes,
      replies: replies || [],
      author: author,
      created_at: data.created_at.toDate ? new Date(data.created_at.toDate()) : new Date(),
      updated_at: data.updated_at.toDate ? new Date(data.updated_at.toDate()) : new Date(),
    };
  }

  static async mapDocDataToReplyData(data: DocumentData): Promise<ReplyData> {
    const fileInteractor = new FileInteractor();
    const files =
      data.files &&
      Array.isArray(data.files) &&
      (await Promise.all(data.files.map((fileId: string) => fileInteractor.get(fileId))));

    const author = (await new UserInteractor().getPublicData(data.author)) || deletedUser;

    return {
      id: data.id,
      content: data.content,
      files: files,
      likes: data.likes,
      replies_num: data.replies_num,
      author: author,
      created_at: data.created_at.toDate ? new Date(data.created_at.toDate()) : new Date(),
      updated_at: data.updated_at.toDate ? new Date(data.updated_at.toDate()) : new Date(),
    };
  }
}
