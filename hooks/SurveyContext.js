import React, { useState, useContext } from "react";
import { useUserContext } from "@/hooks/UserContext";
import { SURVEY_DATA } from "@/constants/Survey"
import { useRouter } from "expo-router";
import { useSplitsContext } from "@/hooks/SplitsContext";
import axios from "axios";

export const SurveyContext = React.createContext();

export function useSurveyContext() {
  const surveyState = useContext(SurveyContext);
  return surveyState;
}

export function SurveyProvider({children}) {

  // FIXME: set up this context call
  const { setInfo } = useUserContext();
  const { setRoot, setSplits, setLeaf } = useSplitsContext();
  const router = useRouter();

  const checkErrors = () => {
    let errors = {}

    SURVEY_DATA.forEach((item, index) => {
      if (item.required && surveyData[index].length === 0) {
        errors[index] = "This field is required";
      } else if (item.type === "many" && item.minimum && surveyData[index].length < item.minimum) {
        errors[index] = "Please select at least " + item.minimum + " options";
      }
    })

    return errors;
  }

  const formatData = () => {
    let res = {};
    const inputs = {...surveyData};
    const skip = new Set();

    res.schedule = Array(7).fill("rest");
    const DAYS_INDX = SURVEY_DATA.findIndex(item => item.key === "schedule");
    inputs[DAYS_INDX].forEach(i => res.schedule[i] = "lift");
    skip.add(DAYS_INDX);

    res.bias = []
    const BIAS_INDX = SURVEY_DATA.findIndex(item => item.key === "bias");
    SURVEY_DATA[BIAS_INDX].options.forEach((val, i) => {
      if (inputs[BIAS_INDX].includes(i)) {
        res.bias.push(.75)
      } else {
        res.bias.push(.5)
      }
    })
    skip.add(BIAS_INDX);
    
    const STYLE_INDX = SURVEY_DATA.findIndex(item => item.key === "style");
    const style_choice = inputs[STYLE_INDX][0];
    if (!style_choice) {
      res.style = "n";
    } else {
      res.style = style_choice < .33 ? "b" : style_choice < .66 ? "n" : "p";
    }
    skip.add(STYLE_INDX);

    skip.add(SURVEY_DATA.length);

    // ABOVE NEED TO BE FORMALIZED 
    SURVEY_DATA.forEach((INFO, INDX) => {
      if (skip.has(INDX)) return;

      if (INFO.type === "one") {
        res[INFO.key] = INFO.options[inputs[INDX][0]].res;
      } else if (INFO.type === "many") {
        res[INFO.key] = []
        INFO.options.forEach((val, i) => {
          if (inputs[INDX].includes(i)) {
            res[INFO.key].push(val.res)
          }
        })
      } else if (INFO.type === "range") { 
        res[INFO.key] = inputs[INDX][0] ? inputs[INDX][0] * 100 : 50;
      }
    })

    return res;
  }

  const updateSurveyData = (index, value) => {
    const newData = {...surveyData};
    newData[index] = value;
    setSurveyData(newData);
  }

  const getSplits = async () => {
    // render loading screen from caller 

    const userData = formatData();
    const params = {schedule: userData.schedule, bias: userData.bias}

    await axios.get('https://more-weight.com/splits', { params: params }).then((response) => {
      setSplits(response.data);
      setLeaf(response.data.selection);
      setRoot(response.data);
    });

    setInfo(userData);

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
    getSplits: getSplits,
    checkErrors: checkErrors
  }


  return (
    <SurveyContext.Provider value={surveyState}>
      {children}
    </SurveyContext.Provider>
  )
} 