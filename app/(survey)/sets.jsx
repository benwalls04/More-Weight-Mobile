import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyGrid from "@/components/SurveyGrid";
import { useRouter } from "expo-router";

export default function Sets() {
  const { setSets } = useSurveyContext();
  const router = useRouter();

  const handleNext = (selected, nextRoute) => {
    setSets(selected[0]);
    router.push(nextRoute);
  }

  return (
    <SurveyGrid
      title={SURVEY_DATA.sets.title}
      data={SURVEY_DATA.sets.options}
      numColumns={3}
      handleNext={handleNext}
      nextRoute={'time'}
      type={'one'}
    ></SurveyGrid>
  )
}