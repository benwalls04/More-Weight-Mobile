import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedLayout } from "@/components/ThemedLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { ThemedPressable } from "@/components/ThemedPressable";
import PopupPressable from "@/components/PopupPressable";

import { useSplitsContext } from "@/hooks/SplitsContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useUserContext } from "@/hooks/UserContext";

import { useRouter } from "expo-router";
import { View, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import { useState } from "react";
import axios from "axios";

import { COLORS } from "@/constants/Colors";


const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;
const BTN_WIDTH =  (windowWidth - (3) * BUTTON_MARGIN * 2) / 2;

export default function Split() {

  const { setSplits, setLeaf, leaf, setDecisions, decisions, root } = useSplitsContext();
  const { setSplit } = useUserContext();
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const [choiceIndex, setChoiceIndex] = useState(-1);
  const [canPartition, setCanPartition] = useState(true);

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;

  // FIXME: this is a mess. Use a tree stucture and a class
  // FIXME: add some sort of key and also popup analytics

  const partition = async () => {
    if (choiceIndex > -1 && canPartition) {
      setIsLoading(true);
      const response = await axios.post('https://more-weight.com/partition', { splits: leaf[choiceIndex]});
      setLeaf(response.data);
      setDecisions(prev => [...prev, leaf]);
      setChoiceIndex(-1);
      setIsLoading(false);
      if (leaf[0].length < 3 && leaf[1].length < 3) {
        setCanPartition(false);
      }
    } else {
      Alert.alert("Error");
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
      router.push('/SignUpPage');
    } else {
      Alert.alert("Error");
    }
  }

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  } 

  const popupBody = () => {
    return (
      <View style={{height: 100, justifyContent: 'center', alignItems: 'center', width: "100%"}}>
        <ThemedText style={{fontSize: 18, textAlign: 'center'}}> Analytics Soon</ThemedText>
      </View>
    )
  }

  return (
    <ThemedView>
      <ThemedLayout
        bodyFlex={2.5}

        header={
          <ThemedText 
            type="title"
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
          >
            Which routine do you prefer?
          </ThemedText>
        }

        body={
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                    <ThemedPressable style={[styles.check, {borderColor: colors.accentLight}]}
                      type={choiceIndex === outerIndex ? "selected" : "default"}
                      onPress={() => setChoiceIndex(outerIndex)}
                    />
                  </View>
                </View>
              )}
            />
            <View style={{flexDirection: 'row', justifyContent: 'center', width: windowWidth, marginTop: 20}}>
              {canPartition && choiceIndex > -1 && (
                <ThemedPressable onPress={() => partition()} style={{backgroundColor: colors.tint, width: "auto", paddingHorizontal: 20}}> 
                  <ThemedText style={{fontSize: 18, textAlign: 'center'}}>Show {leaf[choiceIndex] ? leaf[choiceIndex].length : 0} more routines like this</ThemedText>
                </ThemedPressable>
              )}
            </View>

          </View>
        }

        footer={
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: windowWidth, marginTop: 20}}>
              <ThemedPressable onPress={() => handleBack()} style={[styles.navButton, {alignItems: 'flex-start', flex: 1}]}> 
                <ThemedText style={{fontSize: 18}}>&lt; go back</ThemedText>
              </ThemedPressable>

              <PopupPressable popupBody={popupBody} style={[styles.navButton, {alignItems: 'center',  flex: 1, paddingHorizontal: 23}]}>
                <ThemedText style={{fontSize: 18}}>more info</ThemedText>
              </PopupPressable>

              <ThemedPressable onPress={() => handleNext()} style={[styles.navButton, {alignItems: 'flex-end', flex: 1}]}>
                <ThemedText style={{fontSize: 18}}>continue &gt;</ThemedText>
              </ThemedPressable>
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
  list: {
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
    borderRadius: 0, 
  },
  navButton: {
    borderWidth: 0,
    height: 40,
    backgroundColor: "none",
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
  },
}); 