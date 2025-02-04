import React, { useState, useContext } from "react";
import { useUserContext } from "./UserContext";
import { SURVEY_DATA } from "@/constants/Survey"
import { useRouter } from "expo-router";

export const SurveyContext = React.createContext();

export function useSurveyContext() {
  const surveyState = useContext(SurveyContext);
  return surveyState;
}

export function SurveyProvider({children}) {

  // fixme set up this context call
  const { setUserData } = useUserContext();

  const router = useRouter();

  const updateSurveyData = (index, value) => {
    const newData = {...surveyData};
    newData[index] = value;
    setSurveyData(newData);
  }

  const goToBase = async () => {
    // render loading screen from caller 

    // look at former project for the data format 
    // format data all data - set user data to that 
    const userData = formatData();
    const params = {schedule: userData.schedule, bias: userData.bias}

    await axios.get('https://more-weight.com/splits', { params: params }).then((response) => {
      // these value are in a different context - see if there is an initialization function
      setSplits(response.data);
      setLeaf(response.data.selection);
      setRoot(response.data);
    });

    router.push('/base')
  }

  const finish = () => {
    //const userState = useUserContext();
  }

  const [surveyData, setSurveyData] = useState(Array(SURVEY_DATA.length).fill([]));

  const surveyState = {
    finish: finish, 
    surveyData: surveyData,
    updateSurveyData: updateSurveyData,
    goToBase: goToBase
  }


  return (
    <SurveyContext.Provider value={surveyState}>
      {children}
    </SurveyContext.Provider>
  )
} 