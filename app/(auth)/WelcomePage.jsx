import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { useAuthContext } from "@/hooks/AuthContext";

const WelcomePage = () => {
  const navigation = useNavigation();
  const { setIsNew, isNew } = useAuthContext();
    
  return (
    <View>
      <Text>Welcome to More Weight!</Text>
      <View>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text>Returning User</Text>
        </Pressable>
        <Pressable onPress={() => setIsNew(true)}>
          <Text>New User</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomePage;