import React, { useState, useContext } from "react";

export const AuthContext = React.createContext();

export function useAuthContext() {
  const authState = useContext(AuthContext);

  if (authState === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return authState;
}

export function AuthProvider({ children }) {
  const [isNew, setIsNew] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const authState = {
    isNew: isNew,
    setIsNew: setIsNew,
    isAuth: isAuth,
    setIsAuth: setIsAuth
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  )
}
