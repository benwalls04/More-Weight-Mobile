import { View, StyleSheet } from "react-native";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText"; 
import { useRouter } from "expo-router";

const BUTTON_MARGIN = 3;

export default function SurveyNavBar({ handleSubmit, handleBack, handleMiddle, midText, midType="selected" }) {
  const router = useRouter();
  const hasMiddleButton = handleMiddle && midText;

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', width: '100%', flexDirection: 'row'}}>
        <ThemedPressable 
          onPress={handleBack ? handleBack : () => router.back()}
          style={[
            styles.button,
            { width: hasMiddleButton ? '25%' : '50%' }
          ]}
          type="accent"
        >
          <ThemedText>Back</ThemedText>
        </ThemedPressable>

        {hasMiddleButton && (
          <ThemedPressable 
            onPress={handleMiddle}
            style={[styles.button, { width: '50%' }]}
            type={midType}
          >
            <ThemedText>{midText}</ThemedText>
          </ThemedPressable>
        )}

        <ThemedPressable 
          onPress={handleSubmit}
          style={[
            styles.button,
            { width: hasMiddleButton ? '25%' : '50%' }
          ]}
          type={"selected"}
        >
          <ThemedText>Next</ThemedText>
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
