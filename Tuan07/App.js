
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import InforScreen from './InforScreen'
import JobScreen from './InforScreen'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ 
        headerShown: false, 
                }}
        >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="InforScreen" component={InforScreen} />
      <Stack.Screen name="JobScreen" component={JobScreen} />
    </Stack.Navigator>
    </NavigationContainer>
)}
export default App;

