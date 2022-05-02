import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stacks/MainStack'
import { StatusBar } from 'expo-status-bar';
import UserContextProvider from './contexts/UserContext';


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
