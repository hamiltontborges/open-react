import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import logoBranco from '../../assets/open-unifeob.png';

import { UserContext } from '../../contexts/UserContext';

const CustomTabBar = ({ state, navigation }) => {

  const { state: user } = useContext(UserContext);

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  }

  return (
    <View style={styles.tabArea}>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo('Interest')}>
        <MaterialIcons
          name={'lightbulb'} size={28}
          style={{ color: state.index === 0 ? '#e9c915' : '#f0f0f0' }}
        />
        <Text
          style={[styles.tabLabel, { color: state.index === 0 ? '#e9c915' : '#f0f0f0' }, { display: state.index === 0 ? 'flex' : 'none' }]}
        >
          Sugestões
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => goTo('Favorites')}
      >
        <MaterialIcons
          name={'favorite'}
          size={28}
          style={{ color: state.index === 1 ? '#e9c915' : '#f0f0f0' }}
        />
        <Text
          style={[styles.tabLabel, { color: state.index === 1 ? '#e9c915' : '#f0f0f0' }, { display: state.index === 1 ? 'flex' : 'none' }]}
        >
          Favoritos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        style={[styles.tabItem, styles.tabItemCenter, {borderColor: state.index === 2 ? '#e9c915' : '#09142c' }]}
        onPress={() => goTo('Home')}
      >
        <Image
          source={logoBranco}
          style={{ width: 60, }}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => goTo('Playlists')}
      >
        <MaterialIcons
          name={'playlist-play'}
          size={38}
          style={{ color: state.index === 3 ? '#e9c915' : '#f0f0f0' }}
        />
        <Text
          style={[styles.tabLabel, { color: state.index === 3 ? '#e9c915' : '#f0f0f0', fontWeight: 'bold' }, { display: state.index === 3 ? 'flex' : 'none' }]}
        >
          Playlists
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => goTo('Channels')}
      >
        <MaterialIcons
          name={'video-collection'}
          size={28}
          style={{ color: state.index === 4 ? '#e9c915' : '#f0f0f0' }}
        />
        <Text
          style={[styles.tabLabel, { color: state.index === 4 ? '#e9c915' : '#f0f0f0', fontWeight: 'bold' }, { display: state.index === 4 ? 'flex' : 'none' }]}
        >
          Canais
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export default CustomTabBar

const styles = StyleSheet.create({
  tabArea: {
    height: 60,
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
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#09142c',
    marginTop: -20,
    backgroundColor: '#264F9C',
  },
  tabLabel: {
    display: 'none',
    fontSize: 9,
    color: '#f0f0f0',
  }
})