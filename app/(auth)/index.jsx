import { createStackNavigator } from "@react-navigation/stack"; 
import WelcomePage from "./WelcomePage";
import LoginPage from "./LogInPage";

const Stack = createStackNavigator();

const AuthRoot = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomePage} headerShown={false}/>
      <Stack.Screen name="Login" component={LoginPage} headerShown={false}/>
    </Stack.Navigator>
  );
};

export default AuthRoot;