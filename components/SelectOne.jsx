import { FlatList, StyleSheet, Dimensions, View } from "react-native";
import { ThemedPressable } from "./ThemedPressable";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useState } from "react";

const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 2;
const NUM_COLUMNS = 2;
const BUTTON_WIDTH = (windowWidth - (NUM_COLUMNS + 1) * BUTTON_MARGIN * 2) / NUM_COLUMNS;

export default function SelectOne({
  style,
  type = "default",
  title,
  data,
  nextRoute,
  ...otherProps
}) {
  const [selected, setSelected] = useState(null);

  const handlePress = (index) => {
    setSelected(index);
  }
  
  return (
    <ThemedView>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.title}>
          {title}
        </ThemedText>
      </View>
      <View style={styles.listContainer}>
        <FlatList 
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={NUM_COLUMNS}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          renderItem={({item}) => (
            <ThemedPressable 
              onPress={() => handlePress(item.id)}
              type={selected === item.id ? "selected" : "default"}
              style={styles.button}
            >
              <ThemedText style={styles.buttonText}>{item.title}</ThemedText>
            </ThemedPressable>
          )}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: BUTTON_MARGIN,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    marginVertical: 16,
    textAlign: 'center',
  },
  listContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  list: {
    flexGrow: 1,
    width: '100%',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: BUTTON_MARGIN,
  },
  button: {
    width: BUTTON_WIDTH,
    minHeight: 60,
    margin: BUTTON_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    padding: 8,
  }
});
