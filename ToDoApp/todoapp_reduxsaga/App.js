import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/pages/Start';
import Home from './components/pages/Home';
import AddJob from './components/pages/AddJob';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddJob" component={AddJob} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
