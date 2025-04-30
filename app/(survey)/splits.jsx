import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedLayout } from "@/components/ThemedLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { ThemedPressable } from "@/components/ThemedPressable";

import { useSplitsContext } from "@/hooks/SplitsContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useUserContext } from "@/hooks/UserContext";

import { useRouter } from "expo-router";
import { View, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

import { COLORS } from "@/constants/Colors";

const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;
const BTN_WIDTH =  (windowWidth - (3) * BUTTON_MARGIN * 2) / 2;

export default function Split() {

  const { setSplits, setLeaf, leaf, setDecisions, decisions, root } = useSplitsContext();
  const { setSplit, username, addRoutine, splitTitle } = useUserContext();
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const [choiceIndex, setChoiceIndex] = useState(-1);
  const [canPartition, setCanPartition] = useState(true);

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;

  useEffect(() => {
    if (choiceIndex > -1 && leaf[choiceIndex] && leaf[choiceIndex].length >= 2) {
      setCanPartition(true);
    } else {
      setCanPartition(false);
    }
  }, [choiceIndex])

  const partition = async () => {
    if (choiceIndex > -1 && canPartition) {
      setIsLoading(true);
      await axios.post('https://more-weight.com/partition', { splits: leaf[choiceIndex]}).then(response => {
        setLeaf(response.data);
        setDecisions(prev => [...prev, leaf]);
        setChoiceIndex(-1);
        if (leaf[0].length < 2 && leaf[1].length < 2) {
          setCanPartition(false);
        }
      }).catch(error => {
        Alert.alert("Error", error.response?.data?.message || "Something went wrong. Please try again.");
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      Alert.alert("Error", "Please select a routine");
    }
  }

  const handleBack = () => {
    if (decisions.length === 0){
      setSplits(root);
      router.back(); 
    } else {
      let decisionsCpy = [...decisions];
      setLeaf(decisionsCpy.pop());
      setDecisions(decisionsCpy);
      setChoiceIndex(-1);
    }
  }

  const handleNext = () => {
    if (choiceIndex > -1) {
      setDecisions(prev => [...prev, leaf]);
      setSplit(leaf[choiceIndex][0]);

      if (username === "") {
        router.push("/(auth)/SignUpPage");
      } else {
        addRoutine(splitTitle, leaf[choiceIndex][0]);
      }
    } else {
      Alert.alert("Error");
    }
  }

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  } 

  return (
    <ThemedView label="Find Your Favorite Split">
      <ThemedLayout
        header={
          <ThemedText 
            type="title"
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            style={{paddingBottom: 10, width: '90%'}}
          >
            Which routine do you prefer?
          </ThemedText>
        }

        body={
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList 
              data={leaf}
              keyExtractor={(item, outerIndex) => outerIndex.toString()}
              numColumns={2}
              contentContainerStyle={styles.list}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
              renderItem={({item, index: outerIndex}) => (
                <View>
                  <ThemedPressable 
                    onPress={() => setChoiceIndex(outerIndex)}
                    type={"default"}
                    style={[styles.button, {width: BTN_WIDTH, borderColor: colors.accentLight}]}
                    label={"Select " + prettyPrint(item)}
                    hint={"Choose this option if you prefer it over the other option. You can either see more splits like this, or continue with this split."}
                  >
                  <FlatList
                    data={item[0]}
                    keyExtractor={(item, innerIndex) => innerIndex.toString()}
                    contentContainerStyle={styles.subtextContainer}
                    renderItem={({item, index: innerIndex}) => (
                      <View style={{
                        width: BTN_WIDTH, 
                        borderTopWidth: innerIndex > 0 ? 1 : 0, 
                        borderTopColor: colors.accentLight,
                        backgroundColor: listItemColor(item, leaf[(outerIndex + 1) % 2][0], innerIndex, colors),
                      }}>
                        <ThemedText style={styles.subtext}>{prettyPrint(item)}</ThemedText>
                      </View>
                    )}
                  />
                  </ThemedPressable>
                  <View style={styles.checkContainer}>
                    <View style={[styles.check, {borderColor: colors.accentLight}, choiceIndex === outerIndex && {backgroundColor: colors.tint}]}
                    />
                  </View>
                </View>
              )}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: windowWidth}}>
              <ThemedPressable onPress={() => handleBack()} style={[styles.submitButton, {backgroundColor: colors.accentLight, width: '25%'}]} label="Go Back"> 
                <ThemedText>Back</ThemedText>
              </ThemedPressable>

              <ThemedPressable onPress={() => partition()} style={[styles.submitButton, {backgroundColor: canPartition && choiceIndex > -1 ? colors.tint : colors.accentLight, width: '50%'}]} label="Show Me More Splits Like This"> 
                <ThemedText>
                  {choiceIndex < 0 
                    ? 'Show Me More' 
                    : canPartition 
                      ? `Show Me ${leaf[choiceIndex].length} More` 
                      : 'Show Me More'}
                </ThemedText>
              </ThemedPressable>

              <ThemedPressable onPress={() => handleNext()} style={[styles.submitButton, {backgroundColor: colors.accentLight, width: '25%'}]} label="Select" hint="Continue with this split as your final choice">
                <ThemedText>Select</ThemedText>
              </ThemedPressable>
            </View>
          </View>
        }
      />
    </ThemedView>
    );
  }

  function prettyPrint(item) {
    if (item.includes("biceps") && item.includes("triceps")) {
      return item.split(' ').filter(word => word !== "biceps" && word !== "triceps" && word !== "shoulders").concat("arms").join(' ');
    } 

    return item;
  }

const listItemColor = (item, adjItems, index, colors) => {
  if (!adjItems.includes(item)) {
    return colors.accentLight
  } else if (adjItems[index] != item) {
    return colors.accent
  } else {
    return 'transparent'
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
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
    height: "auto",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0
  },
  submitButton: {
      borderWidth: 0,
      height: 40,
      width: '33%',
      margin: BUTTON_MARGIN,
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
    padding: 0,
  },
  subtext: {
    fontSize: 12,
    lineHeight: 35,
    marginBottom: 2,
    textAlign: 'center',
  },
  checkContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 15
  },
  check: {
    width: 24, 
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
  }
}); 