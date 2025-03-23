import { useWorkoutContext } from '@/hooks/WorkoutContext';
import { Svg, Path, Circle } from 'react-native-svg';
import { useThemeContext } from '@/hooks/ThemeContext';
import { COLORS } from '@/constants/Colors';
import { View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { useUserContext } from "@/hooks/UserContext";

const windowWidth = Dimensions.get('window').width;

export default function Graph({exercise}) {
  const { logCpy } = useWorkoutContext();
  const { theme } = useThemeContext();

  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  }

  const exerciseData = logCpy[exercise] || [];

  console.log(exerciseData)

  // FIXME: store movement info (like rep ranges) in the recents table 
  const maxReps = exerciseData.reduce((max, entry) => {
    return Math.max(max, Number(entry.reps));
  }, 0);
  const minReps = exerciseData.reduce((min, entry) => {
    return Math.min(min, Number(entry.reps));
  }, 0);
  const increment = 5;

  let dayMaxes = {}

  const data = exerciseData.map(entry => {
    const expRepDiff = maxReps - minReps
    const realRepDiff = maxReps - Number(entry.reps)
    const scale = 1 - (realRepDiff / expRepDiff)
    const res = Number(entry.weight) + scale * increment
    const day = formatDate(entry.createdAt)
    if (day in dayMaxes) {
      dayMaxes[day] = Math.max(dayMaxes[day], res)
    } else {
      dayMaxes[day] = res
    }
    return {res, day}
  }).filter(entry => {
    let keep = false
    if (dayMaxes[entry.day] === entry.res) {
      keep = true
      dayMaxes[entry.day] = -1
    }
    return keep
  }).map(entry => entry.res);

  
  if (data.length === 0) return null;

  const width = windowWidth * 0.8;  // Match container width
  const height = 100;
  const padding = 10;
  const graphWidth = width - (padding * 2);
  const graphHeight = height - (padding * 2);

  // Find min and max for scaling
  const maxY = Math.max(...data);
  const minY = Math.min(...data);
  
  // Create path
  let path = '';
  const points = [];

  data.forEach((point, i) => {
    const x = data.length === 1 ? width / 2 : (i * (graphWidth / (data.length - 1))) + padding;    
    const y = maxY === minY 
      ? height / 2 
      : height - (((point - minY) / (maxY - minY)) * graphHeight + padding);
    path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
    points.push({ x, y });
  });

  return (
    <View style={styles.graphContainer}>
      <Svg width={width} height={height}>
        {/* Line chart */}
        <Path
          d={path}
          stroke={colors.tint}
          strokeWidth="2"
          fill="none"
        />
        {points.map((point, index) => (
        <Circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="4"
          fill={colors.tint}
        />
      ))}
      </Svg>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    graphContainer: {
      height: 130,
      alignSelf: 'center',
      backgroundColor: colors.background,
      justifyContent: 'center',
    },
  });
}
