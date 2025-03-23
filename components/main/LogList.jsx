import { View, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useWorkoutContext } from '@/hooks/WorkoutContext';
import { COLORS } from '@/constants/Colors';
import { useThemeContext } from '@/hooks/ThemeContext';
import LogListRow from '@/components/main/LogListRow';

export default function LogList({ exercise }) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const { logCpy } = useWorkoutContext();
  const exerciseData = [...(logCpy[exercise] || [])].reverse();
      
  return (
    <View style={styles.popupContent}>
      <ThemedText style={styles.popupTitle}>{exercise}</ThemedText>
      <View style={styles.scrollContainer}>
        <View style={styles.logListHeader}>
            <ThemedText style={styles.logListHeaderText}>Date</ThemedText>
            <ThemedText style={styles.logListHeaderText}>Weight</ThemedText>
            <ThemedText style={styles.logListHeaderText}>Reps</ThemedText>
        </View>
        <ScrollView style={styles.popupScroll}>
            {exerciseData.map((entry, index) => (
              <LogListRow key={index} entry={entry} index={exerciseData.length - (index + 1)} />
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      overflow: "hidden",
    },
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
      maxHeight: '100%',
      marginTop: 38,
    },
    logListHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    logListHeaderText: {
      width: "33%",
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 2,
    },
  });
}

