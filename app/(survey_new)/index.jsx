import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import { useRouter } from "expo-router";
import { FlatList, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Dimensions } from "react-native";

import SurveyRange from "@/components/SurveyRange";
import SurveyGrid from "@/components/SurveyGrid";
import SurveyNumber from "@/components/SurveyNumber";
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedPressable } from "@/components/ThemedPressable"
import { ThemedLayout } from "@/components/ThemedLayout"

export default function SurveyNew() {

  const entry = (item) => {

    switch (item.type) {
      case "one":
        return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={item.id - 1}/>;
      case "many":
        return <SurveyGrid type="many" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={item.id - 1}/>;
      case "range":
        return <SurveyRange data={item.options} title={item.title} surveyIndex={item.id - 1}/>;
      case "number":
        return <SurveyNumber key={item.key}/>;
      case "submit":
        console.log(item)
        return <Proceed/>
    } 
  }

  const Proceed = () => {
    return (
      <ThemedView>
        <ThemedLayout 
          header={<ThemedText type="title">Would you like to proceed?</ThemedText>}
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
  const router = useRouter();

  return (
    <FlatList
      style={{flex: 1}}
      data={SURVEY_DATA} 
      keyExtractor={(item) => item.id} 
      pagingEnabled={true}
      ItemSeparatorComponent={() => null}
      initialNumToRender={SURVEY_DATA.length}
      maxToRenderPerBatch={SURVEY_DATA.length}
      renderItem={({ item, index }) => {
        return (
          <View style={{height: windowHeight}}>
            {entry(item)}
          </View>
        )
      }}
    />
  );
}