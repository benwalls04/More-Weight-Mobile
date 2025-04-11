import WorkoutInfo from "@/components/main/WorkoutInfo";
import { useUserContext } from "@/hooks/UserContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import FooterButton from "@/components/main/FooterButton";
import { FlatList, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Popup from "@/components/Popup";
import { useEditContext } from "@/hooks/EditContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { EditProvider } from "@/hooks/EditContext";
import { useState } from "react";
import getWorkoutTitle from "@/functions/getWorkoutTitle";
const windowWidth = Dimensions.get("window").width;
const HEADER_WIDTH = windowWidth * .9;


const EditPage = () => {
  return (
    <EditProvider>
      <EditPageContent />
    </EditProvider>
  );
};

export default EditPage;

function EditPageContent() {

  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const Styles = createStyles(colors);

  const WEEKDAYS = ["M", "T", "W", "Th", "F", "S", "Su"]
  const WEEKDAYS_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const { routineCpy, isSavingRoutine, isSigningUp } = useUserContext();
  const { dayIndex, setDayIndex, finish, maxDay, maxed } = useEditContext();
  const workoutCpy = routineCpy[dayIndex];

  const restIndex = [];
  routineCpy.forEach((day, index) => {
    if (day.title === "rest"){
      restIndex.push(index);
    }
  })

  const handleMaxIntensity = () => {
    maxDay();
    setMaxPopupVisible(false);
  }

  const [maxPopupVisible, setMaxPopupVisible] = useState(false);
  const maxBody = () => {
    return (
      <View>
        <ThemedText type="title"style={{textAlign: "center", marginBottom: 10}}>Are you sure?</ThemedText>
        <ThemedText style={{textAlign: "center", lineHeight: 20}}>This will make all sets RPE 10, which could be overkill depending on your experience level. It also may cause your workout time to exceed your time limit.</ThemedText>
        <ThemedPressable style={Styles.confirmBtn} onPress={handleMaxIntensity} label="Confirm Max Intensity" hint="You acknowledge the warning and wish to make all sets RPE 10">
          <ThemedText style={{fontSize: 14}}>Yes</ThemedText>
        </ThemedPressable>
      </View>
    )
  }

  const handleFinish = async () => {
    if (isSavingRoutine || isSigningUp) return;
    try {
      await finish();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  return (
      <ThemedView style={Styles.container} label="Edit Routine Page">
        {maxPopupVisible && <Popup body={maxBody} onClose={() => setMaxPopupVisible(false)}/>}
        <View style={Styles.headerContainer}>
          <FlatList 
              data={WEEKDAYS}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={Styles.weekdayBtnContainer}
              renderItem={({ item, index}) => (
              <ThemedPressable 
                onPress={restIndex.includes(index) ? () => {} : () => setDayIndex(index)} 
                style={[
                  Styles.weekdayBtn, 
                  {
                    backgroundColor: restIndex.includes(index) 
                      ? colors.accentLight 
                      : index === dayIndex 
                        ? colors.tint 
                        : "transparent",
                    marginRight: index < WEEKDAYS.length - 1 ? 1 : 0,
                  }
                ]}
                label={WEEKDAYS_LABELS[index]}
                hint={"View the workout for " + WEEKDAYS_LABELS[index]}
              >
                <ThemedText>{item}</ThemedText>
              </ThemedPressable>
            )}
          />
          <ThemedText type="title" style={{marginTop: 10, marginBottom: 10}}>{getWorkoutTitle(workoutCpy.title)}</ThemedText>
        </View>

        {workoutCpy.title !== "rest" && <ThemedPressable style={[Styles.maxBtn, maxed[dayIndex] && {backgroundColor: colors.tint}]} onPress={maxed[dayIndex] ? () => {} : () => setMaxPopupVisible(true)} label="Max The Intensity of This Workout" hint="This will allow you to make all the sets RPE 10, which means maximum intensity">
          <ThemedText>Max Intensity</ThemedText>
        </ThemedPressable >} 

        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 120, paddingHorizontal: 15}}
          >
            {workoutCpy.movements.map((item, index) => (
              <WorkoutInfo 
                key={index.toString()}
                workoutCpy={workoutCpy} 
                workoutIndex={index} 
                movement={item.movement} 
                workoutFlag={false}
              />
            ))}
          </ScrollView>

        <FooterButton 
          clickEvent={isSavingRoutine || isSigningUp ? () => {} : handleFinish} 
          text={isSavingRoutine || isSigningUp ? "Saving..." : "Done Editing"}
          style={isSavingRoutine || isSigningUp ? {opacity: 0.6} : {}}
        />
      </ThemedView>
  )
}

function createStyles (colors) {
  return StyleSheet.create({
    headerContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      zIndex: 10,
      position: 'absolute',
      top: 25,
    },
    container: {
      justifyContent: 'center',
      paddingTop: 100,
      width: '100%',
      overflow: 'hidden',
    },
    weekdayBtnContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: 15,
      paddingBottom: 5,
    }, 
    weekdayBtn: {
      width: (HEADER_WIDTH / 7) - 1, 
      alignItems: "center",
      transform: [{ skewX: '-10deg' }],
      borderRadius: 0,
      height: 44,
      marginHorizontal: 0,
      zIndex: 100,
      overflow: 'hidden', 
    },
    maxBtn: {
      width: 100,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      marginTop: 40,
      zIndex: 100,
      marginBottom: 10,
    },
    confirmBtn: {
      width: 150,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.tint,
      borderRadius: 0,
      marginTop: 20,
      alignSelf: "center",
    }
  })
}