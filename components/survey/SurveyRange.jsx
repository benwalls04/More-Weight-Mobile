import { StyleSheet, View, Dimensions } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedLayout } from "../ThemedLayout";
import { ThemedText } from "../ThemedText";
import { ThemedPressable } from "../ThemedPressable";
import Slider from '@react-native-community/slider';
import { useThemeContext } from "@/hooks/ThemeContext";
import { useSurveyContext } from "@/hooks/SurveyContext";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const windowHeight = Dimensions.get('window').height;

export default function SurveyRange({
  style,
  title,
  data,
  surveyIndex,
  headerLines = 3,
  listRef,
  ...otherProps
}) {
  const { theme } = useThemeContext();
  const { surveyData, updateSurveyData } = useSurveyContext();
  const value = surveyData[surveyIndex][0]
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;

  const scrollToNext = () => {
    if (!listRef || !listRef.current) return;
    
    const nextIndex = surveyIndex + 1;
    const offset = nextIndex * windowHeight;
  
    listRef.current.scrollToOffset({ 
      offset, 
      animated: true,
      duration: 3000 
    }); 
  };

  return (
    <ThemedView label={title} style={{width: '90%'}}>
      <ThemedLayout 
        header={
          <ThemedText 
            type="title"
            numberOfLines={headerLines}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            style={{textAlign: 'center', width: '100%'}}
          >
            {title}
          </ThemedText>
        }

        body={
          <View style={{width: '100%'}}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={value ? value : .5}
              onValueChange={(newValue) => updateSurveyData(surveyIndex, newValue)}
              minimumTrackTintColor={colors.tint}
              maximumTrackTintColor={colors.tint}
              thumbTintColor={colors.borderColor}
              tapToSeek={true}
            />

              <View style={styles.labelContainer}>
                <ThemedText style={styles.rangeLabel}>{data[0]}</ThemedText>
                <ThemedText style={styles.rangeLabel}>{data[1]}</ThemedText>
              </View>
          </View>
        }
        footer={
          <View style={styles.arrowContainer}>
            <ThemedPressable
              onPress={scrollToNext}
              style={styles.arrowButton}
              label="Next Question"
            >
              <Ionicons name="chevron-down" size={30} color="#fff" />
            </ThemedPressable>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  rangeLabel: {
    fontSize: 16,
    textAlign: 'center',
  },
  slider: {
    paddingTop: 10,
    width: '100%',
    height: 40,
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  arrowContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  arrowButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'none',
    borderWidth: 0,
  }
}); 