import { useState, useEffect, useContext } from "react";
import { Text } from "react-native";
import AuthRoot from "@/app/(auth)/index"
import TabsRoot from "@/app/(tabs)/index"
import SurveyRoot from "@/app/(survey)/index"
import AuthContext from "@/hooks/AuthContext";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isNew, isAuth } = useContext(AuthContext);

  // FIXME: add icon
  const handleLoading = () => {
    setTimeout(() => {
      setIsLoaded(true);  
    }, 1000); 
  };
  useEffect(() => {
    handleLoading();  
  }, []);


  if (!isLoaded) {
    return <Text>Loading</Text>;
  }

  if (isAuth) {
    return(
      <TabsRoot></TabsRoot>
    )
  }

  if (isNew) {
    return (
      <SurveyRoot></SurveyRoot>
    )
  }

  return (
    <AuthRoot></AuthRoot>
  )
}

export default App;