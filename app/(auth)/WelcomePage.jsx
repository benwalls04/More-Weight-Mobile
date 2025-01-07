import { useNavigation } from "react"
import { View, Text, Pressable } from "react-native";
import AuthProvider from "@/hooks/AuthContext";

const WelcomePage = () => {

    const navigation = useNavigation();
    const {setIsNew} = useContext(AuthProvider);

    <View>
      <Text> Welcome to More Weight! </Text>
      <View>
        <Pressable onPress={() => navigation.navigate("Log In")}>
          <Text> Returning User </Text>
        </Pressable>
        <Pressable onPress={() => setIsNew(true)}>
          <Text> New User </Text>
        </Pressable>
      </View>
    </View>
}

export default WelcomePage;