import { User } from "firebase/auth";

export const INITIAL_FIREBASE_CONTEXT_STATE: FirebaseAuthContextState = {
  user: null,
};
export interface FirebaseAuthContextState {
  user: User | null;
}
