import { Pressable, StyleSheet, View, Animated } from "react-native";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import Popup from "@/components/Popup";
import { useState, useEffect } from "react";

export function FloatPressable({
  style,
  children,
  ...otherProps
}) {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const [popupVisible, setPopupVisible] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState(null);
  const [scale] = useState(new Animated.Value(1)); 

  const onPressIn = () => {
    Animated.sequence([
      // Shift the button
      Animated.timing(scale, {
        toValue: 1.05,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      // Show the popup if hold duration is long enough (e.g., 1 second)
      setPopupVisible(true);
    }, 250); 

    setHoldTimeout(timeout);
  };

  const onPressOut = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const shiftStyle = {
    transform: [
      {scale: scale}
    ],
  };

  return (
    <Animated.View style={shiftStyle}>
      <Pressable
        style={[
          styles.button, 
          style,
        ]}
        {...otherProps}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View style={styles.contentContainer}>
          {children}
        </View>
      </Pressable>
      <Popup visible={popupVisible} onClose={closePopup} />
    </Animated.View>
  );
}


function createStyles(colors) {
  return StyleSheet.create({
    contentContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: colors.buttonColorSelected,
      zIndex: 2,
    },
    button: {
      backgroundColor: colors.buttonColor,
      borderColor: colors.borderColor,
      color: colors.text,
      height: 40,
      width: "100%",
      borderWidth: 1,
      borderRadius: 4,
      justifyContent: "center",
      shadowColor: colors.shadowColor,
      shadowOffset: {width: 2, height: 3},
      shadowOpacity: .5,
      shadowRadius: 4,
      elevation: 5,
    }, 
  })
}

