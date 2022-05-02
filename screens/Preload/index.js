import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import React, {useEffect } from 'react';
import logo from '../../assets/open-unifeob.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Preload = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token !== null) {
        //validar token
        
      } else {
        navigation.navigate('SignIn');
      }
    }
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain"></Image>
        <ActivityIndicator size="large" color="#e9c915"></ActivityIndicator>
    </View>
  )
}

export default Preload

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d3468',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
  }
})