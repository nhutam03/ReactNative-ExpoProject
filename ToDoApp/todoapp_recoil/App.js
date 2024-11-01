import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/pages/Start';
import Home from './components/pages/Home';
import AddJob from './components/pages/AddJob';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}
