import { Pressable, StyleSheet, View } from "react-native";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";

export function ThemedPressable({
  style,
  type = "default",
  btnHeight = 60,
  ...otherProps
}) {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  return (
    <Pressable
      style={[
        {
          height: 60,
          width: "100%",
          borderWidth: 1,
          borderRadius: 4,
          justifyContent: "center",
        },
        styles[type] || styles.default, 
        style,
      ]}
      {...otherProps}
    />
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    default: {
      backgroundColor: colors.buttonColor,
      borderColor: colors.buttonBorder,
      color: colors.text,
    }, 
    selected: {
      backgroundColor: colors.buttonColorSelected,
      borderColor: colors.borderColorSelected,
      color: colors.textSelected,
    },
    primary: {
      backgroundColor: colors.tint,
      borderColor: colors.tint,
      color: colors.text,
    },
    secondary: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
      color: colors.text,
    }, 
    transparent: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: colors.text,
    },
    slanted: {
      backgroundColor: colors.background,
      padding: 10,
      alignItems: "center",
      transform: [{ skewX: '-10deg' }],
      borderRadius: 0,
      borderColor: colors.tint
    }
  })
}

