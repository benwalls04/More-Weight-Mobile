import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedPressable } from "@/components/ThemedPressable";
import { useThemeContext } from "@/hooks/ThemeContext";
import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/Colors";
const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;
const numColumns = 2;

const WelcomePage = () => {
  const router = useRouter();
  
  const { theme } = useThemeContext(); 
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const BTN_WIDTH = (windowWidth - (numColumns + 1) * BUTTON_MARGIN * 2) / numColumns;
  const Styles = createStyles(colors, BTN_WIDTH);

  return (
    <ThemedView>
      <View style={Styles.titleContainer}>
        <ThemedText style={Styles.title}>Welcome to More Weight!</ThemedText>
      </View>
      <View style={Styles.bodyContainer}>
        <View style={Styles.buttonContainer}>
          <ThemedPressable onPress={() => router.push("/LogInPage")} style={Styles.button}>
            <Text style={Styles.buttonText}>Returning User</Text>
          </ThemedPressable>
          <ThemedPressable onPress={() => router.push("/(survey)")} style={Styles.button}>
            <Text style={Styles.buttonText}>New User</Text>
          </ThemedPressable>
        </View>
      </View>
    </ThemedView>
  );
};

export default WelcomePage;

function createStyles (colors, BTN_WIDTH) {
  return StyleSheet.create({
    titleContainer: {
      flex: 1,
      justifyContent: "flex-end",
    },
    title: {
      fontSize: 26,
      marginVertical: 16,
      textAlign: "center",
    }, 
    bodyContainer: {
      flex: 2,
      justifyContent: "flex-start",
    },
    buttonContainer: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
    }, 
    button: {
      backgroundColor: colors.buttonColor,
      width: BTN_WIDTH, 
      margin: BUTTON_MARGIN,
      height: 60, 
      borderColor: colors.borderColor,
      borderWidth: 1,
      borderRadius: 4,
      justifyContent: "center",
    }, 
    buttonText: {
      fontSize: 14,
      textAlign: "center",
      color: colors.text,
    }
  })
}
