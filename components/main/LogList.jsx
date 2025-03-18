import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useWorkoutContext } from '@/hooks/WorkoutContext';
import { COLORS } from '@/constants/Colors';
import { useThemeContext } from '@/hooks/ThemeContext';
import { TextInput } from 'react-native';

export default function LogList({ exercise }) {

  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const { logCpy } = useWorkoutContext();
  const exerciseData = logCpy[exercise] || [];

  const [weightText, setWeightText] = useState(exerciseData[0].weight?.toString() || "NA");
  const [repsText, setRepsText] = useState(exerciseData[0].reps?.toString() || "NA");

  const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  }
    
  return (
    <View style={styles.popupContent}>
      <ThemedText style={styles.popupTitle}>{exercise}</ThemedText>
      <ScrollView style={styles.popupScroll}>
        {exerciseData.map((entry, index) => (
          <View key={index} style={styles.popupEntry}>
            <View style={styles.detailGroup}>
              <TextInput 
                style={[styles.valText, styles.dateText]}
                value={formatDate(entry.createdAt) || "NA"}
                editable={false}
              />
            </View>
            <View style={styles.detailGroup}>
              <ThemedText>Weight</ThemedText>
              <TextInput 
                style={styles.valText}
                value={weightText}
                editable={true}
                onChangeText={(text) => setWeightText(text)}
              />
            </View>
            <View style={styles.detailGroup}>
              <ThemedText>Reps</ThemedText>
              <TextInput 
                style={styles.valText}
                value={repsText}
                editable={true}
                onChangeText={(text) => setRepsText(text)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    popupContent: {
      width: '100%',
      maxHeight: '100%',
      paddingTop: 15,
    },
    popupTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
    },
    popupScroll: {
      width: '100%',
      maxHeight: '90%',
    },
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
    },
    dateText: {
      width: 100,
      textAlign: 'center',
    }
  });
}

