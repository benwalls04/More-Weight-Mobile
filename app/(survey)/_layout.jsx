import { Stack } from "expo-router";
import { SurveyProvider } from "@/hooks/SurveyContext";

export default function SurveyLayout() {
  return (
    <SurveyProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="experience"/>
        <Stack.Screen name="days"/>
        <Stack.Screen name="bias"/>
        <Stack.Screen name="base"/>
        <Stack.Screen name="split"/>
        <Stack.Screen name="style"/>
        <Stack.Screen name="sets"/>
        <Stack.Screen name="time"/>
        <Stack.Screen name="accessories"/>
        <Stack.Screen name="regions"/>
        <Stack.Screen name="movements"/>
      </Stack>
    </SurveyProvider>
  );
}