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

  const formatData2 = () => {
    skip = new Set();

    res.schedule = Array(7).fill("rest");
    DAYS_INDX = SURVEY_DATA.indexOf(item => item.key === "days");
    inputs[DAYS_INDX].forEach(i => res.schedule[i] = "lift");
    skip.add(DAYS_INDX);

    res.bias = []
    BIAS_INFO = SURVEY_DATA.find(item => item.key === "bias");
    BIAS_INDX = SURVEY_DATA.indexOf(BIAS_INFO);
    BIAS_INFO.options.forEach((val, i) => {
      if (inputs[BIAS_INDX].includes(i)) {
        res.bias.push(.75)
      } else {
        res.bias.push(.5)
      }
    })
    skip.add(BIAS_INDX);
    
    STYLE_INDX = SURVEY_DATA.indexOf(item => item.key === "style");
    style_choice = inputs[STYLE_INDX][0];
    res.style = style_choice < .33 ? "b" : style_choice < .66 ? "n" : "p";
    skip.add(STYLE_INDX);

    skip.add(SURVEY_DATA.length - 1);

    // ABOVE NEED TO BE FORMALIZED 
    // FIXME: REMOVE THE IDS FROM THE SURVEY DATA AND JUST USE THE INDEXES

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
        res[INFO.key] = inputs[INDX][0] * 100;
      }
    })
    
  }

  const formatData = () => {
    let res = {};
    const inputs = {...surveyData};

    console.log(inputs);
    
    const EXP_INDX = SURVEY_DATA.findIndex(item => item.key === "experience");
    const exp_choice = inputs[EXP_INDX][0];
    res.exp = exp_choice == 0 ? 'b' : exp_choice == 1 ? 'i' : 'a';

    res.schedule = Array(7).fill("rest");
    const DAYS_INDX = SURVEY_DATA.findIndex(item => item.key === "schedule");
    inputs[DAYS_INDX].forEach(i => res.schedule[i] = "lift");


    const SETS_INDX = SURVEY_DATA.findIndex(item => item.key === "sets");
    const sets_choice = inputs[SETS_INDX][0];
    res.sets = sets_choice + 2;


    const TIME_INDX = SURVEY_DATA.findIndex(item => item.key === "time");
    const TIME_INFO = SURVEY_DATA[TIME_INDX];
    const time_choice = inputs[TIME_INDX][0];
    res.time = TIME_INFO.options[time_choice].title;

    res.accessories = []
    const ACCESS_INDX = SURVEY_DATA.findIndex(item => item.key === "accessories");
    const ACCESS_INFO = SURVEY_DATA[ACCESS_INDX];
    ACCESS_INFO.options.forEach((val, i) => {
      if (inputs[ACCESS_INDX].includes(i)) {
        res.accessories.push(val.title)
      }
    })

    res.bias = []
    const BIAS_INDX = SURVEY_DATA.findIndex(item => item.key === "bias");
    const BIAS_INFO = SURVEY_DATA[BIAS_INDX]
    BIAS_INFO.options.forEach((val, i) => {
      if (inputs[BIAS_INDX].includes(i)) {
        res.bias.push(.75)
      } else {
        res.bias.push(.5)
      }
    })
    
    const STYLE_INDX = SURVEY_DATA.findIndex(item => item.key === "style");
    const  style_choice = inputs[STYLE_INDX].length > 0 ? inputs[STYLE_INDX][0] : .5;
    res.style = style_choice < .33 ? "b" : style_choice < .66 ? "n" : "p";

    const chest_choice = inputs[SURVEY_DATA.findIndex(item => item.key === "chest")]
    res.chest = chest_choice.length > 0 ? chest_choice[0] * 100 : .5;
    const back_choice = inputs[SURVEY_DATA.findIndex(item => item.key === "back")]
    res.back = back_choice.length > 0 ? back_choice[0] * 100 : .5;
    const legs_choice = inputs[SURVEY_DATA.findIndex(item => item.key === "legs")]
    res.legs = legs_choice.length > 0 ? legs_choice[0] * 100 : .5;


    const HORIZ_PRESS_INDX = SURVEY_DATA.findIndex(item => item.key === "horizontal-press");
    const HORIZ_PRESS_INFO = SURVEY_DATA[HORIZ_PRESS_INDX];
    const horiz_press_choice = inputs[HORIZ_PRESS_INDX][0] - 1;
    res["horizontal-press"] = HORIZ_PRESS_INFO.options[horiz_press_choice].res;

    const VERT_PRESS_INDX = SURVEY_DATA.findIndex(item => item.key === "vertical-press");
    const VERT_PRESS_INFO = SURVEY_DATA[VERT_PRESS_INDX];
    const  vert_press_choice = inputs[VERT_PRESS_INDX][0] - 1;
    res["vertical-press"] = VERT_PRESS_INFO.options[vert_press_choice].res;  

    const HORIZ_PULL_INDX = SURVEY_DATA.findIndex(item => item.key === "horizontal-pull");
    const HORIZ_PULL_INFO = SURVEY_DATA[HORIZ_PULL_INDX];
    const horiz_pull_choice = inputs[HORIZ_PULL_INDX][0] - 1;
    console.log(HORIZ_PULL_INFO)
    console.log(horiz_pull_choice)
    res["horizontal-pull"] = HORIZ_PULL_INFO.options[horiz_pull_choice].res; 

    const VERT_PULL_INDX = SURVEY_DATA.findIndex(item => item.key === "vertical-pull");
    const VERT_PULL_INFO = SURVEY_DATA[VERT_PULL_INDX];
    const vert_pull_choice = inputs[VERT_PULL_INDX][0] - 1;
    res["vertical-pull"] = VERT_PULL_INFO.options[vert_pull_choice].res;  

    const KNEE_FLEX_INDX = SURVEY_DATA.findIndex(item => item.key === "knee-flexion");
    const KNEE_FLEX_INFO = SURVEY_DATA[KNEE_FLEX_INDX];
    const knee_flex_choice = inputs[KNEE_FLEX_INDX][0] - 1;
    res["knee-flexion"] = KNEE_FLEX_INFO.options[knee_flex_choice].res;


    const HIP_EXT_INDX = SURVEY_DATA.findIndex(item => item.key === "hip-extension");
    const HIP_EXT_INFO = SURVEY_DATA[HIP_EXT_INDX];
    const hip_ext_choice = inputs[HIP_EXT_INDX][0] - 1;
    res["hip-extension"] = HIP_EXT_INFO.options[hip_ext_choice].res;


    const CURL_INDX = SURVEY_DATA.findIndex(item => item.key === "curl");
    const CURL_INFO = SURVEY_DATA[CURL_INDX];
    const curl_choice = inputs[CURL_INDX][0] - 1;
    res["curl"] = CURL_INFO.options[curl_choice].res;  


    const EXT_INDX = SURVEY_DATA.findIndex(item => item.key === "extension");
    const EXT_INFO = SURVEY_DATA[EXT_INDX];
    const ext_choice = inputs[EXT_INDX][0] - 1;
    res["extension"] = EXT_INFO.options[ext_choice].res;

    console.log(res);

    return res;

  }

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