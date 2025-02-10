import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Play_400Regular, Play_700Bold } from "@expo-google-fonts/play"; 

export function ThemedText({
  style,
  type = "default",
  ...rest
}) {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;

  // Load the Play font
  const [fontsLoaded] = useFonts({
    Play_400Regular, // Regular weight
    Play_700Bold,    // Bold weight
  });

  // If fonts are not loaded, return a loading state or placeholder text
  if (!fontsLoaded) {
    return <Text style={[{ color: colors.text }, style]} {...rest}>Loading...</Text>;
  }

  // Return the text with the font applied once fonts are loaded
  return (
    <Text
      style={[
        { color: colors.text },
        styles[type] || styles.default,
        style,
        { fontFamily: "Play_400Regular" },
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 30,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "600",
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    lineHeight: 36,
  },
  header: {
    fontSize: 26,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  error: {
    color: 'red',
    fontSize: 14,
    lineHeight: 30,
  }
});
