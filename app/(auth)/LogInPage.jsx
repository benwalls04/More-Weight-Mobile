import { View, Text, TextInput, StyleSheet, Pressable} from "react-native";
import React, { useState } from "react";
import { useAuthContext } from "@/hooks/AuthContext";
import { useUserContext } from "@/hooks/UserContext"; 

const LoginPage = () => {

  const [userText, setUserText ] = useState("");
  const [passText, setPassText ] = useState("");
  const authContext = useAuthContext();
  const userContext = useUserContext();

  const logIn = async (username, password) => {
    if (validInput(username) && validInput(password)){
      try {
        const response = await axios.get('https://more-weight.com/login', {
          params: { username: username, password: password }
        });
        userContext.setRoutine(response.data.routine);
        userContext.setUsername(username);
        authContext.setIsAuth(true);
        //setInputs(response.data.inputs);
        //setLog(response.data.log);
        //setRecents(response.data.recents);
        //navigate('/profile');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          return error.response.data.message;
        } else {
          return "error";
        }
      }
    } else {
      return "please enter a valid username and password";
    }
  }

  return (
    <View>
      <Text> Login with your username and password </Text>
      <View>
        <View>
          <TextInput
            placeholder="username"
            value={userText}
            onChangeText={setUserText} 
          />
        </View>
        <View>
          <TextInput
            placeholder="password"
            value={passText}
            onChangeText={setPassText} 
            secureTextEntry
          />
        </View>
      </View>
      <Pressable onPress={() => logIn(userText, passText)}>
        Log In
      </Pressable>
    </View>
  )
}

function validInput(string) {
  const invalidCharacters = /\s|[\x00-\x1F\x7F-\x9F]/;
  const valid = string.length > 0 && !invalidCharacters.test(string);
  return valid;
}

export default LoginPage;