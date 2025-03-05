import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

const windowWidth = Dimensions.get('window').width;

export default function MainHeader({ 
  title, 
  subHeaderComponent, 
  sticky = false,
  height
}) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors, sticky, height);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title} type="title">{title}</ThemedText>
        {subHeaderComponent && (
          <View style={styles.subheaderContainer}>
            {subHeaderComponent}
          </View>
        )}
      </View>
      <LinearGradient
        colors={['rgba(0,0,0,.8)', colors.background]}
        style={styles.shadow}
      />
    </View>
  );
}

function createStyles(colors, sticky, height) {
  return StyleSheet.create({
    container: {
      width: windowWidth,
      height: height ? height : "auto",
      backgroundColor: colors.background,
      ...(sticky && {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }),
      paddingBottom: 25
    },
    content: {
      paddingHorizontal: 20,
    },
    subheaderContainer: {
      justifyContent: "flex-start",
    },
    shadow: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 8,
    }
  });
}
