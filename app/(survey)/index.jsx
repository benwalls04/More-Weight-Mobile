import { SURVEY_DATA } from "@/constants/Survey";
import { FlatList, View } from "react-native";
import { Dimensions } from "react-native";
import { useRef, useState } from "react";

import SurveyRange from "@/components/survey/SurveyRange";
import SurveyGrid from "@/components/survey/SurveyGrid";
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedPressable } from "@/components/ThemedPressable"
import { useSurveyContext } from "@/hooks/SurveyContext";

export default function Survey() {

  const { getSplits, checkErrors } = useSurveyContext();

  const entry = (item, index, ref) => {
    if (index >= SURVEY_DATA.findIndex(item => item.key === "horizontal-press") && index <= SURVEY_DATA.findIndex(item => item.key === "extension")) {
      return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={index} listRef={ref} errorMsg={errors[index]}/>;
    }

    switch (item.type) {
      case "one":
        return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={index} listRef={ref} errorMsg={errors[index]}/>;
      case "many":
        return <SurveyGrid type="many" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={index} errorMsg={errors[index]}/>;
      case "range":
        return <SurveyRange data={item.options} title={item.title} surveyIndex={index}/>;
      case "submit":
        return <Proceed/>
    } 
  }

  const Proceed = () => {
    return (
      <ThemedView>
        <ThemedPressable 
            style={{
              width: "100%",
              alignSelf: "center",
              height: "50%", 
              border: "none"
            }}
            onPress={() => handleNext()}>
              <ThemedText style={{fontSize: 20, textAlign: "center"}}>
                Click Here To Proceed
              </ThemedText>    
            </ThemedPressable>
      </ThemedView>
    );
  };

  const [errors, setErrors] = useState({});
  const [errorMode, setErrorMode] = useState(false);

  const errorRouter = () => {
    if (!ref.current || Object.keys(errors).length === 0) return;

    const firstErrorIndex = Math.min(...Object.keys(errors).map(Number));

    ref.current.scrollToIndex({
      index: firstErrorIndex,
      animated: true, 
      viewPosition: 0 
    });
  }

  const handleNext = () => {
    const errors = checkErrors();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setErrorMode(true);
      errorRouter(); 
    } else {
      getSplits();
    }
  }

  const windowHeight = Dimensions.get('window').height;
  const ref = useRef(null);

  return (
    <FlatList
      style={{flex: 1}}
      data={SURVEY_DATA} 
      ref={ref}
      keyExtractor={(item, index) => index.toString()} 
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
            {entry(item, index, ref)}
          </View>
        )
      }}
    />
  );
}