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
import { useUserContext } from "@/hooks/UserContext";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";

export default function Survey() {
  const { username } = useUserContext();
  const { getSplits, checkErrors } = useSurveyContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const entry = (item, index, ref) => {
    if (index >= SURVEY_DATA.findIndex(item => item.key === "horizontal-press") && index <= SURVEY_DATA.findIndex(item => item.key === "extension")) {
      return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={index} listRef={ref} errorMsg={errors[index]} headerLines={item.headerLines}/>;
    }

    switch (item.type) {
      case "one":
        return <SurveyGrid type="one" data={item.options} title={item.title} numColumns={item.cols} surveyIndex={index} headerLines={item.headerLines} listRef={ref} errorMsg={errors[index]}/>;
      case "many":
        return <SurveyGrid type="many" data={item.options} title={item.title} numColumns={item.cols} headerLines={item.headerLines} surveyIndex={index} errorMsg={errors[index]} listRef={ref}/>;
      case "range":
        return <SurveyRange data={item.options} title={item.title} surveyIndex={index} headerLines={item.headerLines} listRef={ref}/>;
      case "submit":
        return <Proceed/>
    } 
  }

  const Proceed = () => {
    return (
      <ThemedView label="Proceed to Selecting Your Split">
        <ThemedPressable 
            style={{
              width: "100%",
              alignSelf: "center",
              height: "50%", 
              borderWidth: 0,
            }}
            onPress={() => handleNext()}
            label="Click Here To Proceed"
            hint="Click here to proceed to selecting your split"
          >
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

  const handleNext = async () => {
    const errors = checkErrors();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setErrorMode(true);
      errorRouter(); 
    } else {
      setIsLoading(true);
      try {
        await getSplits();
      } catch (error) {
        console.error("Error getting splits:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleBack = () => {
    router.back();
  }

  const windowHeight = Dimensions.get('window').height;
  const ref = useRef(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
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
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
          }
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        renderItem={({ item, index }) => {
          return (
            <View style={{height: windowHeight}}>
              {entry(item, index, ref)}
            </View>
          )
        }}
      />
      {!username && (
        <ThemedPressable
          label="Go Back to Welcome Page"
          style={{
            position: 'absolute',
            left: 10,
            top: 20,
            padding: 15,
            borderRadius: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: 10,
          borderWidth: 0,
          backgroundColor: "transparent"
        }}
        onPress={handleBack}
      >
        <ThemedText style={{ fontSize: 16 }}>&lt; welcome page</ThemedText>
      </ThemedPressable>
      )}
    </View>
  );
}