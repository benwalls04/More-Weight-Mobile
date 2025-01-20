import { StyleSheet, Dimensions, View } from "react-native";
import { ThemedPressable } from "./ThemedPressable";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useState } from "react";
import Slider from '@react-native-community/slider';
import { useRouter } from "expo-router";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";

const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;

export default function SurveyRange({
  style,
  title,
  data,
  handleNext,
  nextRoute,
  ...otherProps
}) {
  const [value, setValue] = useState(0.5);
  const router = useRouter();
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? COLORS.dark : COLORS.light;

  const handleSubmit = () => {
    handleNext(value, nextRoute);
  };

  return (
    <ThemedView style={{height: '95%'}}>
      <View style={styles.titleContainer}>
        <ThemedText 
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {title}
        </ThemedText>
      </View>

      <View style={styles.listContainer}>
        
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={0.5}
          onValueChange={setValue}
          minimumTrackTintColor={colors.borderColor}
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor={colors.borderColor}
          tapToSeek={true}
        />

        <View style={styles.labelContainer}>
          <ThemedText style={styles.rangeLabel}>{data[0]}</ThemedText>
          <ThemedText style={styles.rangeLabel}>{data[1]}</ThemedText>
        </View>

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
            onPress={handleSubmit}
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
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: windowWidth,
    alignSelf: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  rangeLabel: {
    fontSize: 16,
    textAlign: 'center',
  },
  slider: {
    paddingTop: 55,
    width: '100%',
    height: 40,
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