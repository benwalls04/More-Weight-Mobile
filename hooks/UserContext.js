import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';

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
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    if (routineCpy.length > 0 && fromSignup) {
      router.push("/(main)/EditPage");
      setFromSignup(false);
      setNewUser(true);
    }
  }, [routineCpy]);

  function formatParams(title=null, splitArg=null) {
    const res = {...info};
    res.base = title ? title : splitTitle;
    res.splits = {};
    res.splits.selection = splitArg ? splitArg : split;
    res.numDays = 7;
    res.title = title ? title : splitTitle;
    return res;
  }

  const login = async (username, password) => {
    if (validInput(username) && validInput(password)) {
      try {
        const response = await axios.post('https://more-weight.com/login', {
          username: username,
          password: password
        });
        setRoutine(response.data.routine.routine);
        setRoutineCpy(response.data.routine.routine);
        setLog(response.data.log);
        setRecents(response.data.recents);
        setUsername(username);
        setSplitTitle(response.data.routine.title);
        setInfo(response.data.inputs);
        setAllRoutines(response.data.allRoutines.array);
        SecureStore.setItemAsync("username", username);
        SecureStore.setItemAsync("password", password);
        SecureStore.setItemAsync("isLoggedIn", JSON.stringify(true));
        router.replace("/(main)/(tabs)/WorkoutPage");
        return "success";
      } catch (error) {
        if (error.response?.status === 400) {
          return "incorrect username and password";
        }
        return "incorrect username or password";
      }
    } else {
      return "please enter a valid username and password";
    }
  }

  const signup = async (username, password, confirmPassword) => {
    if (validInput(username) && validInput(password)) {
      setIsSigningUp(true);
      if (password !== confirmPassword) {
        return "Passwords do not match";
      }
      try {
        const params = formatParams();
        setInfo(params);
        const response = await axios.post('https://more-weight.com/new-user', {
          inputs: params, username: username.toLowerCase(), password: password.toLowerCase(), numSets: info.sets
        });
        setRoutine(response.data.routine);
        setRoutineCpy(response.data.routine);
        setAllRoutines([{routine: response.data.routine, title: splitTitle, numSets: info.sets}])
        setUsername(username);
        setFromSignup(true);
        SecureStore.setItemAsync("username", username);
        SecureStore.setItemAsync("password", password);
        SecureStore.setItemAsync("isLoggedIn", JSON.stringify(true));
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
      } finally {
        setIsSigningUp(false);
      }
    } else {
      return "Please enter a valid username and password";
    }
  }

  const signOut = () => {
    router.replace("/");

    setUsername("");
    setRoutine([]);
    setRoutineCpy([]);
    setAllRoutines([]);
    setInfo({sets: 3, exp: "i"});
    setSplitTitle("");
    setSplit([]);
    setLog([]);
    setRecents([]);
    setNewUser(false);
    SecureStore.setItemAsync("username", "");
    SecureStore.setItemAsync("password", "");
    SecureStore.setItemAsync("isLoggedIn", JSON.stringify(false));
  }

  const deleteAccount = async () => {
    await axios.delete('https://more-weight.com/delete-account', {
      data: { username: username }  
    }).then(() => {
      signOut();
    }).catch(error => {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong. Please try again.");
    });
  }

  const [isSavingRoutine, setIsSavingRoutine] = useState(false);
  const addRoutine = async (title, split) => {
    setIsSavingRoutine(true);
    const params = formatParams(title, split);
    setInfo(params);
    try {
      const response = await axios.post('https://more-weight.com/add-routine', {
        inputs: params,
        username: username.toLowerCase(),
        split: split
      });
      setRoutine(response.data.routine);
      setRoutineCpy(response.data.routine);
      router.push("/(main)/EditPage");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSavingRoutine(false);
    }
  }

  const logSet = async (movement, weight, reps, variant) => {
    await axios.post('https://more-weight.com/log-set', {
      username: username,
      movement: movement,
      weight: weight,
      reps: reps,
      variant: variant,
      RPE: 10
    })
  }

  const getTargets = async (movement) => {
    await axios.get('https://more-weight.com/get-last', {
      params: { username: username, movement: movement, numberOfSets: info.sets }
    }).then(response => {
      return {weight: response.data.weight, reps: response.data.reps};
    }).catch(error => {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong. Please try again.");
    });
  }

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
    setNewUser: setNewUser,
    signOut: signOut,
    isSigningUp: isSigningUp,
    isSavingRoutine: isSavingRoutine,
    deleteAccount: deleteAccount
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