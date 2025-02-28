import WorkoutInfo from "@/components/main/WorkoutInfo";
import { useUserContext } from "@/hooks/UserContext";
import { EditProvider } from "@/hooks/EditContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
const windowWidth = Dimensions.get("window").width;
const HEADER_WIDTH = windowWidth * .9;


export default function EditPage() {

  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const Styles = createStyles(colors);

  const [dayIndex, setDayIndex] = useState(0)
  const WEEKDAYS = ["M", "T", "W", "Th", "F", "S", "Su"]
  const { routineCpy } = useUserContext();
      
  return (
    <EditProvider>
      <ThemedView>
        <View style={Styles.headerContainer}>
          <FlatList 
              data={WEEKDAYS}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={Styles.weekdayBtnContainer}
              renderItem={({ item, index}) => (
              <ThemedPressable onPress={() => setDayIndex(index)} style={Styles.weekdayBtn} type={index === dayIndex ? "selected" : "default"}>
                <ThemedText>{item}</ThemedText>
              </ThemedPressable>
            )}
          />
        </View>

        <FlatList
          data={routineCpy[dayIndex].movements}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 120}}
          renderItem={({ item, index}) => (
            <WorkoutInfo workoutIndex={index} dayIndex={dayIndex} movement={item.movement} />
          )}
        />        
            
      </ThemedView>
    </EditProvider>

  )
}

/*
<FlatList
          data={tmpRoutine[dayIndex].movements}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index}) => (
            <WorkoutInfo workoutIndex={index} dayIndex={dayIndex} movement={item.movement} />
          )}
        />
 */

function createStyles (colors) {
  return StyleSheet.create({
    headerContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 30,
    },
    weekdayBtnContainer: {
      paddingLeft: 5,
      paddingRight: 5,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    }, 
    weekdayBtn: {
      width: HEADER_WIDTH / 7,
      alignItems: "center",
      transform: [{ skewX: '-10deg' }],
      borderRadius: 0,
      height: 40,
      zIndex: 100
    }
  })
}