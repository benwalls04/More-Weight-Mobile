import { View, Animated } from "react-native";
import { useState, useEffect } from "react";
import { ThemedPressable } from "@/components/ThemedPressable";
import  LoadingScreen from "@/components/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { EditProvider } from "@/hooks/EditContext";
import { WorkoutProvider } from "@/hooks/WorkoutContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { Slot, Link } from "expo-router";
import { COLORS } from "@/constants/Colors";

export default function TabsLayout() {
  const [fadeAnim] = useState(new Animated.Value(0)); 
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const theme = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, 
        useNativeDriver: true,
      }).start();
    }
  }, [loading, pathname]);

  const getIconColor = (page) => {
    return pathname.includes(page) ? colors.tint : colors.text;
  };

  if (loading) {
    return (
      <LoadingScreen />
    )
  } else {
    return (
      <EditProvider>
      <WorkoutProvider>
        <Animated.View style={{ 
          flex: 1, 
          backgroundColor: colors.background,
          opacity: fadeAnim, 
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
                  color={getIconColor('WorkoutPage')} 
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
                  color={getIconColor('TrackPage')} 
                />
              </ThemedPressable>
            </Link>

            <Link href="/(tabs)/ProfilePage" asChild style={{ flex: 1 }}>
              <ThemedPressable
                type="transparent"
                style={{ 
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons 
                  name="person-outline" 
                  size={24} 
                  color={getIconColor('ProfilePage')} 
                />
              </ThemedPressable>
            </Link>
          </View>
        </Animated.View>
      </WorkoutProvider>
    </EditProvider>
  );
  }
}