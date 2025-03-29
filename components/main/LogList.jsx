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
      
      <View style={styles.headerContainer}>
        <View style={styles.logListHeader}>
          <ThemedText style={styles.logListHeaderText}>Date</ThemedText>
          <ThemedText style={styles.logListHeaderText}>Weight</ThemedText>
          <ThemedText style={styles.logListHeaderText}>Reps</ThemedText>
        </View>
      </View>
      
      <ScrollView 
        style={styles.popupScroll}
        contentContainerStyle={styles.scrollContent}
      >
        {exerciseData.map((entry, index) => (
          <LogListRow key={index} entry={entry} index={exerciseData.length - (index + 1)} />
        ))}
      </ScrollView>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    popupContent: {
      width: '100%',
      height: 300, // Set a fixed height or adjust as needed
      display: 'flex',
      flexDirection: 'column',
    },
    popupTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
    },
    headerContainer: {
      height: 30,
      width: '100%',
      backgroundColor: colors.popupColor,
      zIndex: 2,
    },
    logListHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      height: '100%',
      alignItems: 'center',
    },
    logListHeaderText: {
      width: "33%",
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    popupScroll: {
      flex: 1,
      width: '100%',
    },
    scrollContent: {
      paddingBottom: 10,
    }
  });
}

