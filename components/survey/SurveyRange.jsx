import { StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedLayout } from "../ThemedLayout";
import { ThemedText } from "../ThemedText";
import Slider from '@react-native-community/slider';
import { useThemeContext } from "@/hooks/ThemeContext";
import { useSurveyContext } from "@/hooks/SurveyContext";
import { COLORS } from "@/constants/Colors";

export default function SurveyRange({
  style,
  title,
  data,
  surveyIndex,
  headerLines = 3,
  ...otherProps
}) {
  const { theme } = useThemeContext();
  const { surveyData, updateSurveyData } = useSurveyContext();
  const value = surveyData[surveyIndex][0]
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;

  return (
    <ThemedView label={title}>
      <ThemedLayout 
        header={
          <ThemedText 
            type="title"
            numberOfLines={headerLines}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            style={{textAlign: 'center'}}
          >
            {title}
          </ThemedText>
        }

        body={
          <View>
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
  }
}); 