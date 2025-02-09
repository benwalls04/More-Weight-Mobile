import React, { useState, useContext } from "react";

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
  const [exp, setExp] = useState(-1);
  const [numSets, setNumSets] = useState(-1);
  const [split, setSplit] = useState([]);

  const login = async (username, password) => {
    if (validInput(username) && validInput(password)) {
      try {
        const response = await axios.get('https://more-weight.com/login', {
          params: { username, password }
        });
        setRoutine(response.data.routine);
        setUsername(username);
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

  const signup = () => {
    
  }

  const userState = {
    username: username, 
    setUsername: setUsername, 
    routine: routine, 
    setRoutine: setRoutine,
    split: split,
    setSplit: setSplit,
    info: {
      exp: exp, 
      setExp: setExp, 
      numSets: numSets, 
      setNumSets: setNumSets
    },
    login: login,
    signup: signup
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