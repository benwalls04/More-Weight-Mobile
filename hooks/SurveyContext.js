import React, { useState, useContext } from "react";
import { useUserContext } from "./UserContext";

export const SurveyContext = React.createContext();

export function useSurveyContext() {
  const surveyState = useContext(SurveyContext);

  if (surveyState === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return surveyState;
}

// FIXME: make an index for current route and an array of all routes (constant) for navigation 

export function SurveyProvider({children}) {

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
    setExperience: setExperience,
    setDays: setDays,
    setBias: setBias,
    setBase: setBase,
    setSplit: setSplit,
    setStyle: setStyle,
    setSets: setSets,
    setTime: setTime,
    setAccessories: setAccessories,
    setRegions: setRegions,
    setMovements: setMovements, 
    formatParams: formatParams,
    finish: finish
  }

  return (
    <SurveyContext.Provider value={surveyState}>
      {children}
    </SurveyContext.Provider>
  )
} 