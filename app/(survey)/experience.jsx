import { View, Text, Pressable } from "react-native";
import { useSurveyContext } from "@/hooks/SurveyContext";
import { routes } from "@/constants/Survey";

export default function Experience() {
  const { setRoute } = useSurveyContext();

  return (
    <View>
      <Text>Experience</Text>
      <Pressable onPress={() => setRoute(routes[1])}>
        <Text>Next</Text>
      </Pressable>
    </View>
  )
}