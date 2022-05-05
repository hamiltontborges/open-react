import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

import { UserContext } from '../../contexts/UserContext';

const CustomTabBar = ({ state, navigation }) => {

  const { state: user } = useContext(UserContext);

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  }

  return (
    <View style={styles.tabArea}>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo('Interest')}>
        <MaterialIcons name={'lightbulb'} size={28} style={{ color: state.index === 0 ? '#e9c915' : '#f0f0f0' }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo('Favorites')}>
        <MaterialIcons name={'favorite'} size={28} style={{ color: state.index === 1 ? '#e9c915' : '#f0f0f0' }} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={[styles.tabItem, styles.tabItemCenter, { backgroundColor: state.index === 2 ? '#e9c915' : '#f0f0f0' }]} onPress={() => goTo('Home')} >
        <MaterialIcons name={'home'} size={34} color={'#09142c'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo('Playlists')}>
        <MaterialIcons name={'playlist-play'} size={36} style={{ color: state.index === 3 ? '#e9c915' : '#f0f0f0' }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo('Profile')}>
        {
        user.avatar !== ''
        ?
        <Avatar.Image size={32} source={{uri: user.avatar}} />
        :
        <Ionicons name="md-person-circle-sharp" size={30} style={{ color: state.index === 4 ? '#e9c915' : '#f0f0f0' }} />
        }
      </TouchableOpacity>
      
    </View>
  )
}

export default CustomTabBar

const styles = StyleSheet.create({
  tabArea: {
    height: 70,
    backgroundColor: '#09142c',
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemCenter: {
    width: 70,
    height: 70,
    backgroundColor: '#f0f0f0',
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#09142c',
    marginTop: -20,
  }
})