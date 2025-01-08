import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useAuthContext } from "@/hooks/AuthContext";
import { useUserContext } from "@/hooks/UserContext";
import axios from 'axios';

const LoginPage = () => {
  const [userText, setUserText] = useState("");
  const [passText, setPassText] = useState("");
  const { setIsAuth } = useAuthContext();
  const { setRoutine, setUsername } = useUserContext();

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
    <View>
      <Text>Login with your username and password</Text>
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
        <Text>Log In</Text>
      </Pressable>
    </View>
  );
};

function validInput(string) {
  const invalidCharacters = /\s|[\x00-\x1F\x7F-\x9F]/;
  return string.length > 0 && !invalidCharacters.test(string);
}

export default LoginPage; 