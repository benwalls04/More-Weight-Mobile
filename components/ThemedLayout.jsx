import { View } from "react-native";

export function ThemedLayout({
  style,
  children,
  header,
  body,
  footer,
  ...otherProps
}) {
  return (
    <View style={[style, {height: '100%', width: '100%'}]}>
      <View style={{flex: 1, justifyContent: "flex-end"}}>
        {header}
      </View>

      <View style={{flex: 2, justifyContent: "flex-start", marginVertical: 16}}>
        {body}
      </View>
    </View>
  );
}
