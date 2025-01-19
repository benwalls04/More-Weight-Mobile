import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyGrid from "@/components/SurveyGrid";
import { useRouter } from "expo-router";

export default function Days() {
  const { setRoute, setBias } = useSurveyContext();
  const router = useRouter();

  const handleNext = (selected, nextRoute) => {
    setBias(selected);
    setRoute(nextRoute);
    router.push(nextRoute);
  }

  return (
    <SurveyGrid
      title={SURVEY_DATA.bias.title}
      data={SURVEY_DATA.bias.options}
      numColumns={4}
      handleNext={handleNext}
      nextRoute={'style'}
      type={'many'}
    ></SurveyGrid>
  )
}