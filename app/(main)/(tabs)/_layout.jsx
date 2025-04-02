import { View, Animated, Easing } from "react-native";
import { useState, useEffect, useRef } from "react";
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
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (pathname !== prevPathname) {
        const tabOrder = ['WorkoutPage', 'TrackPage', 'ProfilePage'];
        const currentIndex = tabOrder.findIndex(path => pathname.includes(path));
        const prevIndex = tabOrder.findIndex(path => prevPathname.includes(path));
        
        // Calculate the starting position for the animation
        let startValue = 0;
        
        if (currentIndex !== -1 && prevIndex !== -1) {
          // Moving right (to a higher index tab)
          if (currentIndex > prevIndex) {
            startValue = 300; 
          } 
          // Moving left (to a lower index tab)
          else if (currentIndex < prevIndex) {
            startValue = -300; 
          }
        }
        
        // Reset position for new animation
        slideAnim.setValue(startValue);
        
        // Animate to center
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start(() => {
          // Ensure we're exactly at 0 when animation completes
          slideAnim.setValue(0);
          setPrevPathname(pathname);
        });
      } else {
        // Initial load - just set to center position
        slideAnim.setValue(0);
      }
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
        <View style={{ 
          flex: 1, 
          backgroundColor: colors.background,
          overflow: 'hidden', // Ensure content doesn't show outside bounds during animation
        }}>
          {/* Main content area with horizontal slide animation */}
          <Animated.View style={{ 
            flex: 1,
            transform: [{ translateX: slideAnim }]
          }}>
            <Slot />
          </Animated.View>

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
        </View>
      </WorkoutProvider>
    </EditProvider>
  );
  }
}