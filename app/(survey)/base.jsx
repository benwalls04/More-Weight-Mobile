import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPressable } from "@/components/ThemedPressable";
import PopupPressable from "@/components/PopupPressable";
import { ThemedLayout } from "@/components/ThemedLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { useSplitsContext } from "@/hooks/SplitsContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useRouter } from "expo-router";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { useState } from "react";
import { SPLIT_TITLES, SPLIT_SAMPLES } from "@/constants/Survey";
import { COLORS } from "@/constants/Colors";
import axios from "axios";

const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;
const BTN_WIDTH =  (windowWidth - (3) * BUTTON_MARGIN * 2) / 2;

export default function Base() {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);
  const [isLoading, setIsLoading] = useState(false);

  const { setBase, setSplits, splits, setLeaf } = useSplitsContext();
  const router = useRouter();
  const [choiceIndex, setChoiceIndex] = useState(-1);

  // FIXME: for 7 days, the component mounts before the data is loaded, so it shows nothing
  // FIXME: get all the logic for handling tree out 
  
  const handleNext = async () => {
    if (choiceIndex > -1){
        const newSplits = {...splits};
        let [key, value] = Object.entries(splits.selection[choiceIndex])[0];
        newSplits.selection = value;
        setSplits(newSplits);
      if (Array.isArray(newSplits.selection[0])){
          setIsLoading(true);
          const response = await axios.post('https://more-weight.com/partition', { splits: newSplits.selection });
          newSplits.selection = response.data;
          setLeaf(response.data)
          setSplits(newSplits);
          setBase(SPLIT_TITLES[key])
          setIsLoading(false);
          router.push("/split");
        } 
    }
  };

  const handlePress = (index) => {
    setChoiceIndex(index)
  }

  const popupBody = () => {
    return (
      <FlatList 
        data={splits.selection}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        contentContainerStyle={{ flexGrow: 1, width: '100%'}}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <View>
            <View style={[styles.popupEntry, index === 0 ? {borderTopWidth: 0} : {}]}>
              <View style={{flex: 4, justifyContent: 'center', paddingLeft: 10}}>
                <ThemedText type="subheader">{SPLIT_TITLES[Object.entries(item)[0][0]]}</ThemedText>
                <ThemedText style={styles.subText}>Pros:</ThemedText>
                <ThemedText style={styles.subText}>Cons:</ThemedText>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ThemedPressable 
                  style={styles.checkButton} 
                  onPress={() => handlePress(index)}
                  type={choiceIndex === index ? "selected" : "default"} />
              </View>
            </View>
            <ThemedText style={styles.sampleText}>EX: {SPLIT_SAMPLES[Object.entries(item)[0][0]]}</ThemedText>
          </View>
        )}
      />
    )
  }

  
  if (isLoading) {
    return (
      <LoadingScreen />
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
          Which split type do you prefer?
        </ThemedText>
        }

      body={
        <View style={{flex: 1, alignItems: 'center'}}>
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
              </ThemedPressable>
            )}        
          />
        </View>
      }

      footer={
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: windowWidth, marginTop: 20}}>
            <ThemedPressable onPress={() => router.back()} style={[styles.navButton, {alignItems: 'flex-start', paddingLeft: 0, flex: 1}]}> 
              <ThemedText style={{fontSize: 18}}>&lt; go back</ThemedText>
            </ThemedPressable>

            <PopupPressable popupBody={popupBody} style={[styles.navButton, {alignItems: 'center', paddingHorizontal: 23, flex: 1}]}>
              <ThemedText style={{fontSize: 18}}>more info</ThemedText>
            </PopupPressable>

            <ThemedPressable onPress={() => handleNext()} style={[styles.navButton, {alignItems: 'flex-end', paddingRight: 0, flex: 1}]}>
              <ThemedText style={{fontSize: 18}}>continue &gt;</ThemedText>
            </ThemedPressable>
        </View>
      }
      />
    </ThemedView>
    );
}

function createStyles(colors) {
  return StyleSheet.create({
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
      justifyContent: 'flex-start',
      marginBottom: 2 * BUTTON_MARGIN,
    },
    button: {
      minHeight: 150,
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
      padding: 10,
    },
    buttonText: {
      textAlign: 'center',
      lineHeight: 20,
    },
    navButton: {
      borderWidth: 0,
      height: 40,
      backgroundColor: "none",
    }, 
    popupEntry: {
      padding: 10,
      width: '100%',
      minHeight: 100, 
      flexGrow: 1,
      borderColor: colors.accentLight,
      borderWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    subText: {
      paddingLeft: 2,
      lineHeight: 25,
    },
    sampleText: {
      textAlign: 'center',
      fontSize: 14,
      paddingBottom: 2
    },
    checkButton: {
      width: 24,
      height: 24,
      borderColor: "gray",
    }
  }); 
}