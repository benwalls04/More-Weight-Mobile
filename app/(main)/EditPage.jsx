import WorkoutInfo from "@/components/main/WorkoutInfo";
import { useUserContext } from "@/hooks/UserContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import FooterButton from "@/components/main/FooterButton";
import { FlatList, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { useEditContext } from "@/hooks/EditContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { EditProvider } from "@/hooks/EditContext";
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
  const { routineCpy } = useUserContext();
  const { dayIndex, setDayIndex, finish } = useEditContext();
  const workoutCpy = routineCpy[dayIndex];

  const restIndex = [];
  routineCpy.forEach((day, index) => {
    if (day.title === "rest"){
      restIndex.push(index);
    }
  })

  return (
      <ThemedView style={Styles.container}>
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
                    marginRight: index < WEEKDAYS.length - 1 ? 1 : 0, // Add small gap between buttons
                  }
                ]}
              >
                <ThemedText>{item}</ThemedText>
              </ThemedPressable>
            )}
          />
          <ThemedText type="title" style={{marginTop: 10}}>{workoutCpy.title}</ThemedText>
        </View>

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

        <FooterButton clickEvent={() => finish(0)} text={"Done Editing"}/>
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
      paddingBottom: 10,
    },
    container: {
      justifyContent: 'center',
      paddingTop: 100,
      width: '100%',
      overflow: 'hidden', // Prevent content from overflowing
    },
    weekdayBtnContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: 15,
    }, 
    weekdayBtn: {
      width: (HEADER_WIDTH / 7) - 1, // Subtract 1 to account for the gap
      alignItems: "center",
      transform: [{ skewX: '-10deg' }],
      borderRadius: 0,
      height: 40,
      marginHorizontal: 0,
      zIndex: 100,
      overflow: 'hidden', // Prevent content from overflowing
    },
  })
}