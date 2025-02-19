import { EditProvider } from "@/hooks/EditContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <EditProvider>
        <Stack.Screen name="EditPage" options={{ headerShown: false }} />
      </EditProvider>
    </Stack>
  );
}