import { Text, StyleSheet } from "react-native";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";


export function ThemedText({
  style,
  type = "default",
  ...rest
}) {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;

  return (
    <Text
      style={[
        { color: colors.text },
        styles[type] || styles.default,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 30,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  header: {
    fontSize: 26,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
