import { View, StyleSheet } from "react-native";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText"; 
import { useRouter } from "expo-router";

const BUTTON_MARGIN = 3;

export default function SurveyNavBar({ handleNext, handleBack, handleMiddle, midText, midType="selected" }) {
  const router = useRouter();
  const hasMiddleButton = handleMiddle && midText;

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', width: '100%', flexDirection: 'row'}}>
        <ThemedPressable 
          onPress={handleBack ? handleBack : () => router.back()}
          style={[
            styles.button,
            { width: '15%'}
          ]}
          type="transparent"
        >
          <ThemedText>&lt;</ThemedText>
        </ThemedPressable>

        <ThemedPressable 
          onPress={handleMiddle}
          style={[styles.button, { width: '70%', visibility: hasMiddleButton ? 'visible' : 'hidden' }]}
          type={midType}
        >
          <ThemedText>{midText}</ThemedText>
        </ThemedPressable>

        <ThemedPressable 
          onPress={handleNext}
          style={[
            styles.button,
            { width: "15%" }
          ]}
          type={"transparent"}
        >
          <ThemedText>&gt;</ThemedText>
        </ThemedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    borderWidth: 0,
    height: 30,
    margin: BUTTON_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
