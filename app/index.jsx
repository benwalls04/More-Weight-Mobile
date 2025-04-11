import React from "react";
import { useRouter } from "expo-router";
import { View, Dimensions, StyleSheet, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedLayout } from "@/components/ThemedLayout";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/UserContext";
import * as SecureStore from 'expo-secure-store';
import NetInfo from '@react-native-community/netinfo';

const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;
const numColumns = 2;
const BTN_WIDTH = (windowWidth - (numColumns + 1) * BUTTON_MARGIN * 2) / numColumns;

const WelcomePage = () => {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const {login, setNewUser} = useUserContext();

  // Check network connectivity
  useEffect(() => {
    // Initial check
    NetInfo.fetch().then(state => {
      setIsOnline(state.isConnected);
    });

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  async function getData() {
    const loggedInStr = await SecureStore.getItemAsync("isLoggedIn");
    const isLoggedInValue = JSON.parse(loggedInStr);

    if (isLoggedInValue) {
      const username = await SecureStore.getItemAsync("username");
      const password = await SecureStore.getItemAsync("password");
      login(username, password);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  
  // Handle navigation with offline check
  const handleNavigation = (path, isSignup = false) => {
    if (!isOnline) {
      Alert.alert(
        'No Internet Connection',
        'You need to be online to access this feature. Please check your connection and try again.',
        [{ text: 'OK' }]
      );
    } else {
      if (isSignup) {
        setNewUser(true);
        router.push(path);
      } else {
        router.push(path);
      }
    }
  };
  
  return (
    <ThemedView label="Welcome Page">
        <ThemedLayout
          header={
            <ThemedText style={Styles.title}>Welcome to More Weight!</ThemedText>
          }
        body={
            <View style={Styles.buttonContainer}>
              <ThemedPressable 
                onPress={() => handleNavigation("/LogInPage")} 
                style={Styles.button} 
                label="Returning User" 
                hint="Logs you into your existing account"
              >
                <ThemedText style={Styles.buttonText}>Returning User</ThemedText>
              </ThemedPressable>
              <ThemedPressable 
                onPress={() => handleNavigation("/(survey)", true)} 
                style={Styles.button} 
                label="New User" 
                hint="Creates a new account and takes you to the survey"
              >
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
