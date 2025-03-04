import React, { useState, useEffect,useContext } from "react";
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
  const [routineCpy, setRoutineCpy] = useState([]);
  const [info, setInfo] = useState({});
  const [split, setSplit] = useState([]);

  useEffect(() => {
    if (routineCpy.length > 0) {
      router.push("/(main)");
    }
  }, [routineCpy]);

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
        //const params = formatParams(info);

        // FIXME: remove after testing 
        function generateRandomString(length) {
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let result = '';
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          return result;
        }

        const tmpParams = {
          "accessories": ["abs", "rear deltoids"],
          "back": 50,
          "base": "dummy value",
          "bias": [0.5, 0.75, 0.5, 0.5, 0.75, 0.5],
          "chest": 50,
          "curl": "cable curl",
          "exp": "i",
          "extension": "cable overhead extension",
          "hip-extension": "barbell romanian deadlift",
          "horizontal-press": "dumbell bench press",
          "horizontal-pull": "barbell row",
          "knee-flexion": "hack squat",
          "legs": 50,
          "numDays": 7,
          "schedule": ["lift", "lift", "lift", "rest", "rest", "rest", "rest"],
          "sets": 3,
          "splits": {
            "selection": ["back biceps", "legs", "chest shoulders triceps", "rest", "rest", "rest", "rest"]
          },
          "style": "n",
          "time": 45,
          "title": "dummy value",
          "vertical-press": "dumbell overhead press",
          "vertical-pull": "lat pulldown"
        }

        setInfo(tmpParams);
      
        const username = generateRandomString(10);
        const password = generateRandomString(10);

        const response = await axios.post('http://localhost:3001/new-user', {
          inputs: tmpParams, username: username.toLowerCase(), password: password.toLowerCase()
        });
        setRoutine(response.data.routine);
        setRoutineCpy(response.data.routine);
        setUsername(username);
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
    setRoutine: setRoutine,
    routine: routine, 
    split: split,
    setSplit: setSplit,
    routineCpy: routineCpy,
    setRoutineCpy: setRoutineCpy,
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