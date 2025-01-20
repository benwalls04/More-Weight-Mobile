import { FlatList, StyleSheet, Dimensions, View } from "react-native";
import { ThemedPressable } from "./ThemedPressable";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useState } from "react";
import { useRouter } from "expo-router";
const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 3;

export default function SurveyGrid({
  style,
  type = "one",
  title,
  data,
  numColumns,
  handleNext,
  nextRoute,
  ...otherProps
}) {
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const handlePress = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter(item => item !== index));
    } else if (type === 'many') {
      setSelected([...selected, index]);
    } else if (type === 'one') {
      setSelected([index]);
      handleNext(selected, nextRoute)
    }
  }
  
  const BTN_WIDTH = (windowWidth - (numColumns + 1) * BUTTON_MARGIN * 2) / numColumns;
  const rem = data.length % numColumns;
  const maxIndx = data.length - rem + 1;
  const OF_BTN_WIDTH = (windowWidth - (rem + 1) * BUTTON_MARGIN * 2) / rem;

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
        <FlatList 
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          columnWrapperStyle={numColumns > 1 ? styles.row : null}
          renderItem={({item}) => (
            <ThemedPressable 
              onPress={() => handlePress(item.id)}
              type={selected.includes(item.id) ? "selected" : "default"}
              style={[styles.button, {width: item.id < maxIndx ? BTN_WIDTH : BTN_WIDTH}]}
            >
              <ThemedText style={styles.buttonText}>{item.title}</ThemedText>
            </ThemedPressable>
          )}
        />
      </View>
      <View style={styles.submitContainer}>
        <View style={{justifyContent: 'center', width: '100%', flexDirection: 'row'}}>
          <ThemedPressable 
            onPress={type === 'many' ? () => router.back() : () => {}}
            style={type === 'one' ? {display: 'none'} : styles.submitButton}
            type="accent"
        >
          <ThemedText>Back</ThemedText>
        </ThemedPressable>
        <ThemedPressable 
          onPress={type === 'many' ? () => handleNext(selected, nextRoute) : () => {}}
          style={type === 'one' ? {display: 'none'} : styles.submitButton}
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
  container: {
    flex: 1,
    width: '100%',
  },
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
    justifyContent: 'center',
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
    minHeight: 60,
    marginLeft: BUTTON_MARGIN,
    marginRight: BUTTON_MARGIN,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
