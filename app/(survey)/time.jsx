import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyGrid from "@/components/SurveyGrid";
import { useRouter } from "expo-router";

export default function Time() {
  const { setTime } = useSurveyContext();
  const router = useRouter();

  const handleNext = (selected, nextRoute) => {
    setTime(selected[0]);
    router.push(nextRoute);
  }

  return (
    <SurveyGrid
      title={SURVEY_DATA.time.title}
      data={SURVEY_DATA.time.options}
      numColumns={4}
      handleNext={handleNext}
      nextRoute={'accessories'}
      type={'one'}
    ></SurveyGrid>
  )
}