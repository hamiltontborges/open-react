import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderBackButton } from '@react-navigation/elements';

import CustomTabBar from '../components/Main/CustomTabBar';

import Home from '../screens/Main/Home';
import Playlists from '../screens/Main/Playlists';
import Interest from '../screens/Main/Interest';
import Channels from '../screens/Main/Channels';
import Favorites from '../screens/Main/Favorites';
import Profile from '../screens/Drawer/Profile';
import EditProfile from '../screens/Drawer/Profile/EditProfile/';
import Search from '../screens/Search';
import VideoUpload from '../screens/Drawer/VideoUpload';
import VideoPlayer from '../screens/VideoPlayer';
import { useNavigation } from '@react-navigation/core';

const Tab = createBottomTabNavigator();

export default () => {

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        headerLeft: (props) => (<HeaderBackButton {...props} onPress={() => { navigation.navigate('Profile') }} />),
        headerLeftContainerStyle: {color: 'white'},
        headerStyle: {
          backgroundColor: '#09142c',
          height: 50,
        },
        headerTintColor: '#E4E4E4',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,

        },
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
      <Tab.Screen options={{ headerShown: true }} name="Edite seus dados" component={EditProfile} />
      <Tab.Screen name="VideoUpload" component={VideoUpload} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="VideoPlayer" component={VideoPlayer} />
    </Tab.Navigator>
  )
}