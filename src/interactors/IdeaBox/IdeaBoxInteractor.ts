import BaseInteractor from "../BaseInteractor";

export default class IdeaBoxInteractor {
  readonly interactor: BaseInteractor;
  readonly COLLECTION_NAME = "ideaboxes";
  constructor() {
    this.interactor = new BaseInteractor();
  }

  async update(data: any): Promise<boolean | null> {
    // TODO
    return false;
  }

  async delete(data: any): Promise<boolean | null> {
    // TODO
    return false;
  }
}
