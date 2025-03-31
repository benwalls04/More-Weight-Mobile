import { View, ScrollView, StyleSheet, TextInput } from "react-native";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { useWorkoutContext } from "@/hooks/WorkoutContext";
import { useEditContext } from "@/hooks/EditContext";

export default function SubList({list, style, height, selectInteract=false, source}) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors, height);

  const [choiceIndex, setChoiceIndex] = useState(0);
  const [addText, setAddText] = useState("");

  let setSubChoice;
  if (source === "workout") {
    const workoutContext = useWorkoutContext();
    setSubChoice = workoutContext.setSubChoice;
  } else if (source === "edit") {
    const editContext = useEditContext();
    setSubChoice = editContext.setSubChoice;
  }

  useEffect(() => {
    setSubChoice({movement: list[0].baseMovement, bias: list[0].bias})
  }, [])

  const handlePress = (index) => {
    if (choiceIndex !== index) {
      setSubChoice({movement: list[index].baseMovement, bias: list[index].bias});
      if (selectInteract) {
        setChoiceIndex(index);
      }
    } else {
      setSubChoice(null);
      if (selectInteract) {
        setChoiceIndex(-1);
      }
    }
  }

  const handleAddText = (text) => {
    setAddText(text);
    setSubChoice({movement: text.toLowerCase(), bias: "neutral"});
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
              <ThemedText>{item.variant}</ThemedText>
            </ThemedPressable>
          ))}
          <View style={styles.addContainer}>
            <ThemedText style={styles.addLabel}>Or Add Your Own Movement</ThemedText>
            <TextInput
              placeholder="Enter movement here"
              style={[styles.addInput, choiceIndex === list.length ? styles.addInputFocus : null]}
              value={addText}
              onFocus={() => setChoiceIndex(list.length)}
              onChangeText={e => handleAddText(e)}
            ></TextInput>
          </View>
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
      maxHeight: 180,
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
    },
    addContainer: {
      borderRadius: 5,
      backgroundColor: colors.accentLight,
      borderWidth: 1,
      borderColor: colors.accent,
    },
    addLabel: {
      fontSize: 14,
      textAlign: "center"
    },
    addInput: {
      fontSize: 14,
      paddingLeft: 10,
      borderWidth: 1,
      borderColor: colors.accent,
      borderRadius: 5,
      padding: 5,
      color: colors.text,
    }, 
    addInputFocus: {
      backgroundColor: colors.tint,
    }
  })
}

