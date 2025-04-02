import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useUserContext } from "@/hooks/UserContext";
import { ThemedPressable } from "@/components/ThemedPressable";
import Popup from "@/components/Popup";
import { COLORS } from "@/constants/Colors";
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import axios from "axios";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function RoutineInfo({routine, selected, last}) {
  const router = useRouter();
  const theme = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);
  const { setRoutine, setRoutineCpy, setSplitTitle, setInfo, info, username } = useUserContext();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleEditRoutine = () => {
    setRoutineCpy(routine.routine);
    setRoutine(routine.routine);
    setSplitTitle(routine.title);
    router.push("(main)/EditPage");
  };

  const handleAddRoutine = () => {
    router.push("(survey)");
  }

  let restDays = [];
  routine.routine.forEach((day, index) => {
    if (day.title === "rest") {
      restDays.push(days[index]);
    }
  });

  const handleConfirm = async () => {
    setPopupVisible(false);
    setRoutine(routine.routine);
    setRoutineCpy(routine.routine);
    setSplitTitle(routine.title);
    let updatedInfo = info ? {...info} : {};
    updatedInfo.sets = routine.numSets;
    setInfo(updatedInfo);
    
    await axios.post('http://192.168.1.253:3000/change-routine', {
      username: username,
      title: routine.title,
    })
  }

  const popupBody = () => {
    return (
      <View style={{padding: 20, height: 230, justifyContent: 'flex-start', alignItems: 'center'}}>
        <ThemedText type="header"style={{textAlign: 'center'}}>Are you sure you want to change to this routine?</ThemedText>
        <ThemedText style={{textAlign: 'center', lineHeight: 20, paddingTop: 10}}>If you are currently working out, todays progress may be lost.</ThemedText>
        <ThemedPressable style={styles.confirmButton} onPress={handleConfirm}>
          <ThemedText style={{textAlign: 'center'}}>Yes</ThemedText>
        </ThemedPressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Popup visible={popupVisible} body={popupBody} onClose={() => setPopupVisible(false)}></Popup>
      <View style={styles.columnGrid}>
        <View style={{flex: 1}}>
          <TouchableOpacity style={[styles.checkButton, selected && {backgroundColor: colors.tint}]} onPress={() => !selected && setPopupVisible(true)}>
            {selected && <ThemedText style={{textAlign: 'center', color: colors.tint}}>✓</ThemedText>}
          </TouchableOpacity>
        </View>
        <View style={{flex: 6}}>
          <View style={styles.titleRow}>
            <ThemedText>{routine.title}</ThemedText>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={handleEditRoutine}
            >
              <Feather 
                name="edit-2" 
                size={18} 
                color={colors.text} 
              />
            </TouchableOpacity>
          </View>
          <ThemedText style={{lineHeight: 12}}>Rest Days: {restDays.join(", ")}</ThemedText>
        </View>
      </View>
      {last && <ThemedPressable type="slanted" style={styles.addButton} onPress={handleAddRoutine}>
        <ThemedText style={{marginTop: -12, fontSize: 20}}>+</ThemedText>
      </ThemedPressable>}
    </View>
  )
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      width: '100%',
      borderBottomColor: colors.accentLight,
      paddingBottom: 25,
      paddingTop: 10,
      paddingHorizontal: 10,
    },
    columnGrid: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    editButton: {
      padding: 5,
    },
    checkButton: {
      height: 25,
      width: 25,
      color: colors.background,
      borderColor: colors.tint,
      borderWidth: 1,
      borderRadius: 4,
    },
    addButton: {
      height: 30,
      width: 50,
      alignSelf: 'center',
      position: 'absolute',
      bottom: -20,
    },
    confirmButton: {
      marginTop: 25,
      backgroundColor: colors.tint,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 4,
      alignSelf: 'center',
      width: 200,
      height: 40,
    }
  })
}
