import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuthContext } from "@/hooks/AuthContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";

const WelcomePage = () => {
  const navigation = useNavigation();
  const { setIsNew, theme } = useAuthContext();
  //const { theme } = useThemeContext(); 
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const Styles = createStyles(colors);
  
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
      maxWidth: 380,
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-around",
      alignSelf: "center",
    }, 
    button: {
      backgroundColor: colors.buttonColor,
      width: "40%", 
      height: 60, 
      padding: 10,
      margin: 10,
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
