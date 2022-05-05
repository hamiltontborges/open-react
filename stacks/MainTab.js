import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/Main/CustomTabBar';

import Home from '../screens/Home/';
import Playlists from '../screens/Interest/';
import Interest from '../screens/Interest/';
import Profile from '../screens/Profile/';
import Favorites from '../screens/Favorites/';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator 
  initialRouteName='Home'
  tabBar={props=> <CustomTabBar {...props}/>}
  >
    <Tab.Screen options={{headerShown: false}}  name="Interest" component={Interest}/>
    <Tab.Screen options={{headerShown: false}}  name="Favorites" component={Favorites}/>
    <Tab.Screen options={{headerShown: false}}  name="Home" component={Home}/>
    <Tab.Screen options={{headerShown: false}}  name="Playlists" component={Playlists}/>
    <Tab.Screen options={{headerShown: false}} name="Profile" component={Profile}/>
  </Tab.Navigator>
)