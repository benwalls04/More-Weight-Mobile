import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSurveyContext } from "@/hooks/SurveyContext";
import { useRouter } from "expo-router";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { ThemedPressable } from "@/components/ThemedPressable";
import { useState } from "react";
import { SPLIT_SAMPLES, SPLIT_TITLES } from "@/constants/Survey";
import axios from "axios";


const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;
const BTN_WIDTH =  (windowWidth - (3) * BUTTON_MARGIN * 2) / 2;

export default function Base() {

  const { setBase, setSplits, splits, setSelection, selection } = useSurveyContext();
  const router = useRouter();
  const [choiceIndex, setChoiceIndex] = useState(-1);

  // FIXME: replace includes list with info pop up
  // FIXME: function that changes long description to short: IE shoul, biceps, triceps -> arms 

  const handleNext = async () => {
    if (choiceIndex > -1){
        const newSplits = {...splits};
        let [key, value] = Object.entries(splits.selection[choiceIndex])[0];
        newSplits.selection = value;
        setSplits(newSplits);
      if (Array.isArray(newSplits.selection[0])){
          const response = await axios.post('https://more-weight.com/partition', { splits: newSplits.selection });
          newSplits.selection = response.data;
          setSelection(response.data)
          setSplits(newSplits);
          setBase(SPLIT_TITLES[key])
          router.push("/split");
        } 
    }
  };

  const handlePress = (index) => {
    setChoiceIndex(index)
  }
  
  return (
    <ThemedView style={{height: '95%'}}>
      <View style={styles.titleContainer}>
        <ThemedText 
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          Which split type do you prefer?
        </ThemedText>
      </View>

      <View style={styles.bodyContainer}>
        <FlatList 
          data={splits.selection}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          renderItem={({item, index}) => (
            <ThemedPressable 
              onPress={() => handlePress(index)}
              type={choiceIndex === index ? "selected" : "default"}
              style={[styles.button, {width: BTN_WIDTH}]}
            >
              <View style={styles.buttonTextContainer}>
                <ThemedText style={styles.buttonText}>{SPLIT_TITLES[Object.entries(item)[0][0]]}</ThemedText>
              </View>
              <View style={styles.subtextContainer}>
                <ThemedText style={styles.subtext}>Includes:</ThemedText>
                <FlatList
                  data={SPLIT_SAMPLES[Object.entries(item)[0][0]]}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <ThemedText style={styles.subtext}> - {item}</ThemedText>
                  )}
                />
              </View>
            </ThemedPressable>
          )}
        />
      </View>

      <View style={styles.submitContainer}>
        <View style={{justifyContent: 'center', width: '100%', flexDirection: 'row'}}>
          <ThemedPressable 
            onPress={() => router.back()}
            style={styles.submitButton}
            type="accent"
        >
          <ThemedText>Back</ThemedText>
        </ThemedPressable>
        <ThemedPressable 
          onPress={() => handleNext()}
          style={styles.submitButton}
          type="selected"
        >
          <ThemedText>Next</ThemedText>
          </ThemedPressable>
        </View>
      </View>
    </ThemedView>
    );
}

  
const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  title: {
    fontSize: 20,
    marginVertical: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  bodyContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    width: windowWidth,
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
    minHeight: 175,
    marginLeft: BUTTON_MARGIN,
    marginRight: BUTTON_MARGIN,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginBottom: 2,
  },
  subtextContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  subtext: {
    paddingLeft: 10,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 2,
    textAlign: 'left',
  },
  submitContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
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
