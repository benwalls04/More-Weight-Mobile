import { View, Text, TextInput, Pressable, StyleSheet} from "react-native";
import { useState } from "react";
import { useAuthContext } from "@/hooks/AuthContext";
import { useUserContext } from "@/hooks/UserContext";
import { COLORS } from "@/constants/Colors";
import axios from 'axios';

const LoginPage = () => {
  const [userText, setUserText] = useState("");
  const [passText, setPassText] = useState("");
  const { setIsAuth, theme } = useAuthContext();
  const { setRoutine, setUsername } = useUserContext();

  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const Styles = createStyles(colors);

  const logIn = async (username, password) => {
    if (validInput(username) && validInput(password)) {
      try {
        const response = await axios.get('https://more-weight.com/login', {
          params: { username, password }
        });
        setRoutine(response.data.routine);
        setUsername(username);
        setIsAuth(true);
      } catch (error) {
        if (error.response?.status === 400) {
          return error.response.data.message;
        }
        return "error";
      }
    }
    return "please enter a valid username and password";
  };

  return (
    <View style={Styles.page}>
      <View style={Styles.content}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.header}>Hi, Welcome Back!</Text>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.input}>
            <Text style={Styles.inputLabel}>Username</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="Your username"
              value={userText}
              onChangeText={setUserText}
            />
          </View>
          <View style={Styles.input}>
            <Text style={Styles.inputLabel}>Password</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="Your password"
              value={passText}
              onChangeText={setPassText}
              secureTextEntry
            />
          </View>
          <Pressable onPress={() => logIn(userText, passText)} style={Styles.button}>
            <Text style={Styles.buttonText}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

function validInput(string) {
  const invalidCharacters = /\s|[\x00-\x1F\x7F-\x9F]/;
  return string.length > 0 && !invalidCharacters.test(string);
}

export default LoginPage;

function createStyles (colors) {
  return StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center", 
    }, 
    content: {
      height: "70%",
      width: "85%", 
      justifyContent: "center",
      alignSelf: "center",
    },
    headerContainer: {
      flex: 1,
      justifyContent: "center",
    }, 
    header: {
      fontSize: 26,
      color: colors.text,
      textAlign: "center",
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
    inputLabel: {
      fontSize: 14,
      color: colors.text,
      textAlign: "left",
      paddingBottom: 5,
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
      backgroundColor: colors.buttonColor,
      height: 35,
      maxHeight: 35,
      marginTop: 45,
      width: "100%", 
      alignSelf: "center",
      borderColor: colors.borderColor,
      borderWidth: 1,
      borderRadius: 0,
      justifyContent: "center",
    }, 
    buttonText: {
      fontSize: 14,
      textAlign: "center",
      color: colors.text,
    }
  })
}