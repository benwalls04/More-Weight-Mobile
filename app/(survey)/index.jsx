import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyGrid from "@/components/SurveyGrid";
import SurveyNumber from "@/components/SurveyNumber";
import { useRouter } from "expo-router";

export default function Experience() {
  const { setExperience } = useSurveyContext();
  const router = useRouter();

  const handleNext = (selected, nextRoute) => {
    setExperience(selected[0]);
    router.push(nextRoute);
  }

  return (
    <SurveyNumber
      title={SURVEY_DATA.experience.title}
      handleNext={handleNext}
      textAfter={"years"}
      nextRoute={'days'}
      max={10}
    ></SurveyNumber>
  )
}