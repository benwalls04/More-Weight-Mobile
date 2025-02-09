import { Stack } from "expo-router";
import { SurveyProvider } from "@/hooks/SurveyContext";
import { SplitsProvider } from "@/hooks/SplitsContext";

export default function SurveyLayout() {
  return (
    <SplitsProvider>
      <SurveyProvider>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}></Stack>
      </SurveyProvider>
    </SplitsProvider>
  );
}