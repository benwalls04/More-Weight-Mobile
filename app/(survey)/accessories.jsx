import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyGrid from "@/components/SurveyGrid";
import { useRouter } from "expo-router";

export default function Accessories() {
  const { setRoute, setAccessories } = useSurveyContext();
  const router = useRouter();

  const handleNext = (selected, nextRoute) => {
    setAccessories(selected[0]);
    setRoute(nextRoute);
    router.push(nextRoute);
  }

  return (
    <SurveyGrid
      title={SURVEY_DATA.accessories.title}
      data={SURVEY_DATA.accessories.options}
      numColumns={3}
      handleNext={handleNext}
      nextRoute={'regions'}
      type={'many'}
    ></SurveyGrid>
  )
}