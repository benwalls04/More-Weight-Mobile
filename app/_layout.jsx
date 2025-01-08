import { Stack } from "expo-router";
import { AuthProvider } from "@/hooks/AuthContext";
import { UserProvider } from "@/hooks/UserContext"; 

export default function RootLayout() {
  return (
    <UserProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </UserProvider>
  );
}
