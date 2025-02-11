import { SURVEY_DATA } from "@/constants/Survey";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { Dimensions } from "react-native";
import { useRef, useState } from "react";

import SurveyRange from "@/components/SurveyRange";
import SurveyGrid from "@/components/SurveyGrid";
import SurveyNumber from "@/components/SurveyNumber";
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedPressable } from "@/components/ThemedPressable"
import { useSurveyContext } from "@/hooks/SurveyContext";
import LoadingScreen from "@/components/LoadingScreen";

export default function Survey() {

  const { getSplits, checkErrors } = useSurveyContext();

  const entry = (item, index, ref) => {
    if (index >= SURVEY_DATA.findIndex(item => item.key === "horizontal-press") && index <= SURVEY_DATA.findIndex(item => item.key === "extension")) {
      return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={index} listRef={ref} errorMsg={errors[index]} headerLines={item.headerLines} btnGrow={item.btnGrow}/>;
    }

    switch (item.type) {
      case "one":
        return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={index} listRef={ref} errorMsg={errors[index]} btnGrow={item.btnGrow} headerLines={item.headerLines}/>;
      case "many":
        return <SurveyGrid type="many" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={index} errorMsg={errors[index]} btnGrow={item.btnGrow} headerLines={item.headerLines}/>;
      case "range":
        return <SurveyRange data={item.options} title={item.title} surveyIndex={index} headerLines={item.headerLines}/>;
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
              border: "none", 
              borderWidth: 0,
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
  const [isLoading, setIsLoading] = useState(false);

  const errorRouter = () => {
    if (!ref.current || Object.keys(errors).length === 0) return;

    const firstErrorIndex = Math.min(...Object.keys(errors).map(Number));

    ref.current.scrollToIndex({
      index: firstErrorIndex,
      animated: true, 
      viewPosition: 0 
    });
  }

  const handleNext = async () => {
    setIsLoading(true);
    const errors = checkErrors();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      errorRouter(); 
    } else {
      await getSplits();
    }
    setIsLoading(false);
  }

  const windowHeight = Dimensions.get('window').height;
  const ref = useRef(null);

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

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