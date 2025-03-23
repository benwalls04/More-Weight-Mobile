import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useThemeContext } from '@/hooks/ThemeContext';
import { COLORS } from '@/constants/Colors';
import { useWorkoutContext } from '@/hooks/WorkoutContext';

export default function LogListRow({ entry, index }) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);
  const { setLogChanges, logChanges } = useWorkoutContext();

  const [weightText, setWeightText] = useState(entry.weight.toString());
  const [repsText, setRepsText] = useState(entry.reps.toString());

  const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  }

  const handleWeightChange = (text) => {
    setWeightText(text);
    const newLogChanges = {...logChanges};
    if (newLogChanges[index]){
      newLogChanges[index].weight = text;
    } else {
      newLogChanges[index] = {weight: text, reps: entry.reps.toString()};
    }

    setLogChanges(newLogChanges);
  }

  const handleRepsChange = (text) => {
    setRepsText(text);
    const newLogChanges = {...logChanges};
    if (newLogChanges[index]){
      newLogChanges[index].reps = text;
    } else {
      newLogChanges[index] = {weight: entry.weight, reps: text.toString()};
    }
    setLogChanges(newLogChanges);
  }

  return (
    <View key={index} style={styles.popupEntry}>
      <View style={styles.detailGroup}>
        <TextInput 
          style={[styles.valText, styles.dateText]}
          value={formatDate(entry.createdAt) || "NA"}
          editable={false}
        />
      </View>
      <View style={styles.detailGroup}>
        <TextInput 
          style={styles.valText}
          value={weightText}
          editable={true}
          onChangeText={handleWeightChange}
        />
      </View>
      <View style={styles.detailGroup}>
        <TextInput 
          style={styles.valText}
          value={repsText}
          editable={true}
          onChangeText={handleRepsChange}
        />
      </View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    popupEntry: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: colors.accentLight,
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
      width: "100%"
    },
    dateText: {
      width: "100%",
      textAlign: 'center',
    }
  });
} 

