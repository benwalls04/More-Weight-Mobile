import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ThemedLayout } from "./ThemedLayout";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import SurveyNavBar from "./SurveyNavBar";
import { useRouter } from "expo-router";

export default function SurveyNumber({
  style,
  title,
  textBefore,
  textAfter,
  min = 0,
  max = 100,
  initial = 0,
  step = 1,
  handleNext,
  nextRoute,
  ...otherProps
}) {
  const [value, setValue] = useState(initial);
  const router = useRouter();

  const increment = () => {
    if (value + step <= max) {
      setValue(value + step);
    }
  };

  const decrement = () => {
    if (value - step >= min) {
      setValue(value - step);
    }
  };

  return (
    <ThemedView>
      <ThemedLayout
        header={
        <ThemedText 
          type="title"
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {title}
        </ThemedText>
        }

      body={
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <ThemedText style={styles.text}>{textBefore}</ThemedText>
          <View style={styles.inputContainer}>
            <View style={styles.arrowContainer}>
              <TouchableOpacity 
                onPress={increment}
                style={styles.arrow}
              >
                <Ionicons name="chevron-up" size={16} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={decrement}
                style={styles.arrow}
              >
                <Ionicons name="chevron-down" size={16} color="gray" />
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.number}>{value < 10 ? value : value + "+"}</ThemedText>
          </View>
          <ThemedText style={styles.text}>{textAfter}</ThemedText>
        </View>
      </View>
      }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "auto",
  },
  text:{
    fontSize: 30,
    lineHeight: 50,
  },
  number: {
    fontSize: 30,
    textAlign: "center",
    minWidth: 40,
  },
  arrowContainer: {
    justifyContent: 'center',
    height: 40,
  },
});
