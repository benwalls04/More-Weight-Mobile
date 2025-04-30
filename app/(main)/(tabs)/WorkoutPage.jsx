import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import WorkoutInfo from "@/components/main/WorkoutInfo";
import SetScreen from "@/components/main/SetScreen";
import FooterButton from "@/components/main/FooterButton";
import MainHeader from "@/components/main/MainHeader";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useWorkoutContext } from "@/hooks/WorkoutContext";
import getWorkoutTitle from "@/functions/getWorkoutTitle";
import { COLORS } from "@/constants/Colors";

export default function WorkoutPage() {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const { workoutCpy, dayName, workoutFlag, startWorkout, complete } = useWorkoutContext();

  if ((!workoutFlag || complete) && workoutCpy?.movements?.length > 0) {
    return (
      <ThemedView style={styles.container} label="Workout Page">
        <MainHeader title={getWorkoutTitle(workoutCpy.title)} subHeaderComponent={<ThemedText style={{textAlign: 'center'}}>{dayName}</ThemedText>} />
        {workoutCpy.title !== "rest" && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 70, paddingHorizontal: 15, width: '90%'}}
          >
            {workoutCpy.movements.map((item, index) => (
              <WorkoutInfo 
                key={index.toString()}
                workoutCpy={workoutCpy} 
                workoutIndex={index} 
                movement={item.movement} 
                workoutFlag={true}
              />
            ))}
          </ScrollView>
        )}
        {workoutCpy.title === "rest" && (
          <ThemedText type="header" style={{textAlign: 'center', marginTop: 20}}>Maybe it's time you hit some cardio?</ThemedText>
        )}
        {workoutCpy.title !== "rest" && !complete && (
          <FooterButton text={"Begin Workout"} clickEvent={() => startWorkout()} marginBottom={12} />
        )}       
      </ThemedView>
    );
  } else if (workoutCpy?.movements?.length > 0) {
    return (<SetScreen />)
  } else {
    return (
      <ThemedView style={styles.container} label="Workout Page">
        <ThemedText type="header" style={{textAlign: 'center', marginTop: 20}}>Rest Day</ThemedText>
      </ThemedView>
    )
  }
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop: 25,
      width: '100%'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
}