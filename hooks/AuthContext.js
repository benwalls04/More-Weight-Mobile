import React, { useState, useContext, useEffect } from "react";
import { Appearance } from "react-native";
import { useUserContext } from "@/hooks/UserContext";
import axios from "axios";

export const AuthContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isNew, setIsNew] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { setUsername, setRoutine } = useUserContext();

  const login = async (username, password) => {
    if (validInput(username) && validInput(password)) {
      try {
        const response = await axios.get('https://more-weight.com/login', {
          params: { username, password }
        });
        setRoutine(response.data.routine);
        setUsername(username);
        setIsAuth(true);
        return "success";
      } catch (error) {
        if (error.response?.status === 400) {
          return "incorrect username and password";
        }
        return "error";
      }
    } else {
      return "please enter a valid username and password";
    }
  };

  const authState = {
    isNew: isNew,
    setIsNew: setIsNew,
    isAuth: isAuth,
    login: login,
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  )

  function validInput(string) {
    const invalidCharacters = /\s|[\x00-\x1F\x7F-\x9F]/;
    return string.length > 0 && !invalidCharacters.test(string);
  }
}
