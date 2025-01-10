import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "@/hooks/AuthContext";
import { UserProvider } from "@/hooks/UserContext";
import { ThemeProvider } from "@/hooks/ThemeContext"; 
import App from './App';

const Root = () => (
  <NavigationContainer>
    <ThemeProvider>
      <UserProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  </NavigationContainer>
);

AppRegistry.registerComponent("More Weight", () => Root);