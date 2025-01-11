import React, { useState, useContext, useEffect } from "react";
import { Appearance } from "react-native";

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

  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemTheme | 'dark');

  useEffect(() => {
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme); 
  });

  return () => subscription.remove();
}, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  const authState = {
    isNew: isNew,
    setIsNew: setIsNew,
    isAuth: isAuth,
    setIsAuth: setIsAuth,
    theme: theme,
    toggleTheme: toggleTheme
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  )
}
