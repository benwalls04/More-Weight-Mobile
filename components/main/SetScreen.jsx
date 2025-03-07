import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import { useWorkoutContext } from "@/hooks/WorkoutContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPressable } from "@/components/ThemedPressable";
import { useUserContext } from "@/hooks/UserContext";
import SubList from "@/components/main/SubList";
import PopupPressable from "@/components/PopupPressable";

const windowWidth = Dimensions.get("window").width;

export default function SetScreen() {

  const { info } = useUserContext();
  const NUM_SETS = info.sets;

  const { currMovement, time, workoutCpy, index, setNum, nextSet, doNext, doLast, substitute, subList} = useWorkoutContext();
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);  // Create styles with colors

  const repRange = workoutCpy.sets[index].lowerRep + " - " + workoutCpy.sets[index].upperRep + " reps";
  const setStr = "Set " + setNum + "/" + NUM_SETS;

  // Dummy state for inputs
  const [weight, setWeight] = useState("");
  const [rpe, setRpe] = useState("");
  const [reps, setReps] = useState("");
  
  // Format time from decimal minutes (e.g. 2.25) to MM:SS
  const formatTime = (timeInMinutes) => {
    if (!timeInMinutes || timeInMinutes < 0.0167) return "0:00"; // Less than 1 second
    
    const totalSeconds = Math.round(timeInMinutes * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const subPopupBody = () => {
    return (
      <View style={{width: '100%', alignItems: 'center', height: 250}}>
        <ThemedText style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>Choose A Substitute</ThemedText>
        <SubList 
          list={subList} 
          changeMovement={substitute} 
          workoutIndex={index} 
          style={{justifySelf: 'center', width: "100%", left: 0, height: "100%", marginTop: 50}}
          height={178}
          selectInteract={true}
        />
      </View>
    )
  }

  return (
    <ThemedView style={{justifyContent: 'flex-start'}}>
      {/* Top action buttons */}
      <View style={styles.actionButtons}>
        <PopupPressable visible={setNum === 1} popupBody={subPopupBody} style={[styles.actionButton, styles.popupBtn]}>
          <ThemedText style={[styles.actionButtonText, {color: setNum === 1? colors.text : colors.tint}]}>Substitute</ThemedText>
        </PopupPressable>
        <TouchableOpacity style={styles.actionButton} onPress={setNum === 1? () => doNext() : () => {}}>
          <ThemedText style={[styles.actionButtonText, {color: setNum === 1? colors.text : colors.tint}]}>Do next</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={setNum === 1 ? () => doLast() : () => {}}>
          <ThemedText style={[styles.actionButtonText, {color: setNum === 1? colors.text : colors.tint}]}>Do last</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => nextSet(true)}>
          <ThemedText style={styles.actionButtonText}>Skip Set</ThemedText>
        </TouchableOpacity>
      </View>
      
      {/* Exercise name */}
      <ThemedText style={styles.exerciseName} numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.5}>
        {currMovement}
      </ThemedText>
      
      {/* Set info pills */}
      <View style={styles.setInfoContainer}>
        <View style={styles.infoPill}>
          <ThemedText style={styles.infoPillText}>{setStr}</ThemedText>
        </View>
        <View style={styles.infoPill}>
          <ThemedText style={styles.infoPillText}>{repRange}</ThemedText>
        </View>
        <View style={styles.infoPill}>
          <ThemedText style={styles.infoPillText}>RPE 9</ThemedText>
        </View>
      </View>
      
      {/* Timer */}
      <View style={[styles.timerContainer, {borderColor: time > 0 ? colors.tint : colors.text}]}>
        <ThemedText style={styles.timerText}>
          {formatTime(time || 0)}
        </ThemedText>
      </View>
      
      {/* Input fields */}
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Weight:</ThemedText>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.text}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Reps:</ThemedText>
          <TextInput
            style={styles.input}
            value={reps}
            onChangeText={setReps}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.text}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>RPE:</ThemedText>
          <TextInput
            style={styles.input}
            value={rpe}
            onChangeText={setRpe}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.text}
          />
        </View>

        {/* Log set button */}
        <ThemedPressable type="slanted" style={styles.logButton} onPress={() => nextSet(false)}>
          <ThemedText style={styles.logButtonText}>log set</ThemedText>
        </ThemedPressable>
      </View>
    
    </ThemedView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    actionButtons: {
      marginTop: 40,
      width: windowWidth * .9,
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom: 40,
      gap: 0,
    },
    actionButton: {
      borderWidth: 1,
      borderColor: colors.tint,
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 8,
      width: "25%",
      height: 55,
      justifyContent: 'center',
    },
    popupBtn: {
      width: "100%",
    },
    actionButtonText: {
      textAlign: 'center',
      fontSize: 14,
      color: colors.text,
    },
    exerciseName: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 15,
    },
    setInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 40,
      gap: 15,
    },
    infoPill: {
      paddingVertical: 0,
      paddingHorizontal: 16,
      borderRadius: 5,
      backgroundColor: colors.accentLight,
    },
    infoPillText: {
      fontSize: 12,
    },
    timerContainer: {
      alignSelf: 'center',
      width: '80%',
      aspectRatio: 1,
      borderWidth: 3,
      borderColor: colors.text,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    timerText: {
      fontSize: 35,
      fontWeight: 'bold',
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.accentLight,
      borderRadius: 4,
      paddingHorizontal: 12,
      paddingVertical: 16,
      marginBottom: 25,
    },
    inputGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '33%',
      justifyContent: 'center',
    },
    inputLabel: {
      fontSize: 14,
      width: 50,
      marginRight: 6,
      textAlign: 'right',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.text,
      color: colors.text,
      borderRadius: 3,
      width: 45,
      height: 30,
      textAlign: 'center',
      fontSize: 14,
    },
    logButton: {
      alignSelf: 'center',
      height: 45,
      width: "40%",
      position: 'absolute',
      bottom: -40,
    },
    logButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
  });
}