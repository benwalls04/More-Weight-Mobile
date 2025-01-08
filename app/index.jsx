import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "@/hooks/AuthContext";
import { UserProvider } from "@/hooks/UserContext";
import App from './App';

const Root = () => (
  <NavigationContainer>
    <UserProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserProvider>
  </NavigationContainer>
);

AppRegistry.registerComponent("More Weight", () => Root);