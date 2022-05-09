import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/Main/CustomTabBar';
import CustomTopBar from '../components/Main/CustomTopBar';

import Home from '../screens/Main/Home';
import Playlists from '../screens/Main/Playlists';
import Interest from '../screens/Main/Interest';
import Channels from '../screens/Main/Channels';
import Favorites from '../screens/Main/Favorites';
import Profile from '../screens/Drawer/Profile';
import Search from '../screens/Search';
import VideoUpload from '../screens/Drawer/VideoUpload';
import VideoPlayer from '../screens/VideoPlayer';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    initialRouteName='Home'
    screenOptions={{
      headerShown: false,
    }}
    tabBar={props => <CustomTabBar {...props}
    />}
  >
    <Tab.Screen name="Interest" component={Interest} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Playlists" component={Playlists} />
    <Tab.Screen name="Channels" component={Channels} />
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="VideoUpload" component={VideoUpload} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="VideoPlayer" component={VideoPlayer} />
  </Tab.Navigator>
)