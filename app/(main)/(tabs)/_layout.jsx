import { View, Animated } from "react-native";
// ... existing code ...

export default function TabsLayout() {
  // ... existing code ...

  const [fadeAnim] = useState(new Animated.Value(0)); 

  useEffect(() => {
    console.log("hi")
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, 
        useNativeDriver: true,
      }).start();
    }
  }, [loading, pathname]); // Trigger animation on pathname change

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
                  color={pathname.includes('ProfilePage') ? colors.tint : colors.text} 
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