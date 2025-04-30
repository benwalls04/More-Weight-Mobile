import { SafeAreaView, View, Dimensions } from "react-native";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";

// Maximum width to ensure compatibility with all iPhone models
const MAX_WIDTH = 428; // Width of iPhone 13/14 Pro Max

export function ThemedView({
  style,
  children,
  label,
  ...otherProps
}) {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
      {...otherProps}
    >
      <View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            width: windowWidth > MAX_WIDTH ? MAX_WIDTH : "100%",
            maxWidth: MAX_WIDTH,
            height: "100%",
            flex: 1,
            alignSelf: "center",
            overflow: "hidden", // Prevent children from bleeding outside
          },
          style,
        ]}
        accessibilityLabel={label}
        accessible={true}
      >
        <View style={{
          width: "100%",
          maxWidth: MAX_WIDTH,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}
