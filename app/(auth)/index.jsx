import { createStackNavigator } from "@react-navigation/stack"; 
import WelcomePage from "./WelcomePage";
import LoginPage from "./login";

const Stack = createStackNavigator();

const AuthRoot = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>
  );
};

export default AuthRoot;