import { SURVEY_DATA } from "@/constants/Survey";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { Dimensions } from "react-native";
import { useRef } from "react";

import SurveyRange from "@/components/SurveyRange";
import SurveyGrid from "@/components/SurveyGrid";
import SurveyNumber from "@/components/SurveyNumber";
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedPressable } from "@/components/ThemedPressable"
import { ThemedLayout } from "@/components/ThemedLayout"

export default function Survey() {

  const entry = (item, ref) => {
    if (item.id >= SURVEY_DATA.find(item => item.key === "horiz-press").id && item.id <= SURVEY_DATA.find(item => item.key === "ext").id) {
      return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={item.id - 1} btnHeight={65} listRef={ref}/>;
    }

    switch (item.type) {
      case "one":
        return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={item.id - 1} listRef={ref}/>;
      case "many":
        return <SurveyGrid type="many" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={item.id - 1}/>;
      case "range":
        return <SurveyRange data={item.options} title={item.title} surveyIndex={item.id - 1}/>;
      case "number":
        return <SurveyNumber key={item.key}/>;
      case "submit":
        return <Proceed/>
    } 
  }

  const Proceed = () => {
    return (
      <ThemedView>
        <ThemedLayout 
          header={<ThemedText style={{textAlign: "center", fontSize: 28}}>Would you like to proceed?</ThemedText>}
          body={
          <ThemedPressable 
            style={{
              width: "100%",
              alignSelf: "center",
            }}
            onPress={() => console.log("Proceed clicked!")}>
              <ThemedText style={{fontSize: 20, textAlign: "center"}}>
                Yes
              </ThemedText>    
            </ThemedPressable>}
        />
      </ThemedView>
    );
  };
  

  const windowHeight = Dimensions.get('window').height;
  const ref = useRef(null);

  return (
    <FlatList
      style={{flex: 1}}
      data={SURVEY_DATA} 
      ref={ref}
      keyExtractor={(item) => item.id} 
      pagingEnabled={true}
      ItemSeparatorComponent={() => null}
      initialNumToRender={SURVEY_DATA.length}
      maxToRenderPerBatch={SURVEY_DATA.length}
      getItemLayout={(data, index) => ({
        length: windowHeight,
        offset: windowHeight * index,
        index
      })}
      renderItem={({ item, index }) => {
        return (
          <View style={{height: windowHeight}}>
            {entry(item, ref)}
          </View>
        )
      }}
    />
  );
}