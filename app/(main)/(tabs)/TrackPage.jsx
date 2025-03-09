import React from 'react';
import { View, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MainHeader from "@/components/main/MainHeader";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { useWorkoutContext } from "@/hooks/WorkoutContext";
import Svg, { Path, Line } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;

export default function TrackScreen() {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const {logCpy, recentsCpy} = useWorkoutContext();

  console.log(logCpy);

  const renderHeader = () => (
    <View>
      <View style={styles.headerControls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity style={styles.sortButton}>
          <ThemedText>Sort by recents</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.muscleGroups}>
      <TouchableOpacity style={[styles.muscleButton, { backgroundColor: colors.tint }]}>
        <ThemedText>chest</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.muscleButton, { backgroundColor: colors.tint }]}>
        <ThemedText>back</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.muscleButton, { backgroundColor: colors.tint }]}>
        <ThemedText>legs</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.muscleButton, { backgroundColor: colors.tint }]}>
        <ThemedText>shoulders</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.muscleButton, { backgroundColor: colors.tint }]}>
        <ThemedText>biceps</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.muscleButton, { backgroundColor: colors.tint }]}>
        <ThemedText>triceps</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.muscleButton, { backgroundColor: colors.tint }]}>
        <ThemedText>accessories</ThemedText>
      </TouchableOpacity>
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
          {/* Base line */}
          <Line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke={colors.text}
            strokeWidth="1"
          />
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
      </View>
      {renderGraph(exercise)}
      <View style={styles.exerciseDetails}>
        <View style={styles.detailGroup}>
          <ThemedText>Date</ThemedText>
          <TextInput 
            style={styles.valText}
            value="NA"
            editable={false}
          />
        </View>
        <View style={styles.detailGroup}>
          <ThemedText>Weight</ThemedText>
          <TextInput 
            style={styles.valText}
            value="NA"
            editable={false}
          />
        </View>
        <View style={styles.detailGroup}>
          <ThemedText>Reps</ThemedText>
          <TextInput 
            style={styles.valText}
            value="NA"
            editable={false}
          />
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView>
      <MainHeader title="Log" subHeaderComponent={renderHeader()} />
      <ScrollView style={styles.container}>
        <View style={styles.exerciseList}>
          {recentsCpy.map(exercise => renderExerciseItem(exercise))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    headerControls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginRight: 10,
      color: colors.text,
    },
    sortButton: {
      padding: 10,
    },
    muscleGroups: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 15,
      gap: 5,
      marginBottom: 20,
    },
    muscleButton: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 5,
    },
    graphContainer: {
      height: 100,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.accentLight,
    },
    exerciseList: {
      width: '100%',
      paddingHorizontal: 10,
      paddingTop: 10,
      gap: 15,
    },
    exerciseItem: {
      width: windowWidth * .8,
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
    },
    exerciseHeader: {
      borderBottomWidth: 1,
      borderBottomColor: colors.accentLight,
      paddingVertical: 12,
      paddingHorizontal: 15,
    },
    exerciseTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
    exerciseDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 12,
      width: '100%',
    },
    detailGroup: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    valText: {
      backgroundColor: colors.accent,
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderRadius: 4,
      width: 40,
      textAlign: 'center',
      color: colors.text,
    },
  });
}