import WorkoutInfo from "@/components/main/WorkoutInfo";
import { useEditContext } from "@/hooks/EditContext";
import { EditProvider } from "@/hooks/EditContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedLayout } from "@/components/ThemedLayout";
import { FlatList, StyleSheet } from "react-native";
import { useState } from "react";

export default function EditPage() {
  const { tmpRoutine} = useEditContext();
  [dayIndex, setDayIndex] = useState(0)
  const WEEKDAYS = ["M", "T", "W", "Th", "F", "S", "Su"]

  return (
    <EditProvider>
      <ThemedView>
        <ThemedLayout 
          header={
            <FlatList 
              data={WEEKDAYS}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index}) => (
                <ThemedPressable onPress={() => setDayIndex(index)}>
                  <ThemedText>{item}</ThemedText>
                </ThemedPressable>
              )}
            />
          }

          body={
            <FlatList
              data={tmpRoutine[dayIndex]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index}) => (
                <WorkoutInfo workoutIndex={index} dayIndex={dayIndex} movement={item.movement} />
              )}
            />
          }
        />
      </ThemedView>
    </EditProvider>

  )
}

const Styles = StyleSheet.create({
})