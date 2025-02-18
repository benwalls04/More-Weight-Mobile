import React, { useState, useContext } from "react";
import axios from "axios";
import { router } from "expo-router";

export const UserContext = React.createContext();

export function useUserContext() {
  const userState = useContext(UserContext);

  if (userState === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return userState;
}

export function UserProvider({children}) {
  const [username, setUsername] = useState("");
  const [routine, setRoutine] = useState([]);
  const [info, setInfo] = useState({});
  const [split, setSplit] = useState([]);

  const login = async (username, password) => {
    if (validInput(username) && validInput(password)) {
      try {
        const response = await axios.get('https://more-weight.com/login', {
          params: { username, password }
        });
        setRoutine(response.data.routine);
        setUsername(username);
        setInfo(response.data.inputs);
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
  }

  const signup = async (username, password, confirmPassword) => {
    if (validInput(username) && validInput(password)) {
      if (password !== confirmPassword) {
        return "Passwords do not match";
      }

      try {
        const params = formatParams(info);
        const response = await axios.post('https://more-weight.com/new-user', {
          inputs: params, username: username.toLowerCase(), password: password.toLowerCase()
        });
        setRoutine(response.data.routine);
        setUsername(username);
        router.push("/(main)/EditPage")
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            return "Incorrect username and password";
          } else if (error.response.status === 409) {
            return "Username already exists";
          } else {
            return `Server error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`;
          }
        } else if (error.request) {
          return "No response from server. Please check your network connection.";
        } else {
          return `Error: ${error.message}`;
        }
      }
    } else {
      return "Please enter a valid username and password";
    }

    function formatParams() {
      const res = {...info};
      res.base = "dummy value";
      res.splits = {};
      res.splits.selection = split;
      res.numDays = 7;
      res.title = "dummy value";
      return res;
    }
  }

  const userState = {
    username: username, 
    routine: routine, 
    setRoutine: setRoutine,
    split: split,
    setSplit: setSplit,
    info: info,
    setInfo: setInfo,
    login: login,
    signup: signup,
  }

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  )

  function validInput(string) {
    const invalidCharacters = /\s|[\x00-\x1F\x7F-\x9F]/;
    return string.length > 0 && !invalidCharacters.test(string);
  }
}