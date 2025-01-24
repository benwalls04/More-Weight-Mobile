import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyGrid from "@/components/SurveyGrid";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function Days() {

  const { setDays } = useSurveyContext();
  const router = useRouter();

  const handleNext = (selected, nextRoute) => {
    if (selected.length >= 3) {
      let days = Array(7).fill("rest");
      selected.forEach(i => days[i - 1] = "lift");
      setDays(days);
      router.push(nextRoute);
    } else {
      Alert.alert("Please select at least 3 days");
    }
  }

  return (
    <SurveyGrid
      title={SURVEY_DATA.days.title}
      data={SURVEY_DATA.days.options}
      numColumns={4}
      handleNext={handleNext}
      nextRoute={'bias'}
      type={'many'}
      btnGrow={true}
    ></SurveyGrid>
  )
}