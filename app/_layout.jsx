import { AuthProvider } from "@/hooks/AuthContext";
import { UserProvider } from "@/hooks/UserContext"; 
import { ThemeProvider } from "@/hooks/ThemeContext";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <UserProvider>
      <AuthProvider>
        <ThemeProvider>
          <Stack screenOptions={{ 
              headerShown: false, 
              gestureEnabled: false,
              animation: 'fade',
              animationDuration: 300,
              contentStyle: { backgroundColor: 'black' }
            }}>
            <Stack.Screen name="(auth)/LogInPage" options={{ gestureEnabled: true }}/>
            <Stack.Screen name="(survey)"/>
            <Stack.Screen name="(auth)/SignUpPage" options={{ gestureEnabled: true }}/>
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  );
}