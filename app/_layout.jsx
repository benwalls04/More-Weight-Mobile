import { Stack } from "expo-router";
import { AuthProvider } from "@/hooks/AuthContext";
import { UserProvider } from "@/hooks/UserContext"; 
import { ThemeProvider } from "@/hooks/ThemeContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <AuthProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  );
}
