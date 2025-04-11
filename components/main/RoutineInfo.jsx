import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
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

  let restDays = [];
  routine.routine.forEach((day, index) => {
    if (day.title === "rest") {
      restDays.push(days[index]);
    }
  });

  const [changingRoutine, setChangingRoutine] = useState(false);

  const handleConfirm = async () => {
    if (changingRoutine) {
      Alert.alert("Please wait for the routine to change");
      return;
    }
    
    setPopupVisible(false);
    setRoutine(routine.routine);
    setRoutineCpy(routine.routine);
    setSplitTitle(routine.title);
    setChangingRoutine(true);
    
    let updatedInfo = info ? {...info} : {};
    updatedInfo.sets = routine.numSets;
    setInfo(updatedInfo);
    
    try {
      await axios.post('https://more-weight.com/change-routine', {
        username: username,
        title: routine.title,
      });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setChangingRoutine(false);
    }
  }

  const popupBody = () => {
    return (
      <View style={{padding: 20, height: 230, justifyContent: 'flex-start', alignItems: 'center'}}>
        <ThemedText type="header"style={{textAlign: 'center'}}>Are you sure you want to change to this routine?</ThemedText>
        <ThemedText style={{textAlign: 'center', lineHeight: 20, paddingTop: 10}}>If you are currently working out, todays progress may be lost.</ThemedText>
        <ThemedPressable style={styles.confirmButton} onPress={handleConfirm} label="Confirm Routine Change" hint="You acknowledge the warning and wish to change to this routine">
          <ThemedText style={{textAlign: 'center'}}>Yes</ThemedText>
        </ThemedPressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Popup visible={popupVisible} body={popupBody} onClose={() => setPopupVisible(false)}></Popup>
      <TouchableOpacity 
        style={styles.rowTouchable}
        onPress={() => !selected && setPopupVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.columnGrid}>
          <View style={{flex: 1}}>
            <View style={[styles.checkButton, selected && {backgroundColor: colors.tint}]}>
              {selected && <ThemedText style={{textAlign: 'center', color: colors.tint}}>✓</ThemedText>}
            </View>
          </View>
          <View style={{flex: 6}}>
            <View style={styles.titleRow}>
              <ThemedText>{routine.title}</ThemedText>
              <TouchableOpacity 
                style={styles.editButton} 
                onPress={handleEditRoutine}
                accessible={true}
                accessibilityLabel="Edit Routine"
                accessibilityRole="button"
                accessibilityHint="Edit the routine"
              >
                <Feather 
                  name="edit-2" 
                  size={22} 
                  color={colors.text} 
                />
              </TouchableOpacity>
            </View>
            <ThemedText style={{lineHeight: 12}}>Rest Days: {restDays.join(", ")}</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
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
      height: 45,
      width: 45,
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginRight: -10,
    },
    checkButton: {
      height: 25,
      width: 25,
      color: colors.background,
      borderColor: colors.tint,
      borderWidth: 1,
      borderRadius: 4,
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
    },
    rowTouchable: {
      width: '100%',
    },
  })
}
