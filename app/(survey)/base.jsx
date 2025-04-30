import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedLayout } from "@/components/ThemedLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { useSplitsContext } from "@/hooks/SplitsContext";
import { useUserContext } from "@/hooks/UserContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useRouter } from "expo-router";
import { View, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
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
  const [loading, setLoading] = useState(false);
  const { setBase, setSplits, splits, setLeaf } = useSplitsContext();
  const { setSplitTitle, allRoutines} = useUserContext();
  const router = useRouter();
  const [choiceIndex, setChoiceIndex] = useState(-1);
  
  const handleNext = async () => {
    if (choiceIndex > -1){
        const newSplits = {...splits};
        let [key, value] = Object.entries(splits.selection[choiceIndex])[0];
        newSplits.selection = value;
        setSplits(newSplits);
      if (Array.isArray(newSplits.selection[0])){
        setLoading(true);
        await axios.post('https://more-weight.com/partition', { splits: newSplits.selection }).then(response => {
          newSplits.selection = response.data;
          setLeaf(response.data)
          setSplits(newSplits);
          setBase(SPLIT_TITLES[key])

          if (allRoutines && allRoutines.length > 0){
            const count = allRoutines.filter(routine => routine.title.includes(SPLIT_TITLES[key])).length;
            setSplitTitle(SPLIT_TITLES[key] + " " + (count + 1));
          } else {
            setSplitTitle(SPLIT_TITLES[key] + " 1");
          }

          setLoading(false);
          router.push("/splits");
        })
        .catch(error => {
          Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
        });
      }
    }
  };

  const handlePress = (index) => {
    setChoiceIndex(index)
  }

  if (loading) {
    return <LoadingScreen />
  }
  
  return (
    <ThemedView label="Select Your Base Split Type">
      <ThemedLayout
        header={
          <ThemedText 
            type="title"
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            style={{paddingBottom: 10, width: '90%'}}
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
                label={SPLIT_TITLES[Object.entries(item)[0][0]]}
                hint={"Select this split to use it as your base split"}
              >
                <View style={styles.buttonTextContainer}>
                  <ThemedText style={styles.buttonText}>{SPLIT_TITLES[Object.entries(item)[0][0]]}</ThemedText>
                </View>
              </ThemedPressable>
            )}        
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: windowWidth}}>
            <ThemedPressable onPress={() => router.back()} style={styles.submitButton} label="Go Back"> 
              <ThemedText>Back</ThemedText>
            </ThemedPressable>

            <ThemedPressable onPress={() => handleNext()} style={styles.submitButton} label="Select this Split">
              <ThemedText>Select</ThemedText>
            </ThemedPressable>
          </View>
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
    submitButton: {
      borderWidth: 0,
      height: 40,
      width: '50%',
      margin: BUTTON_MARGIN,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.accentLight,
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