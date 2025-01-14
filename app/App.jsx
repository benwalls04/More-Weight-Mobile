import { useState, useEffect } from "react";
import { Text } from "react-native";
import AuthRoot from "@/app/(auth)/index";
import TabsRoot from "@/app/(tabs)/index";
import SurveyRoot from "@/app/(survey)/index";
import { useAuthContext } from "@/hooks/AuthContext";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const { isAuth, isNew } = useAuthContext();

  useEffect(() => {
    // FIXME: add icon
    setTimeout(() => {
      setIsLoaded(true);  
    }, 1000); 
  }, []);

  if (isAuth) {
    return <TabsRoot />;
  }

  if (isNew) {
    return <SurveyRoot />;
  }

  return <Text>Loading...</Text>;
};

export default App;