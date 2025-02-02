import React, { useState, useContext } from "react";
import { useUserContext } from "./UserContext";
import { SURVEY_DATA } from "@/constants/Survey"

export const SurveyContext = React.createContext();

export function useSurveyContext() {
  const surveyState = useContext(SurveyContext);
  return surveyState;
}

export function SurveyProvider({children}) {

  const updateSurveyData = (index, value) => {
    const newData = {...surveyData};
    newData[index] = value;
    setSurveyData(newData);
  }

  const finish = () => {
    //const userState = useUserContext();
  }

  const [surveyData, setSurveyData] = useState(Array(SURVEY_DATA.length).fill([]));

  const surveyState = {
    finish: finish, 
    surveyData: surveyData,
    updateSurveyData: updateSurveyData
  }


  return (
    <SurveyContext.Provider value={surveyState}>
      {children}
    </SurveyContext.Provider>
  )
} 