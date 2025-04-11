import { Stack } from "expo-router";
import { SurveyProvider } from "@/hooks/SurveyContext";
import { SplitsProvider } from "@/hooks/SplitsContext";

export default function SurveyLayout() {
  return (
    <SplitsProvider>
      <SurveyProvider>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false, animation: 'fade', animationDuration: 300, contentStyle: { backgroundColor: 'black' } }}>
          <Stack.Screen name="index" options={{ gestureEnabled: true }} />
          <Stack.Screen name="custom" options={{ gestureEnabled: false }} />
          <Stack.Screen name="base" options={{ gestureEnabled: false }} />
        </Stack>
      </SurveyProvider>
    </SplitsProvider>
  );
}