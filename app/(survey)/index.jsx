import { createStackNavigator } from "@react-navigation/stack"; 
import { SURVEY_DATA } from "@/constants/Survey";
import SelectOne from "@/components/SelectOne";

const Stack = createStackNavigator();

const SurveyRoot = () => {
  return (
    <Stack.Navigator
      initialRouteName="Experience"
      screenOptions={{
        headerShown: true
      }}>
      <Stack.Screen 
        name="Experience" 
        component={<SelectOne title={SURVEY_DATA[0].title} data={SURVEY_DATA[0].options}/>} 
      />
    </Stack.Navigator>
  )
}

export default SurveyRoot;