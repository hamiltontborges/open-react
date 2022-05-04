import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Preload from '../screens/Preload/';
import SignIn from '../screens/Auth/SignIn/';
import SignUp from '../screens/Auth/SignUp/';
import ForgotPassword from '../screens/Auth/FogotPassword/';
import Home from '../screens/Home/';
import { TransitionSpecs } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName='Signin'
    screenOptions={{
      headerStyle: {
        backgroundColor: '#09142c',
      },
      headerTintColor: '#E4E4E4',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    }}
  >
    <Stack.Screen options={{headerShown: false}} name="Preload" component={Preload} />
    <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
    <Stack.Screen name="Registrar" component={SignUp} />
    <Stack.Screen name="Recuperação de Senha" component={ForgotPassword} />
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);