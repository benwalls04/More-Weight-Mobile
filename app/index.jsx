import React from "react";
import { useRouter } from "expo-router";
import { View, Dimensions, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedLayout } from "@/components/ThemedLayout";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/UserContext";

const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;
const numColumns = 2;
const BTN_WIDTH = (windowWidth - (numColumns + 1) * BUTTON_MARGIN * 2) / numColumns;

const WelcomePage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const {login, setNewUser} = useUserContext();

  async function getData() {
    const loggedInStr = await AsyncStorage.getItem("isLoggedIn");
    const isLoggedInValue = JSON.parse(loggedInStr);

    if (isLoggedInValue) {
      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");
      login(username, password);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <ThemedView>
        <ThemedLayout
          header={
            <ThemedText style={Styles.title}>Welcome to More Weight!</ThemedText>
          }
        body={
            <View style={Styles.buttonContainer}>
              <ThemedPressable onPress={() => router.push("/LogInPage")} style={Styles.button}>
                <ThemedText style={Styles.buttonText}>Returning User</ThemedText>
              </ThemedPressable>
              <ThemedPressable onPress={() => {
                setNewUser(true);
                router.push("/(survey)")
              }} style={Styles.button}>
                <ThemedText style={Styles.buttonText}>New User</ThemedText>
              </ThemedPressable>  
            </View>
        }
      />
    </ThemedView>
  );
};

export default WelcomePage;

const Styles = StyleSheet.create({
    title: {
      fontSize: 28,
      textAlign: "center",
    }, 
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
    }, 
    button: {
      width: BTN_WIDTH, 
      margin: BUTTON_MARGIN,
      borderWidth: 1,
    }, 
    buttonText: {
      fontSize: 14,
      textAlign: "center",
    }
})
