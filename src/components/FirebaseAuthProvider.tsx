import { getAuth, User } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";

import UserInteractor from "@/interactors/User/UserInteractor";
import { UserData } from "@/interactors/User/UserTypes";
import { FirebaseAuthContextState, INITIAL_FIREBASE_CONTEXT_STATE } from "@/types/auth";

interface Props {
  children: ReactNode;
}

export const FirebaseAuthContext = createContext<FirebaseAuthContextState>(INITIAL_FIREBASE_CONTEXT_STATE);

const FirebaseAuthProvider = (props: Props) => {
  const auth = getAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const user_interactor = new UserInteractor();

  useEffect(() => {
    const setUserData = async (user_id: string): Promise<void> => {
      const user_data = await user_interactor.get(user_id);
      setUser(user_data);
    };

    const unsubscribed = auth.onAuthStateChanged((new_user: User | null) => {
      if (new_user && new_user.emailVerified) {
        setUserData(new_user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribed();
  }, [auth]);

  return <FirebaseAuthContext.Provider value={{ user: user }}>{props.children}</FirebaseAuthContext.Provider>;
};

export default FirebaseAuthProvider;
