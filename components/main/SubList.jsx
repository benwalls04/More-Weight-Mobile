import { View, ScrollView, StyleSheet } from "react-native";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { useState } from "react";

export default function SubList({list, changeMovement, workoutIndex, style, height, selectInteract=false}) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors, height);

  const [choiceIndex, setChoiceIndex] = useState(-1);

  const handlePress = (index) => {
    if (choiceIndex !== index) {
      changeMovement(workoutIndex, list[index]);
      if (selectInteract) {
        setChoiceIndex(index);
      }
    }
  }

  return (
    <View style={[styles.subDropdown, style]}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          indicatorStyle="white" // Try setting an explicit color
          persistentScrollbar={true} // Make scrollbar always visible
          style={{ 
            maxHeight: height ? height : 150,
            width: '100%' // Ensure full width
          }}
          contentContainerStyle={{
            paddingRight: 5 // Add padding for the scrollbar
          }}
        >
          {list.map((item, index) => (
            <ThemedPressable 
              key={index.toString()}
              style={[styles.subOption, choiceIndex === index ? styles.subOptionSelected : null]} 
              onPress={() => handlePress(index)}
            >
              <ThemedText>{item}</ThemedText>
            </ThemedPressable>
          ))}
        </ScrollView>
      </View>
  );
}


function createStyles(colors, height) {
  return StyleSheet.create({
    subDropdown: {
      position: 'absolute',
      left: 27,
      width: 240,
      maxHeight: height ? height : 105,
      backgroundColor: colors.background,
      overflow: 'hidden',
      zIndex: 10,
    },
    subOption: {
      fontSize: 10,
      textAlign: 'left',
      height: 35,
      backgroundColor: colors.accentLight,
      color: colors.text,
      borderColor: colors.accent,
      borderWidth: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      zIndex: 11,
    },    
    subOptionSelected: {
      backgroundColor: colors.tint,
    }
  })
}

