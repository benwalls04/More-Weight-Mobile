import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyRange from "@/components/SurveyRange";
import { useRouter } from "expo-router";

export default function Style() {
  const { setStyle } = useSurveyContext();
  const router = useRouter();

  const handleNext = (selected, nextRoute) => {
    // FIXME: Add logic to handle the selected style
    setStyle(selected);
    router.push(nextRoute);
  }

  return (
    <SurveyRange
      title={SURVEY_DATA.style.title}
      data={SURVEY_DATA.style.options}
      handleNext={handleNext}
      nextRoute={'sets'}
    />
  );
} 