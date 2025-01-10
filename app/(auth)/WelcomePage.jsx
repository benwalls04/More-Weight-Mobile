import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuthContext } from "@/hooks/AuthContext";
import { useTheme } from "@/hooks/ThemeContext";
import { Colors } from "react-native/Libraries/NewAppScreen";

const WelcomePage = () => {
  const navigation = useNavigation();
  const { setIsNew } = useAuthContext();
  const { theme } = useTheme(); 
  const colorScheme = theme === 'dark' ? Colors.dark : Colors.light;
  const Styles = createStyles(theme, colorScheme);
    
  return (
    <View style={Styles.page}>
      <Text style={Styles.header}>Welcome to More Weight!</Text>
      <View style={Styles.container}>
        <Pressable onPress={() => navigation.navigate("Login")} style={Styles.button}>
          <Text style={Styles.buttonText}>Returning User</Text>
        </Pressable>
        <Pressable onPress={() => setIsNew(true)} style={Styles.button}>
          <Text style={Styles.buttonText}>New User</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomePage;

function createStyles (colors) {
  return StyleSheet.create({
    page: {
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "center", 
    }, 
    header: {
      fontSize: 30,
      color: colors.text,
      textAlign: "center",
    }, 
    container: {
      width: "80%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignSelf: "center",
    }, 
    button: {
      width: "40%", 
      height: 60, 
      padding: 10,
      margin: 10,
      border: colors.border,
      borderRadius: 4,
      justifyContent: "center",
    }, 
    buttonText: {
      textAlign: "center",
      color: colors.text,
    }
  })
}
