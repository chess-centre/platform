import React, { useReducer } from "react";
import { initialState, AuthReducer } from "./reducer";

interface User {
  user: UserProps
}

interface UserProps {
  username: string | null
  attributes: AttributeProps | null
  userConfirmed: boolean | null
}

interface AttributeProps {
  sub: string | null

}

const AuthStateContext = React.createContext<User>({ user: { username: "", attributes: null, userConfirmed: false }});
const AuthDispatchContext = React.createContext({});

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (!context) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
