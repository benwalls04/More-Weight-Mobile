import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSplitsContext } from "@/hooks/SplitsContext";
import { useRouter } from "expo-router";
import { View, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import { ThemedPressable } from "@/components/ThemedPressable";
import { useState } from "react";
import axios from "axios";


const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;
const BTN_WIDTH =  (windowWidth - (3) * BUTTON_MARGIN * 2) / 2;

export default function Split() {

  const { setSplits, setLeaf, leaf, setDecisions, decisions } = useSplitsContext();
  const router = useRouter();
  const [choiceIndex, setChoiceIndex] = useState(-1);

  // FIXME: this is a mess. Use a tree stucture and a class
  // FIXME: add a counter under each choice (num of splits like this one)
  // FIXME: standardized UI (vertically) 
  // FIXME: better keys for colors 

  const partition = async () => {
    if (choiceIndex > -1 && leaf[0].length > 2 && leaf[1].length > 2) {
      const response = await axios.post('https://more-weight.com/partition', { splits: leaf[choiceIndex]});
      setLeaf(response.data);
      setDecisions(prev => [...prev, leaf]);
      setChoiceIndex(-1);
    } else {
      Alert.alert("Error");
    }
  }

  const handleBack = () => {
    if (decisions.length === 0){
      setSplits(root);
      router.back(); 
    } else {
      setLeaf(decisions);
      let decisionsCpy = [...decisions];
      setChoices(decisionsCpy.pop());
      setDecisions(decisionsCpy);
      setChoiceIndex(-1);
    }
  }

  const handleNext = () => {
    if (choiceIndex > -1) {
      setDecisions(prev => [...prev, leaf]);
      setLeaf(leaf[choiceIndex][0]);
      router.push('/style');
    } else {
      Alert.alert("Error");
    }
  }

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
          Which routine do you prefer?
        </ThemedText>
      </View>

      <View style={styles.bodyContainer}>
        <FlatList 
          data={leaf}
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
                <ThemedText style={styles.buttonText}>TITLE</ThemedText>
              </View>
              <View style={styles.subtextContainer}>
                <FlatList
                  data={leaf[index][0]}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View>
                      <ThemedText style={styles.subtext}>day{index + 1}: {item}</ThemedText>
                    </View>
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
            onPress={() => handleBack()}
            style={styles.submitButton}
            type="accent"
        >
          <ThemedText>Back</ThemedText>
        </ThemedPressable>
        <ThemedPressable 
            onPress={() => partition()}
            style={[styles.submitButton, {width: '50%'}]}
            type={choiceIndex > -1 && leaf[0].length > 2 && leaf[1].length > 2 ? "selected" : "accent"}
        >
          <ThemedText>Show Me More</ThemedText>
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
    justifyContent: 'center',
    marginBottom: 2 * BUTTON_MARGIN,
  },
  button: {
    minHeight: 300,
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
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  subtext: {
    paddingLeft: 10,
    fontSize: 12,
    lineHeight: 26,
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
    width: '25%',
    margin: BUTTON_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  }
}); 
