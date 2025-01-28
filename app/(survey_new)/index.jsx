import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import { useRouter } from "expo-router";
import { FlatList, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Dimensions } from "react-native";

import SurveyRange from "@/components/SurveyRange";
import SurveyGrid from "@/components/SurveyGrid";
import SurveyNumber from "@/components/SurveyNumber";


export default function SurveyNew() {

  const entry = (item) => {

    console.log(item)
    
    switch (item.type) {
      case "one":
        return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} key={item.key}/>;
      case "many":
        return <SurveyGrid type="many" data={item.options} title={item.title} numColumns={item.cols} key={item.key}/>;
      case "range":
        return <SurveyRange data={item.options} title={item.title} key={item.key}/>;
      case "number":
        return <SurveyNumber key={item.key}/>;
    } 
  }

  const windowHeight = Dimensions.get('window').height;

  const router = useRouter();

  const surveyArray = SURVEY_DATA.slice(0, 6);

  console.log(surveyArray)

  return (
    <FlatList
      style={{flex: 1}}
      data={surveyArray} 
      keyExtractor={(item) => item.id} 
      pagingEnabled={true}
      ItemSeparatorComponent={() => null}
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