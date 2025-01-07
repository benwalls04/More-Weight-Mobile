import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; 

import { WelcomePage } from "@/app/(auth)/WelcomePage";
import { LoginPage } from "@/app/(auth)/LogInPage";

const Stack = createStackNavigator();

const AuthRoot = () => {
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomePage}/>
      <Stack.Screen name="Log In" component={LoginPage}/>
    </Stack.Navigator>
  </NavigationContainer>
}

export default AuthRoot;