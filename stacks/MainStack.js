import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn/';
import SignUp from '../screens/Auth/SignUp/';
import Preload from '../screens/Preload/';
import Home from '../screens/Home/';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName='Preload'
    screenOptions={{headerShown: false}}
  >
  <Stack.Screen name="Preload" component={Preload} />
  <Stack.Screen name="SignIn" component={SignIn} />
  <Stack.Screen name="SignUp" component={SignUp} />
  <Stack.Screen name="Home" component={Home} />
</Stack.Navigator>
);