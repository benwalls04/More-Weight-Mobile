import { Stack } from "expo-router";
import { SurveyProvider } from "@/hooks/SurveyContext";
import { SplitsProvider } from "@/hooks/SplitsContext";

export default function SurveyLayout() {
  return (
    <SurveyProvider>
      <SplitsProvider>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}></Stack>
      </SplitsProvider>
    </SurveyProvider>
  );
}