import { SafeAreaView, View } from "react-native";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";

export function ThemedView({
  style,
  children,
  header,
  body,
  footer,
  ...otherProps
}) {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;

  return (
    <View style={[style]}>
      <View style={{flex: 1, justifyContent: "flex-end"}}>
        {header}
      </View>

      <View style={{flex: 1, justifyContent: "center"}}>
        {body}
      </View>

      <View style={{flex: 1, justifyContent: "flex-end"}}>
        {footer}
      </View>
    </View>
  );
}
