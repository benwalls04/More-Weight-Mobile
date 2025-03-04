import { Stack } from "expo-router";
import { EditProvider } from "@/hooks/EditContext";

export default function RootLayout() {
  return (
    <EditProvider>
      <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </EditProvider>
  );
}