import { useState } from "react";
import { View, FlatList, StyleSheet, Dimensions, ScrollView, TextInput } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPressable } from "@/components/ThemedPressable";
import { useSurveyContext } from "@/hooks/SurveyContext";
import { COLORS } from "@/constants/Colors";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useUserContext } from "@/hooks/UserContext";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

const WEEKDAYS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
const muscleGroups = ['Chest', 'Back', 'Legs', 'Biceps', 'Triceps', 'Shoulders'];
const windowWidth = Dimensions.get('window').width * .85;

export default function Custom() {
  const { schedule } = useSurveyContext();
  const { theme } = useThemeContext();
  const { addRoutine, setSplitTitle, setSplit, allRoutines, newUser } = useUserContext();
  const router = useRouter();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(Array(WEEKDAYS.length).fill([]));
  const [titleText, setTitleText] = useState("");

  const handleMuscleGroupPress = (muscleGroup, index) => {
    const newSelectedMuscleGroups = [...selectedMuscleGroups];
    newSelectedMuscleGroups[index] = newSelectedMuscleGroups[index].includes(muscleGroup) ? newSelectedMuscleGroups[index].filter(group => group !== muscleGroup) : [...newSelectedMuscleGroups[index], muscleGroup];
    setSelectedMuscleGroups(newSelectedMuscleGroups);
  }

  const handleSubmit = () => {
    if (selectedMuscleGroups.some((day, index) => schedule[index] !== "rest" && day.length === 0)) {
      Alert.alert("Please select a muscle group for each day.");
      return;
    }

    if (titleText === "") {
      Alert.alert("Please enter a split title.");
      return;
    }

    if (allRoutines.some(routine => routine.title === titleText)) {
      Alert.alert("A routine with this title already exists.");
      return;
    }

    if (!muscleGroups.every(group => selectedMuscleGroups.some(day => day.includes(group)))) {
      Alert.alert("Please select a muscle group for each day.");
      return;
    }

    const split = selectedMuscleGroups.map((entry) => {
      if (entry.length === 0) {
        return "rest";
      }
      return entry.map(group => group.toLowerCase()).join(" ");
    });

    setSplit(split);
    setSplitTitle(titleText);
    
    if (newUser) {
      router.push("/(auth)/SignUpPage");
    } else {
      addRoutine(titleText, split);
    }

  }

  const renderDay = (item, index) => {
    const dayTitle = item === "rest" ? "Rest" : selectedMuscleGroups[index].join(", ");

    return (
      <View style={item === "rest" ? styles.dayContainerRest : styles.dayContainer}>
        <ThemedText type="subheader" style={styles.dayTitle}>{WEEKDAYS[index]}: {dayTitle}</ThemedText>
        {item !== "rest" && <ScrollView horizontal={true} contentContainerStyle={styles.muscleGroupContainer}>
          {muscleGroups.map((muscleGroup, muscleIndex) => (
            <ThemedPressable key={muscleIndex} type="pill" onPress={() => handleMuscleGroupPress(muscleGroup, index)} style={selectedMuscleGroups[index].includes(muscleGroup) ? styles.selectedMuscleGroup : null} label={muscleGroup} hint="If selected, this muscle group will be included in the workout for this day">
              <ThemedText style={{lineHeight: 14, fontSize: 12}}>{muscleGroup}</ThemedText>
            </ThemedPressable>
          ))}
        </ScrollView>}
      </View>
    )
  }

  return (
    <ThemedView label="Make Your Own Custom Split">
      <View style={styles.container}>
        <ThemedText type="title" style={{marginTop: 20}}>Customize Your Split</ThemedText>
        <TextInput placeholder="Split Title" style={styles.splitTitleInput} onChangeText={(text) => setTitleText(text)}
          accessible={true}
          accessibilityLabel="Split Title"
          accessibilityRole="text"
          accessibilityHint="Enter the title of your split"
        />
        <FlatList
          data={schedule}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            renderDay(item, index)
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: windowWidth}}>
        <ThemedPressable onPress={() => router.back()} style={styles.submitButton} label="Go Back"> 
          <ThemedText>Back</ThemedText>
        </ThemedPressable>

        <ThemedPressable onPress={() => handleSubmit()} style={styles.submitButton} label="Submit">
          <ThemedText>Submit</ThemedText>
        </ThemedPressable>
      </View>
    </ThemedView>
  )
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
    },
    listContainer: {
      width: windowWidth,
      marginTop: 20,
      paddingBottom: 100,
    },
    dayContainer: {
      flexDirection: 'column',
      borderColor: colors.accentLight,
      height: 100,
      width: '100%',
      borderWidth: 1,
    },
    dayContainerRest: {
      backgroundColor: colors.accentLight,
      height: 50,
    },
    dayTitle: {
      marginLeft: 10,
      marginTop: 10,
    },
    splitTitleInput: {
      width: windowWidth,
      marginTop: 20,
      borderWidth: 1,
      borderColor: colors.accentLight,
      padding: 10,
      color: colors.text,
      fontSize: 16,
    },
    muscleGroupContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '160%',
      paddingLeft: 10,
      paddingRight: 30,
    },
    selectedMuscleGroup: {
      backgroundColor: colors.tint,
    },
    submitButton: {
      borderWidth: 0,
      height: 40,
      width: '49%',
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.tint,
    }, 
  })
}
