import React, { useState, useContext} from "react";
import UserContext from "@/hooks/UserContext";
import axios from "axios";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [isNew, setIsNew] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const {setUsername, setRoutine} = useContext(UserContext);
    
  const logIn = async (username, password) => {
    if (validInput(username) && validInput(password)){
      try {
        const response = await axios.get('https://more-weight.com/login', {
          params: { username: username, password: password }
        });
        setRoutine(response.data.routine);
        setUsername(username);
        setIsAuth(true);
        //setInputs(response.data.inputs);
        //setLog(response.data.log);
        //setRecents(response.data.recents);
        //navigate('/profile');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          return error.response.data.message;
        } else {
          return "error";
        }
      }
    } else {
      return "please enter a valid username and password";
    }
  }

  const signUp = async (username, password) => {
    if (validInput(username) && validInput(password)){
      try {
        // FIXME: dummy data
        const inputData = {};
        await axios.post('https://more-weight.com/new-user', {inputs: inputData, username: username, password: password}).then(response => {
          setRoutine(response.data);
          setUsername(username);
          setIsNew(false);
          setIsAuth(true);
          //navigate('/edit');
        })
      } catch (error) {
        if (error.response && error.response.status === 400) {
          return error.response.data.message
        } else {
          return "error";
        }
      }
    } else {
      return "please enter a valid username and password";
    }
  }

  return (
    <AuthContext.Provider value={{newUser, isAuth, logIn, signUp}}>
      {children}
    </AuthContext.Provider>
  )

  function validInput(string) {
    const invalidCharacters = /\s|[\x00-\x1F\x7F-\x9F]/;
    const valid = string.length > 0 && !invalidCharacters.test(string);
    return valid;
  }
}