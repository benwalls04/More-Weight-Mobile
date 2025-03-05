import WorkoutInfo from "@/components/main/WorkoutInfo";
import { useUserContext } from "@/hooks/UserContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import FooterButton from "@/components/main/FooterButton";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
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

  return (
      <ThemedView>
        <View style={Styles.headerContainer}>
          <FlatList 
              data={WEEKDAYS}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={Styles.weekdayBtnContainer}
              renderItem={({ item, index}) => (
              <ThemedPressable onPress={() => setDayIndex(index)} style={Styles.weekdayBtn} type={index === dayIndex ? "selected" : "default"}>
                <ThemedText>{item}</ThemedText>
              </ThemedPressable>
            )}
          />
        </View>

        <FlatList
          data={routineCpy[dayIndex].movements}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 120}}
          renderItem={({ item, index}) => (
            <WorkoutInfo workoutIndex={index} dayIndex={dayIndex} movement={item.movement} workoutFlag={false} />
          )}
        />        

        <FooterButton clickEvent={finish} text={"Done Editing"}/>
      </ThemedView>
  )
}

function createStyles (colors) {
  return StyleSheet.create({
    headerContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 30,
    },
    weekdayBtnContainer: {
      paddingLeft: 5,
      paddingRight: 5,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    }, 
    weekdayBtn: {
      width: HEADER_WIDTH / 7,
      alignItems: "center",
      transform: [{ skewX: '-10deg' }],
      borderRadius: 0,
      height: 40,
      zIndex: 100
    },
  })
}