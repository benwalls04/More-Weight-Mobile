import { FlatList, StyleSheet } from "react-native";
import { ThemedPressable } from "./ThemedPressable";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export function SelectOneGrid({
  style,
  type = "default",
  title,
  data,
  ...otherProps
}) {


  const handlePress = (index) => {
    setSelected(index);
  }

  const [selected, setSelected] = useState(null);
  
  return (
    <ThemedView>
      <ThemedText>
        {title}
      </ThemedText>
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={[styles[type] || styles.default, style]}
        renderItem={(item) => {
          return (
            <ThemedPressable 
              onPress={() => handlePress(item.id)}
              type={selected === item.id ? "selected" : "default"}
            >
              <ThemedText>{item.name}</ThemedText>
            </ThemedPressable>
          )
        }}
      />
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  default: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  other: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  }
});
