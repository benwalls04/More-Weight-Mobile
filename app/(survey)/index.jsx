import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyGrid from "@/components/SurveyGrid";
import { useRouter } from "expo-router";

export default function Experience() {
  const { setExperience } = useSurveyContext();
  const router = useRouter();

  const handleNext = (selected, nextRoute) => {
    setExperience(selected[0]);
    router.push(nextRoute);
  }

  return (
    <SurveyGrid
      title={SURVEY_DATA.experience.title}
      data={SURVEY_DATA.experience.options}
      numColumns={3}
      handleNext={handleNext}
      nextRoute={'days'}
      type={'one'}
    ></SurveyGrid>
  )
}