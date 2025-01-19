import { View, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useUserContext } from "@/hooks/UserContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedPressable } from "@/components/ThemedPressable";

const LoginPage = () => {
  const [userText, setUserText] = useState("");
  const [passText, setPassText] = useState("");
  const { theme } = useThemeContext();
  const { login } = useUserContext();

  const handleSubmit = async () => {
    const res = await login(userText, passText);
    if (res != "success") {
      Alert.alert(res);
    } 
  }

  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const Styles = createStyles(colors);

  return (
    <ThemedView>
      <View style={Styles.headerContainer}>
        <ThemedText style={{textAlign: "center"}} type="header">Hi, Welcome Back!</ThemedText>
      </View>
      <View style={Styles.inputContainer}>
        <View style={Styles.input}>
          <ThemedText>Username</ThemedText>
          <TextInput
            style={Styles.inputText}
            placeholder="Your username"
            value={userText}
            onChangeText={setUserText}
          />
        </View>
        <View style={Styles.input}>
          <ThemedText>Password</ThemedText>
          <TextInput
            style={Styles.inputText}
            placeholder="Your password"
            value={passText}
            onChangeText={setPassText}
            secureTextEntry
          />
        </View>
        <ThemedPressable onPress={() => handleSubmit()}>
          <ThemedText style={{textAlign: "center"}}>Log In</ThemedText>
        </ThemedPressable>
      </View>
    </ThemedView>
  );
};

export default LoginPage;

function createStyles (colors) {
  return StyleSheet.create({
    headerContainer: {
      flex: 1,
      justifyContent: "center",
    }, 
    inputContainer: {
      flex: 3,
      width: "100%",
      maxWidth: 380,
      flexDirection: "column",
      justifyContent: "flex-start",
    }, 
    input: {
      backgroundColor: colors.background,
      width: "100%", 
      marginBottom: 10,
      justifyContent: "center",
    },
    inputText: {
      paddingLeft: 10,
      fontSize: 14,
      color: colors.text,
      height: 35, 
      borderColor: colors.inputBorderColor,
      borderWidth: 1,
      borderRadius: 2,
    },
    button: {
      maxHeight: 35,
      marginTop: 45,
      height: 35,
      borderRadius: 0,
    }, 
  })
}