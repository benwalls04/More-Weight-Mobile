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
  const [allRoutines, setAllRoutines] = useState([]);
  const [info, setInfo] = useState({sets: 3, exp: "i"});
  const [splitTitle, setSplitTitle] = useState("");
  const [split, setSplit] = useState([]);
  const [log, setLog] = useState([]);
  const [recents, setRecents] = useState([]);
  const [fromSignup, setFromSignup] = useState(false);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    if (routineCpy.length > 0 && fromSignup) {
      router.push("/(main)/EditPage");
      setFromSignup(false);
      setNewUser(true);
    }
  }, [routineCpy]);

  function formatParams() {
    const res = {...info};
    res.base = splitTitle;
    res.splits = {};
    res.splits.selection = split;
    res.numDays = 7;
    res.title = splitTitle;
    return res;
  }

  const login = async (username, password) => {
    if (validInput(username) && validInput(password)) {
      try {
        const response = await axios.get('http://localhost:3001/login', {
          params: { username, password }
        });
        setRoutine(response.data.routine.routine);
        setRoutineCpy(response.data.routine.routine);
        setLog(response.data.log);
        setRecents(response.data.recents);
        setUsername(username);
        setSplitTitle(response.data.routine.title);
        setInfo(response.data.inputs);
        setAllRoutines(response.data.allRoutines.array);
        router.replace("/(main)/(tabs)/WorkoutPage");
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
        setInfo(params);
      
        const response = await axios.post('http://localhost:3001/new-user', {
          inputs: params, username: username.toLowerCase(), password: password.toLowerCase(), numSets: info.sets
        });
        setRoutine(response.data.routine);
        setRoutineCpy(response.data.routine);
        setAllRoutines([{routine: response.data.routine, title: splitTitle, numSets: info.sets}])
        setUsername(username);
        setFromSignup(true);
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
  }

  const addRoutine = async (username, split) => {
    const params = formatParams(info);
    setInfo(params);
  
    const response = await axios.post('http://localhost:3001/add-routine', {
      inputs: params, username: username.toLowerCase(), split: split
    });

    setRoutine(response.data.routine);
    setRoutineCpy(response.data.routine);
    setAllRoutines(prev => [...prev, {title: splitTitle, routine: response.data.routine}]);

    router.push("/(main)/EditPage");
  }

  const logSet = async (movement, weight, reps, variant) => {
    await axios.post('http://localhost:3001/log-set', {
      username: username,
      movement: movement,
      weight: weight,
      reps: reps,
      variant: variant,
      RPE: 10
    });
  }

  const getTargets = async (movement) => {
    const response = await axios.get('http://localhost:3001/get-last', {
      params: { username: username, movement: movement, numberOfSets: info.sets }
    });
    return [response.data.weight, response.data.reps];
  }

  console.log(info)

  const userState = {
    username: username, 
    setRoutine: setRoutine,
    routine: routine, 
    allRoutines: allRoutines,
    setAllRoutines: setAllRoutines,
    split: split,
    setSplit: setSplit,
    routineCpy: routineCpy,
    setRoutineCpy: setRoutineCpy,
    info: info,
    setInfo: setInfo,
    splitTitle: splitTitle,
    setSplitTitle: setSplitTitle,
    login: login,
    signup: signup,
    addRoutine: addRoutine,
    logSet: logSet,
    getTargets: getTargets,
    log: log,
    setLog: setLog,
    recents: recents,
    setRecents: setRecents,
    newUser: newUser,
    setNewUser: setNewUser
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