import { SafeAreaView, View } from "react-native";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";

export function ThemedView({
  style,
  children,
  ...otherProps
}) {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...otherProps}
    >
      <View
        style={[
          {
            justifyContent: "center",
            alignSelf: "center",
            width: "85%",
            height: "70%",
          },
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
