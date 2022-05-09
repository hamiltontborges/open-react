import React from 'react';
import {View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import MainTab from './MainTab';
import CustomTopBar from '../components/Main/CustomTopBar';
import { CustomDrawer } from '../components/Main/CustomDrawer';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator
    screenOptions={{
      header: 
        (props) => <CustomTopBar {...props}/>
    }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen  name="MainTab" component={MainTab} />
    </Drawer.Navigator>
  );
};
