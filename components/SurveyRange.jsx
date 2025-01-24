import { StyleSheet, Dimensions, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedLayout } from "./ThemedLayout";
import { ThemedText } from "./ThemedText";
import { useState } from "react";
import Slider from '@react-native-community/slider';
import { useRouter } from "expo-router";
import { useThemeContext } from "@/hooks/ThemeContext";
import SurveyNavBar from "./SurveyNavBar";
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
    <ThemedView>
      <ThemedLayout 
        header={
          <View>
            <ThemedText 
              style={styles.title}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
            >
              {title}
            </ThemedText>
          </View>
        }

        body={
          <View>
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
          }
        footer = {
          <SurveyNavBar 
            handleSubmit={handleSubmit}
            handleBack={() => router.back()}
          />
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
}); 