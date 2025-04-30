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
    const res = await signup(userText, passText, confirmPassText);
    
    if (res) {
      Alert.alert("Signup Failed", res);
    }
  }


  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const Styles = createStyles(colors);

  return (
    <ThemedView label="Sign Up Page" style={{width: '90%'}}>
      <ThemedLayout 
        headerFlex={1}
        bodyFlex={3}
        header={
          <View style={Styles.headerContainer}>
            <ThemedText style={{textAlign: "center"}} type="header">Create an Account to Save Your Routine!</ThemedText>
          </View>
        }
        body={
          <View>
            <View style={Styles.input}>
              <ThemedText>Username</ThemedText>
          <TextInput
            style={Styles.inputText}
            placeholder="Your username"
            value={userText}
            onChangeText={setUserText}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            accessible={true}
            accessibilityLabel="Username"
            accessibilityRole="text"
            accessibilityHint="Enter your username"
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
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            accessible={true}
            accessibilityLabel="Password"
            accessibilityRole="text"
            accessibilityHint="Enter your password"
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
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            accessible={true}
            accessibilityLabel="Confirm Password"
            accessibilityRole="text"
            accessibilityHint="Enter your password again"
          />
        </View>
        <ThemedPressable style={{marginTop: 10, height: 35}} onPress={() => handleSubmit()} label="Sign Up" hint="Creates a new account and allows you to edit your routine">
          <ThemedText style={{textAlign: "center"}}>Sign Up</ThemedText>
        </ThemedPressable>
        <View style={Styles.warningContainer}>
          <ThemedText style={Styles.warningText}>
            ⚠️ Warning: There is currently no way to recover lost passwords with this version. 
            We recommend writing it down somewhere safe.
          </ThemedText>
        </View>
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
      height: 45, 
      borderColor: colors.inputBorderColor,
      borderWidth: 1,
      borderRadius: 2,
    },
    warningContainer: {
      marginTop: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: '#FFA500',
      borderRadius: 5,
      backgroundColor: 'rgba(255, 165, 0, 0.1)',
    },
    warningText: {
      textAlign: 'center',
      fontSize: 12,
      color: '#FFA500',
    }
  })
}