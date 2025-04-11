import { View, FlatList, StyleSheet, TextInput } from "react-native";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { useEffect, useState, useCallback, memo, useMemo, useRef } from "react";
import { useWorkoutContext } from "@/hooks/WorkoutContext";
import { useEditContext } from "@/hooks/EditContext";

// Completely isolated input component with its own state
const IsolatedTextInput = memo(({ onSubmit, isSelected, styles }) => {
  const [localText, setLocalText] = useState("");
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    if (localText.trim()) {
      onSubmit(localText);
      setLocalText(""); 
      
      // Dismiss keyboard
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };
  
  return (
    <View style={styles.addContainer}>
      <ThemedText style={styles.addLabel}>Or Add Your Own Movement</ThemedText>
      <TextInput
        ref={inputRef}
        placeholder="Enter movement here"
        style={[styles.addInput, isSelected ? styles.addInputFocus : null]}
        value={localText}
        onChangeText={setLocalText}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        accessible={true}
        accessibilityLabel="Add Movement"
        accessibilityRole="text"
        accessibilityHint="Enter the movement you want to add"
      />
    </View>
  );
});

// Memoized item component
const SubListItem = memo(({ item, index, isSelected, onPress, styles }) => (
  <ThemedPressable 
    key={index.toString()}
    style={[styles.subOption, isSelected ? styles.subOptionSelected : null]} 
    onPress={() => onPress(index)}
    label={item.variant}
    hint={"Select this option to use as your new movement"}
  >
    <ThemedText>{item.variant}</ThemedText>
  </ThemedPressable>
));

const SubList = ({list, style, height, selectInteract=false, source}) => {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = useMemo(() => createStyles(colors, height), [colors, height]);

  const [choiceIndex, setChoiceIndex] = useState(0);
  const [displayList, setDisplayList] = useState(list);

  let setSubChoice;
  if (source === "workout") {
    const workoutContext = useWorkoutContext();
    setSubChoice = workoutContext.setSubChoice;
  } else if (source === "edit") {
    const editContext = useEditContext();
    setSubChoice = editContext.setSubChoice;
  }

  useEffect(() => {
    setDisplayList(list);
  }, [list]);

  useEffect(() => {
    if (displayList && displayList.length > 0) {
      setSubChoice({movement: displayList[0].baseMovement, bias: displayList[0].bias});
    }
  }, []);

  const handlePress = useCallback((index) => {
    if (choiceIndex !== index) {
      setSubChoice({movement: displayList[index].baseMovement, bias: displayList[index].bias});
      if (selectInteract) {
        setChoiceIndex(index);
      }
    } else {
      setSubChoice(null);
      if (selectInteract) {
        setChoiceIndex(-1);
      }
    }
  }, [choiceIndex, displayList, selectInteract, setSubChoice]);

  const handleCustomSubmit = useCallback((text) => {
    // Create a new custom movement item
    const newItem = {
      variant: text,
      baseMovement: text.toLowerCase(),
      bias: "neutral"
    };
    
    // Add the new item to the display list
    const newList = [...displayList, newItem];
    setDisplayList(newList);
    
    // Set the choice index to the new item (last in the list)
    const newIndex = newList.length - 1;
    setChoiceIndex(newIndex);
    
    // Update the selected movement
    setSubChoice({movement: newItem.baseMovement, bias: newItem.bias});
  }, [displayList, setSubChoice]);

  const renderItem = useCallback(({ item, index }) => (
    <SubListItem 
      item={item}
      index={index}
      isSelected={choiceIndex === index}
      onPress={handlePress}
      styles={styles}
    />
  ), [choiceIndex, handlePress, styles]);
  
  const renderFooter = useCallback(() => (
    <IsolatedTextInput 
      onSubmit={handleCustomSubmit}
      isSelected={false} 
      styles={styles}
    />
  ), [handleCustomSubmit, styles]);

  return (
    <View style={[styles.subDropdown, style]}>
      <FlatList
        data={displayList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        style={{ 
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  );
}

// Memoize the entire SubList component
export default memo(SubList);

function createStyles(colors, height) {
  return StyleSheet.create({
    subDropdown: {
      width: '100%',
      height: height || '100%',
      backgroundColor: colors.background,
      overflow: 'hidden',
      position: 'absolute',
    },
    subOption: {
      fontSize: 10,
      textAlign: 'left',
      height: 45,
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
      height: 45,
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

