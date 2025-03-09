import { View } from "react-native";
import { Link, usePathname, Slot } from "expo-router";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { WorkoutProvider } from "@/hooks/WorkoutContext";
import { ThemedPressable } from "@/components/ThemedPressable";
import { EditProvider } from "@/hooks/EditContext";
import { useUserContext } from "@/hooks/UserContext";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";


export default function TabsLayout() {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const pathname = usePathname();
  const { routine, info } = useUserContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (routine && info) {
      setLoading(false);
    }
  }, [routine, info]);

  if (loading) {
    return (
      <LoadingScreen />
    )
  } else {
    return (
      <EditProvider>
      <WorkoutProvider>
        <View style={{ 
          flex: 1, 
          backgroundColor: colors.background,
        }}>
          {/* Main content area */}
          <View style={{ flex: 1 }}>
            <Slot />
          </View>

          {/* Footer navigation */}
          <View style={{ 
            flexDirection: 'row', 
            borderTopWidth: 1,
            borderTopColor: colors.tint,
            backgroundColor: colors.background,
            height: 60,
            paddingBottom: 15,
            marginBottom: 15
          }}>
            <Link href="/(tabs)/WorkoutPage" asChild style={{ flex: 1 }}>
              <ThemedPressable
                type="transparent"
                style={{ 
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons 
                  name="barbell-outline" 
                  size={24} 
                  color={pathname.includes('WorkoutPage') ? colors.tint : colors.text} 
                />
              </ThemedPressable>
            </Link>

            <Link href="/(tabs)/TrackPage" asChild style={{ flex: 1 }}>
              <ThemedPressable
                type="transparent"
                style={{ 
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons 
                  name="stats-chart-outline" 
                  size={24} 
                  color={pathname.includes('TrackPage') ? colors.tint : colors.text} 
                />
              </ThemedPressable>
            </Link>
          </View>
        </View>
      </WorkoutProvider>
    </EditProvider>
  );
  }
}