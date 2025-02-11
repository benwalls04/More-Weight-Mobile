import { View } from "react-native";

export function ThemedLayout({
  style,
  children,
  header,
  body,
  footer,
  headerFlex = 1,
  bodyFlex = 2,
  footerFlex = 0,
  ...otherProps
}) {
  return (
    <View style={[style, {height: '100%', width: '100%'}]}>
      <View style={{flex: headerFlex, justifyContent: "flex-end"}}>
        {header}
      </View>

      <View style={{flex: bodyFlex, justifyContent: "flex-start", marginVertical: 16}}>
        {body}
      </View>

      <View style={{flex: footerFlex, justifyContent: "flex-end", marginVertical: 16}}>
        {footer}
      </View>
    </View>
  );
}
