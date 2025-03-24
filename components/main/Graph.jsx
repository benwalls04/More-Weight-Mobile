import { useWorkoutContext } from '@/hooks/WorkoutContext';
import { Svg, Path, Circle, Text as SvgText } from 'react-native-svg';
import { useThemeContext } from '@/hooks/ThemeContext';
import { COLORS } from '@/constants/Colors';
import { View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

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

  const getDayDifference = (date1, date2) => {
    const timeDifference = Math.abs(date1 - date2);
    const dayDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
  }

  const exerciseData = logCpy[exercise] || [];

  // FIXME: store movement info (like rep ranges) in the recents table 
  const maxReps = exerciseData.reduce((max, entry) => {
    return Math.max(max, Number(entry.reps));
  }, 0);
  const minReps = exerciseData.reduce((min, entry) => {
    return Math.min(min, Number(entry.reps));
  }, 0);

  const increment = 5;

  let dayMaxes = {}

  let [maxY, minY, maxWeight, minWeight] = [0, Infinity, 0, Infinity]
  const data = exerciseData.map(entry => {
    maxWeight = Math.max(maxWeight, Number(entry.weight))
    minWeight = Math.min(minWeight, Number(entry.weight))

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

    maxY = Math.max(maxY, res)
    minY = Math.min(minY, res)

    return {res, day, date: new Date(entry.createdAt)}
  }).filter(entry => {
    let keep = false
    if (dayMaxes[entry.day] === entry.res) {
      keep = true
      dayMaxes[entry.day] = -1
    }
    return keep
  }).map(entry => {return {res: entry.res, date: entry.date}});
  
  if (data.length === 0) return null;

  const width = windowWidth * 0.8;  
  const height = 100;
  const padding = 10;
  const graphWidth = width - (padding * 2);
  const graphHeight = height - (padding * 2);
  
  // Create path
  let path = '';
  const points = [];

  data.forEach((point, i) => {
    const x = data.length === 1 
      ? width / 2 
      : (i * (graphWidth / (data.length - 1))) + padding;    
    const y = maxY === minY 
      ? height / 2 
      : height - (((point.res - minY) / (maxY - minY)) * graphHeight + padding);
    path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
    points.push({ x, y, date: point.date });
  });

  const dotRadius = data.length < 10? 4 : data.length < 20? 3 : data.length < 30? 2: 1

  // Calculate positions for min and max tick marks
  const yAxisX = padding * 2.5; // Increased padding for y-axis position
  const maxTickY = maxY === minY 
    ? height / 2 
    : height - padding; // Y position for min value tick
  const minTickY = maxY === minY 
    ? height / 2 
    : padding; // Y position for max value tick

  // Calculate available width for the graph after accounting for axis and padding
  const availableWidth = width - (yAxisX + 10) - padding;
  
  // Calculate the point spacing based on available width
  const totalDays = getDayDifference(new Date(exerciseData[0].createdAt), new Date(exerciseData[exerciseData.length - 1].createdAt))
  const daySpacing = data.length > 1 ? (availableWidth / totalDays) : 0;
  
  // Adjust points to ensure they're all visible with consistent spacing
  const adjustedPoints = [];
  let prevDay = new Date(exerciseData[0].createdAt)
  let prevPos = yAxisX + 10
  points.forEach((point, i) => {
    const dayDiff = getDayDifference(prevDay, point.date)
    const spacing = daySpacing * dayDiff
    const adjustedX = prevPos + spacing
    
    adjustedPoints.push({
      x: adjustedX,
      y: point.y
    });

    prevDay = point.date
    prevPos = adjustedX
  });
  
  // Rebuild the path with adjusted points
  adjustedPoints.sort((a, b) => a.x - b.x);
  let adjustedPath = '';
  adjustedPoints.forEach((point, i) => {
    adjustedPath += `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y} `;
  });

  return (
    <View style={styles.graphContainer}>
      <Svg width={width} height={height}>
        {/* Min tick mark */}
        <Path
          d={`M ${yAxisX} ${maxTickY} L ${yAxisX - 5} ${maxTickY}`}
          stroke={colors.text}
          strokeWidth="1"
          opacity="0.7"
        />
        
        {/* Min value label */}
        <SvgText
          x={yAxisX - 8}
          y={maxTickY + 4}
          fontSize="10"
          textAnchor="end"
          fill={colors.text}
          opacity="0.8"
        >
          {minWeight.toFixed(0)}
        </SvgText>
        
        {/* Max tick mark */}
        <Path
          d={`M ${yAxisX} ${minTickY} L ${yAxisX - 5} ${minTickY}`}
          stroke={colors.text}
          strokeWidth="1"
          opacity="0.7"
        />
        
        {/* Max value label */}
        <SvgText
          x={yAxisX - 8}
          y={minTickY + 4}
          fontSize="10"
          textAnchor="end"
          fill={colors.text}
          opacity="0.8"
        >
          {maxWeight.toFixed(0)}
        </SvgText>

        {/* Line chart with adjusted path */}
        <Path
          d={adjustedPath}
          stroke={colors.tint}
          strokeWidth="2"
          fill="none"
        />
        {adjustedPoints.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={dotRadius}
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
