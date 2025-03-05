import { View, StyleSheet } from "react-native";
import { ThemedPressable } from "../ThemedPressable";
import { ThemedText } from "../ThemedText";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";

export default function FooterButton({clickEvent, text, marginBottom}) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const Styles = createStyles(colors);

  return (
    <View style={[Styles.stickyButtonContainer, {marginBottom: marginBottom ? marginBottom : 35}]}>
      <ThemedPressable style={Styles.doneButton} onPress={() => clickEvent()}>
        <ThemedText>{text}</ThemedText>
      </ThemedPressable>
    </View>
  )
}

function createStyles(colors) {
  return StyleSheet.create({
    stickyButtonContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'center',
      padding: 0,
      backgroundColor: colors.background,
    },
    doneButton: {
      width: '100%', 
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      backgroundColor: colors.primary, 
      borderRadius: 5,
    },
  })
}