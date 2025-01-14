import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';

const Root = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent("More Weight", () => Root);