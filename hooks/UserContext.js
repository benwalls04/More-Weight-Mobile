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

  const userState = {
    username: username, 
    setUsername: setUsername, 
    routine: routine, 
    setRoutine: setRoutine,
    info: {
      exp: exp, 
      setExp: setExp, 
      numSets: numSets, 
      setNumSets: setNumSets
    }
  }

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  )
}