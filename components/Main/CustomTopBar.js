import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { UserContext } from '../../contexts/UserContext';


const CustomTopBar = ({ state, navigation }) => {

  const { state: user } = useContext(UserContext);
  const [search, setSearch] = useState('');

  const [openSearch, setOpenSearch] = useState(true);

  useEffect(() => {
    navigation.navigate('Search', {
      paramKey: search,
    })
    if(search === '') {
      navigation.navigate('Home');
    }
  }, [search])


  return (
    <>
      <View style={styles.topArea}>
        <View style={styles.menuArea}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.openDrawer()}
          >
            <Entypo name="menu" size={32} color="white" />

          </TouchableOpacity>
        </View>
        <View style={styles.searchArea}>
          {openSearch
            ?
            <View style={styles.areaSearchIcon}>
              <TouchableOpacity onPress={() => setOpenSearch(false)}>
                <FontAwesome style={styles.searchIcon} name="search" size={24} color="white" />
              </TouchableOpacity>
            </View>
            :
            <View animation={!openSearch ? "slideInRight" : "slideOutRight"} duration={500} style={[styles.inputArea]}>
              <MaterialIcons style={styles.iconInput} name={'search'} size={24} color="#353535" />
              <TextInput
                name={'searchInput'}
                style={styles.input}
                value={search}
                placeholder={"Pesquisar vídeo"}
                onChangeText={(value) => {
                  setSearch(value)}}
                placeholderTextColor="#7E7E7E"
                onFocus={() => setOpenSearch(false)}
              />
              <TouchableOpacity onPress={() => {setOpenSearch(true), setSearch('')}}>
                <Entypo style={styles.crossIcon} name="cross" size={24} color="#353535" />
              </TouchableOpacity>
            </View>
          }
        </View>
      </View >
    </>
  )
}

export default CustomTopBar

const styles = StyleSheet.create({
  topArea: {
    height: 90,
    backgroundColor: '#09142c',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  inputArea: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 15,
    marginRight: 10,
  },
  menuArea: {
    width: 60,
    marginBottom: 10,
    marginLeft: 15,
  },
  searchArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  areaSearchIcon: {
    marginBottom: 10,
    marginRight: 20,
  },
  searchIcon: {
    marginBottom: 5,
  },
  iconInput: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    fontSize: 16,
    color: '#353535',
    marginLeft: 5,
  },
  crossIcon: {
    marginRight: 10,
  }
})