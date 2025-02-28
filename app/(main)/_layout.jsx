import { EditProvider } from "@/hooks/EditContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <EditProvider>
        <Stack.Screen name="EditPage" options={{ headerShown: false }} />
      </EditProvider>
    </Stack>
  );
}