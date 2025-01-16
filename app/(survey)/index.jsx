import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import { routes } from "@/constants/Survey";

const SurveyRoot = () => {
  const router = useRouter();
  const { route } = useSurveyContext();

  useEffect(() => {
    router.push(route);
  }, [route]);

  return (
    <View>
      <Text>Survey</Text>
    </View>
  );
}

export default SurveyRoot;