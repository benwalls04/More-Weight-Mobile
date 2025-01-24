import { useSurveyContext } from "@/hooks/SurveyContext";
import { useSplitsContext } from "@/hooks/SplitsContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyGrid from "@/components/SurveyGrid";
import { useRouter } from "expo-router";
import axios from "axios";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedLayout } from "@/components/ThemedLayout";
import LoadingScreen from "@/components/LoadingScreen";

export default function Bias() {
  const { setBias, formatParams } = useSurveyContext();
  const { setSplits, setLeaf, setRoot } = useSplitsContext();
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);

  const handleNext = async (selected, nextRoute) => {
    setIsLoading(true);
    let bias = Array(SURVEY_DATA.bias.options.length).fill(.5);
    selected.forEach(i => bias[i - 1] = .75); 
   
    setBias(bias);
    const params = formatParams(bias);

    await axios.get('https://more-weight.com/splits', { params: params }).then((response) => {
      setSplits(response.data);
      setLeaf(response.data.selection);
      setRoot(response.data);
    });
    setIsLoading(false);

    router.push(nextRoute);
  }

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <SurveyGrid
      title={SURVEY_DATA.bias.title}
      data={SURVEY_DATA.bias.options}
      numColumns={3}
      handleNext={handleNext}
      nextRoute={'base'}
      type={'many'}
      btnGrow={true}
    ></SurveyGrid>
  )
}