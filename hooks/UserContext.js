import React, { useState } from "react";

const UserContext = React.createContext();

export function UserProvider({children}) {
  const [username, setUsername] = useState("");
  const [routine, setRoutine] = useState([]);
  const [exp, setExp] = useState(-1);
  const [numSets, setNumSets] = useState(-1);

  return (
    <UserContext.Provider value={{username, setUsername, routine, setRoutine, exp, setExp, numSets, setNumSets}}>
      {children}
    </UserContext.Provider>
  )
}