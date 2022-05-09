import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stacks/MainStack';
import MainTab from './stacks/MainTab';
import { StatusBar } from 'expo-status-bar';
import UserContextProvider from './contexts/UserContext';
import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';


export default function App() {
  return (
    <UserContextProvider>
    <NavigationContainer>
      <StatusBar style="light" />
      <MainStack/>
    </NavigationContainer>
    </UserContextProvider>
  );
}

registerRootComponent(App);