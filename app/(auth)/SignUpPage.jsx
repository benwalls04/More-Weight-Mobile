import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useUserContext } from "@/hooks/UserContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedLayout } from "@/components/ThemedLayout";

const SignupPage = () => {
  const [userText, setUserText] = useState("");
  const [passText, setPassText] = useState("");
  const [confirmPassText, setConfirmPassText] = useState("");
  const { theme } = useThemeContext();
  const { signup } = useUserContext();

  const handleSubmit = async () => {

    // FIXME: change after testin
    const res = await signup("benny", "123456789", "123456789");

    if (res != "success") {
      Alert.alert(res);
    } 
  }

  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const Styles = createStyles(colors);

  return (
    <ThemedView>
      <ThemedLayout
        header={
          <View style={Styles.headerContainer}>
            <ThemedText style={{textAlign: "center"}} type="header">Create an Account to Save Your Routine!</ThemedText>
          </View>
        }
        body={
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
        <View style={Styles.input}>
          <ThemedText>Confirm Password</ThemedText>
          <TextInput
            style={Styles.inputText}
            placeholder="Your password (again)"
            value={confirmPassText}
            onChangeText={setConfirmPassText}
            secureTextEntry
          />
        </View>
        <ThemedPressable style={{marginTop: 10, height: 35}} onPress={() => handleSubmit()}>
          <ThemedText style={{textAlign: "center"}}>Sign Up</ThemedText>
            </ThemedPressable>
          </View>
        }
      />
    </ThemedView>
  );
};

export default SignupPage;

function createStyles (colors) {
  return StyleSheet.create({
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
  })
}