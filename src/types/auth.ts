import { UserData } from "@/interactors/User/UserTypes";

export const INITIAL_FIREBASE_CONTEXT_STATE: FirebaseAuthContextState = {
  user: null,
};
export interface FirebaseAuthContextState {
  user: UserData | null;
}
