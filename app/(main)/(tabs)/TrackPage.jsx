import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MainHeader from "@/components/main/MainHeader";
import Graph from "@/components/main/Graph";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { useWorkoutContext } from "@/hooks/WorkoutContext";
import PopupPressable from "@/components/PopupPressable";
import { ThemedPressable } from "@/components/ThemedPressable";
const windowWidth = Dimensions.get('window').width;
import { MOVEMENTS } from "@/constants/Movements";
import LogList from "@/components/main/LogList";

const muscleGroups = ["chest", "back", "legs", "shoulders", "biceps", "triceps", "accessories"];

const logTest = {
  "barbell row": [
    {
      "weight": 100,
      "reps": 10,
      "createdAt": "2025-03-08T02:04:35.638Z"
    },
    {
      "weight": 100,
      "reps": 9,
      "createdAt": "2025-03-08T02:04:35.638Z"
    },
    {
      "weight": 100,
      "reps": 8,
      "createdAt": "2025-03-08T02:04:35.638Z"
    },
    {
      "weight": 105,
      "reps": 9,
      "createdAt": "2025-03-11T02:04:35.638Z"
    },
    {
      "weight": 105,
      "reps": 8,
      "createdAt": "2025-03-11T02:04:35.638Z"
    },
    {
      "weight": 105,
      "reps": 8,
      "createdAt": "2025-03-11T02:04:35.638Z"
    },
    {
      "weight": 107.5,
      "reps": 9,
      "createdAt": "2025-03-14T02:04:35.638Z"
    },
    {
      "weight": 107.5,
      "reps": 8,
      "createdAt": "2025-03-14T02:04:35.638Z"
    },
    {
      "weight": 107.5,
      "reps": 7,
      "createdAt": "2025-03-14T02:04:35.638Z"
    },
    {
      "weight": 110,
      "reps": 9,
      "createdAt": "2025-03-17T02:04:35.638Z"
    },
    {
      "weight": 110,
      "reps": 8,
      "createdAt": "2025-03-17T02:04:35.638Z"
    },
    {
      "weight": 110,
      "reps": 7,
      "createdAt": "2025-03-17T02:04:35.638Z"
    },
    {
      "weight": 112.5,
      "reps": 9,
      "createdAt": "2025-03-20T02:04:35.638Z"
    },
    {
      "weight": 112.5,
      "reps": 7,
      "createdAt": "2025-03-20T02:04:35.638Z"
    },
    {
      "weight": 112.5,
      "reps": 6,
      "createdAt": "2025-03-20T02:04:35.638Z"
    },
    {
      "weight": 115,
      "reps": 8,
      "createdAt": "2025-03-23T02:04:35.638Z"
    },
    {
      "weight": 115,
      "reps": 7,
      "createdAt": "2025-03-23T02:04:35.638Z"
    },
    {
      "weight": 115,
      "reps": 7,
      "createdAt": "2025-03-23T02:04:35.638Z"
    },
    {
      "weight": 117.5,
      "reps": 8,
      "createdAt": "2025-03-26T02:04:35.638Z"
    },
    {
      "weight": 117.5,
      "reps": 7,
      "createdAt": "2025-03-26T02:04:35.638Z"
    },
    {
      "weight": 117.5,
      "reps": 6,
      "createdAt": "2025-03-26T02:04:35.638Z"
    },
    {
      "weight": 120,
      "reps": 7,
      "createdAt": "2025-03-29T02:04:35.638Z"
    },
    {
      "weight": 120,
      "reps": 6,
      "createdAt": "2025-03-29T02:04:35.638Z"
    },
    {
      "weight": 120,
      "reps": 6,
      "createdAt": "2025-03-29T02:04:35.638Z"
    },
    {
      "weight": 122.5,
      "reps": 7,
      "createdAt": "2025-04-01T02:04:35.638Z"
    },
    {
      "weight": 122.5,
      "reps": 6,
      "createdAt": "2025-04-01T02:04:35.638Z"
    },
    {
      "weight": 122.5,
      "reps": 5,
      "createdAt": "2025-04-01T02:04:35.638Z"
    }
  ]
};

const recentsTest = ["barbell row"]

export default function TrackScreen() {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const {logCpy, recentsCpy, makeLogChanges} = useWorkoutContext();

  const [selectGroups, setSelectGroups] = useState(Array.from({ length: muscleGroups.length }, (_, i) => i));

  const handleGroupPress = (index) => {
    if (selectGroups.includes(index)) {
      setSelectGroups(prev => prev.filter(i => i !== index));
    } else {
      setSelectGroups(prev => [...prev, index]);
    }
  };

  const renderHeader = () => (
    <View>
      <View style={styles.muscleGroups}>
        <View style={styles.muscleRow}>
          {muscleGroups.slice(0, 4).map((group, index) => (
            <ThemedPressable 
              key={index} 
              type="slanted" 
              style={[styles.muscleButton1, selectGroups.includes(index) ? styles.muscleButtonSelected : {}]}
              onPress={() => handleGroupPress(index)}
            >
              <ThemedText>{group}</ThemedText>
            </ThemedPressable>
          ))}
        </View>
        <View style={styles.muscleRow}>
          {muscleGroups.slice(4, 7).map((group, index) => (
            <ThemedPressable 
              key={index} 
              type="slanted" 
              style={[styles.muscleButton2, selectGroups.includes(index + 4) ? styles.muscleButtonSelected : {}]}
              onPress={() => handleGroupPress(index + 4)}
            >
              <ThemedText>{group}</ThemedText>
            </ThemedPressable>
          ))}
        </View>
      </View>
    </View>
  );

  const renderExerciseItem = (exercise) => (
    <View style={styles.exerciseItem}>
      <View style={styles.exerciseHeader}>
        <ThemedText type="header" style={styles.exerciseTitle}>{exercise}</ThemedText>
        <PopupPressable 
          popupBody={() =><LogList exercise={exercise}/>}
          style={styles.viewLogButton}
          onClose={() => makeLogChanges(exercise)}
        >
          <ThemedText style={styles.viewLogText}>View Complete Log</ThemedText>
        </PopupPressable>
      </View>
      <Graph exercise={exercise}/>
    </View>
  );

  const checkRender = (exercise) => {
    if (!(exercise in logCpy)) {
      return false;
    }

    if (logCpy[exercise].length === 0) {
      return false;
    }

    const muscleGroup = MOVEMENTS[exercise].primary;

    if (!muscleGroups.includes(muscleGroup)) {
      return selectGroups.includes(muscleGroups.length - 1);
    } else {
      const muscleIndex = muscleGroups.indexOf(muscleGroup);
      return selectGroups.includes(muscleIndex);
    }
  }

  // FIXME: add the muscle group to the log entries 

  return (
    <ThemedView style={styles.container}>
      <MainHeader title="Log" subHeaderComponent={renderHeader()} />
      <ScrollView>
        <View style={styles.exerciseList}>
          {recentsCpy.map(exercise => checkRender(exercise) && renderExerciseItem(exercise))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 25
    },
    muscleGroups: {
      marginTop: 20,
      flexDirection: 'column',
      flexWrap: 'wrap',
      paddingHorizontal: 15,
      width: windowWidth,
      alignSelf: 'center',
      gap: 0,
    },
    muscleRow: {
      flexDirection: 'row',
      gap: 0,
    },
    muscleButtonSelected: {
      borderColor: colors.background,
      backgroundColor: colors.tint,
    },
    muscleButton1: {
      width: "25%",
      height: 35,
      borderWidth: 1,
      borderColor: colors.tint,
      backgroundColor: colors.background,
    },
    muscleButton2: {
      width: "33%",
      height: 30,
      borderWidth: 1,
      borderColor: colors.tint,
      backgroundColor: colors.background,
    },
    muscleButton: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 5,
    },
    exerciseList: {
      width: '100%',
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    exerciseItem: {
      width: windowWidth * .85,
      alignSelf: 'center',
      borderWidth: 2,
      borderColor: colors.accentLight,
      borderRadius: 8,
      backgroundColor: colors.background,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden',
      marginBottom: 20,
      paddingBottom: 0,
    },
    exerciseHeader: {
      borderBottomWidth: 1,
      borderBottomColor: colors.accentLight,
      paddingVertical: 12,
      paddingHorizontal: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    exerciseTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
    viewLogButton: {
      alignSelf: 'center',
      borderWidth: 0,
    },
    viewLogText: {
      textDecorationLine: 'underline',
    },
  });
}