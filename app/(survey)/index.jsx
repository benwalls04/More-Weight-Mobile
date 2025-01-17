import { View, Text, Pressable } from "react-native";
import { useSurveyContext } from "@/hooks/SurveyContext";
import { ROUTES, SURVEY_DATA } from "@/constants/Survey";
import SelectOne from "@/components/SelectOne";

export default function Experience() {
  const { setRoute } = useSurveyContext();

  return (
    <SelectOne
      title={SURVEY_DATA.experience.title}
      data={SURVEY_DATA.experience.options}
      nextRoute={() => setRoute(ROUTES[1])}
    ></SelectOne>
  )
}