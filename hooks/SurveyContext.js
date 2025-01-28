import React, { useState, useContext } from "react";
import { useUserContext } from "./UserContext";

export const SurveyContext = React.createContext();

export function useSurveyContext() {
  const surveyState = useContext(SurveyContext);
  return surveyState;
}

// FIXME: make an index for current route and an array of all routes (constant) for navigation 

export function SurveyProvider({children}) {

  const setData = (key, value) => {
    switch (key) {
      case "experience":
        setExperience(value);
        break;
      case "days":
        setDays(value);
        break;
      case "bias":
        setBias(value);
        break;
      case "style":
        setStyle(value);
        break;
      case "sets":
        setSets(value);
        break;
      case "time":
        setTime(value);
        break;
      case "accessories":
        setAccessories(value);
        break;
      case "regions":
        setRegions(value);
        break;
      case "movements":
        setMovements(value);
        break;
      case "base":
        setBase(value);
        break;
      case "split":
        setSplit(value);
        break;
    }
  }

  const finish = () => {
    //const userState = useUserContext();
  }

  const formatParams = (tmpBias) => {
    const params = {
      schedule: days, 
      bias: tmpBias
    }

    return params;
  }

  const [experience, setExperience] = useState('');
  const [days, setDays] = useState({});
  const [bias, setBias] = useState({});
  const [base, setBase] = useState([]);
  const [split, setSplit] = useState([]);
  const [style, setStyle] = useState(-1.0);
  const [sets, setSets] = useState(-1);
  const [time, setTime] = useState(-1.0);
  const [accessories, setAccessories] = useState({});
  const [regions, setRegions] = useState({
    chest: -1.0, 
    back: -1.0, 
    legs: -1.0
  });
  const [movements, setMovements] = useState({
    "horiz-press": null, 
    "vert-press": null, 
    "horiz-pull": null, 
    "vert-pull": null,  
    "knee-flex": null, 
    "hip-ext": null, 
    "curl": null, 
    "ext": null, 
  });

  const surveyState = {
    experience: [experience, setExperience],
    days: [days, setDays],
    bias: [bias, setBias],
    style: [style, setStyle],
    sets: [sets, setSets],
    time: [time, setTime],
    accessories: [accessories, setAccessories],
    regions: [regions, setRegions],
    movements: [movements, setMovements], 
    base: [base, setBase],
    split: [split, setSplit],
    formatParams: formatParams,
    finish: finish, 
    setData: setData
  }


  return (
    <SurveyContext.Provider value={surveyState}>
      {children}
    </SurveyContext.Provider>
  )
} 