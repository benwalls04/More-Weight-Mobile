import { Stack } from "expo-router";
import { SurveyProvider } from "@/hooks/SurveyContext";

export default function SurveyLayout() {
  return (
    <SurveyProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="experience"/>
        <Stack.Screen name="days"/>
      </Stack>
    </SurveyProvider>
  );
}