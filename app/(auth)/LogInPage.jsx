import { View, Text, TextInput, StyleSheet, Pressable} from "react-native";
import React, { useState, useContext} from "react";
import { AuthProvider } from "@/hooks/AuthContext";

const LoginPage = () => {
  const [userText, setUserText ] = useState("");
  const [passText, setPassText ] = useState("");
  const { logIn } = useContext(AuthProvider);

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

export default LoginPage;