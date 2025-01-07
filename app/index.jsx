import { AppRegistry } from 'react-native';
import App from "@/app/App" 
import { AuthProvider } from "@/hooks/AuthContext";
import { UserProvider } from "@/hooks/UserContext";

const Root = () => (
  <UserProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </UserProvider>
);

AppRegistry.registerComponent("More Weight", () => Root);