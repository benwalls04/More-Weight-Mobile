import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import WorkoutInfo from "@/components/main/WorkoutInfo";
import SetScreen from "@/components/main/SetScreen";
import FooterButton from "@/components/main/FooterButton";
import MainHeader from "@/components/main/MainHeader";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useWorkoutContext } from "@/hooks/WorkoutContext";
import { COLORS } from "@/constants/Colors";

export default function WorkoutPage() {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const { workoutCpy, dayName, workoutFlag, startWorkout } = useWorkoutContext();

  if (!workoutFlag) {
    return (
      <ThemedView style={styles.container}>
        <MainHeader title={workoutCpy.title} subHeaderComponent={<ThemedText style={{textAlign: 'center'}}>{dayName}</ThemedText>} />
        <FlatList
          data={workoutCpy.movements}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 70}}
          renderItem={({ item, index}) => (
            <WorkoutInfo workoutCpy={workoutCpy} workoutIndex={index} movement={item.movement} workoutFlag={true}/>
          )}
        />        
        <FooterButton text={"Begin Workout"} clickEvent={() => startWorkout()} marginBottom={12} />
      </ThemedView>
    );
  } else {
    return (<SetScreen />)
  }
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 25
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
}