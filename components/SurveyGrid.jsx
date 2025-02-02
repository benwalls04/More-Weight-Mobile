import { FlatList, StyleSheet, Dimensions, View } from "react-native";
import { ThemedPressable } from "./ThemedPressable";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedLayout } from "./ThemedLayoutNew";
import SurveyNavBar from "./SurveyNavBar";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSurveyContext } from "@/hooks/SurveyContext";

const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;

export default function SurveyGrid({
  style,
  type = "one",
  title,
  data,
  surveyIndex,
  numColumns = 2,
  btnGrow = false,
  ...otherProps
}) {
  const { surveyData, updateSurveyData } = useSurveyContext();

  const handlePress = (index) => {
    let newData = {...surveyData}[surveyIndex];

    if (newData.includes(index)) {
      newData.filter(item => item !== index);
    } else if (type === 'many') {
      newData = [...newData, index];
    } else if (type === 'one') {
      newData = [index];
    }

    updateSurveyData(surveyIndex, newData);
  }
  
  //const rem = data.length % numColumns;
  //const maxIndx = data.length - rem + 1;
  //const OF_BTN_WIDTH = (windowWidth - (rem + 1) * BUTTON_MARGIN * 2) / rem;

  const BTN_WIDTH = (windowWidth - (numColumns + 1) * BUTTON_MARGIN * 2) / numColumns;

  return (
    <ThemedView style={{borderWidth: 0}}>
      <ThemedLayout
      header={
        <ThemedText 
          type="title"
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {title}
        </ThemedText>
      }
      body={
        <FlatList         
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          columnWrapperStyle={numColumns > 1 ? styles.row : null}
          renderItem={({item}) => (
            <ThemedPressable 
              onPress={() => handlePress(item.id)}
              type={surveyData[surveyIndex].includes(item.id) ? "selected" : "default"}
              style={[styles.button, btnGrow ? {flexGrow: 1} : {}, {width: BTN_WIDTH}]}
            >
              <ThemedText style={styles.buttonText}>{item.title}</ThemedText>
            </ThemedPressable>
          )}
        />
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
  submitButton: {
    borderWidth: 0,
    height: 30,
    width: '50%',
    margin: BUTTON_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
