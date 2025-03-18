import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MainHeader from "@/components/main/MainHeader";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { useWorkoutContext } from "@/hooks/WorkoutContext";
import Svg, { Path } from 'react-native-svg';
import PopupPressable from "@/components/PopupPressable";
import { ThemedPressable } from "@/components/ThemedPressable";
const windowWidth = Dimensions.get('window').width;
import { MOVEMENTS } from "@/constants/Movements";
import LogList from "@/components/main/LogList";

const muscleGroups = ["chest", "back", "legs", "shoulders", "biceps", "triceps", "accessories"];

export default function TrackScreen() {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const {logCpy, recentsCpy} = useWorkoutContext();

  const [selectGroups, setSelectGroups] = useState(Array.from({ length: muscleGroups.length }, (_, i) => i));

  console.log(selectGroups)

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

  const renderGraph = (exercise) => {
    const exerciseData = logCpy[exercise] || [];
    const data = exerciseData.map(entry => Number(entry.weight) || 0);
    
    if (data.length === 0) return null;

    const width = windowWidth * 0.8;  // Match container width
    const height = 100;
    const padding = 10;
    const graphWidth = width - (padding * 2);
    const graphHeight = height - (padding * 2);

    // Find min and max for scaling
    const maxY = Math.max(...data);
    const minY = Math.min(...data);
    
    // Create path
    let path = '';
    data.forEach((point, i) => {
      const x = (i * (graphWidth / (data.length - 1))) + padding;
      const y = height - (((point - minY) / (maxY - minY)) * graphHeight + padding);
      path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
    });

    return (
      <View style={styles.graphContainer}>
        <Svg width={width} height={height}>
          {/* Line chart */}
          <Path
            d={path}
            stroke={colors.tint}
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      </View>
    );
  };

  const renderExerciseItem = (exercise) => (
    <View style={styles.exerciseItem}>
      <View style={styles.exerciseHeader}>
        <ThemedText type="header" style={styles.exerciseTitle}>{exercise}</ThemedText>
        <PopupPressable 
          popupBody={() =><LogList exercise={exercise}/>}
          style={styles.viewLogButton}
        >
          <ThemedText style={styles.viewLogText}>View Complete Log</ThemedText>
        </PopupPressable>
      </View>
      {renderGraph(exercise)}
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
    graphContainer: {
      height: 130,
      alignSelf: 'center',
      backgroundColor: colors.background,
      justifyContent: 'center',
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