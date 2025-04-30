import { FlatList, StyleSheet, Dimensions, View, Animated } from "react-native";
import { ThemedPressable } from "../ThemedPressable";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { ThemedLayout } from "../ThemedLayout";
import { useSurveyContext } from "@/hooks/SurveyContext";
import { Ionicons } from "@expo/vector-icons";
let windowWidth = Dimensions.get('window').width * .85;
windowWidth = Math.min(windowWidth, 428);
const windowHeight = Dimensions.get('window').height;
const BUTTON_MARGIN = 3;

export default function SurveyGrid({
  style,
  type = "one",
  title,
  data,
  surveyIndex,
  numColumns = 2,
  btnGrow = false,
  headerLines = 3,
  btnHeight,
  listRef, 
  errorMsg,
  ...otherProps
}) {
  const { surveyData, updateSurveyData } = useSurveyContext();
  const scrollY = new Animated.Value(0);

  const handlePress = (index) => {
    let newData = {...surveyData}[surveyIndex];

    if (newData.includes(index)) {
      newData = newData.filter(item => item !== index);
    } else if (type === 'many') {
      newData = [...newData, index];
    } else if (type === 'one') {
      newData = [index];
    }

    updateSurveyData(surveyIndex, newData);
  }

  const scrollToNext = () => {
    const nextIndex = surveyIndex + 1;
    const offset = nextIndex * windowHeight;
  
    listRef.current.scrollToOffset({ 
      offset, 
      animated: true,
      duration: 3000 
    }); 
  };
  
  const BTN_WIDTH = (windowWidth - (numColumns + 1) * BUTTON_MARGIN * 2) / numColumns;

  return (
    <ThemedView style={{borderWidth: 0}} label={title}>
      <ThemedLayout
      footerFlex={1}
      bodyFlex={1}
      header={
        <ThemedText 
          type="title"
          numberOfLines={headerLines}
          style={{textAlign: 'center', marginBottom: 10, width: '90%'}}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {title}
        </ThemedText>
      }
      body={
        <View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
          <FlatList         
          data={data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          columnWrapperStyle={numColumns > 1 ? styles.row : null}
          renderItem={({item, index}) => (
            <ThemedPressable 
              onPress={() => handlePress(index)}
              type={surveyData[surveyIndex].includes(index) ? "selected" : "default"}
              style={[styles.button, btnGrow ? {flexGrow: 1} : {}, {width: BTN_WIDTH}, {height: 60}]}
              label={String(item.title)}
            >
              <ThemedText style={styles.buttonText}>{item.title}</ThemedText>
            </ThemedPressable>
          )}
          />
          {errorMsg && <ThemedText type="error">{errorMsg}</ThemedText>}
        </View>
      }
      footer={
        <View style={styles.arrowContainer}>
          <ThemedPressable
            onPress={scrollToNext}
            style={styles.arrowButton}
            label="Next Question"
          >
            <Ionicons name="chevron-down" size={30} color="#fff" />
          </ThemedPressable>
        </View>
      }
    />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    alignSelf: 'center',
  },
  list: {
    flexGrow: 1,
    width: '100%',
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: 2 * BUTTON_MARGIN,
  },
  button: {
    marginLeft: BUTTON_MARGIN,
    marginRight: BUTTON_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  submitButton: {
    borderWidth: 0,
    height: 30,
    width: '50%',
    margin: BUTTON_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  arrowContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  arrowButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'none',
    borderWidth: 0,
  },
});
