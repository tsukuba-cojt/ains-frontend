import { getAuth, User } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";

import { FirebaseAuthContextState, INITIAL_FIREBASE_CONTEXT_STATE } from "@/types/auth";

interface Props {
  children: ReactNode;
}

export const FirebaseAuthContext = createContext<FirebaseAuthContextState>(INITIAL_FIREBASE_CONTEXT_STATE);

const FirebaseAuthProvider = (props: Props) => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((new_user: User | null) => {
      if (new_user) {
        setUser(new_user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribed();
  }, [auth]);

  return <FirebaseAuthContext.Provider value={{ user: user }}>{props.children}</FirebaseAuthContext.Provider>;
};

export default FirebaseAuthProvider;
