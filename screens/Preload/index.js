import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import React, {useEffect,useContext } from 'react';
import logo from '../../assets/open-unifeob.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { UserContext } from '../../contexts/UserContext';

const Preload = () => {

  const navigation = useNavigation();

  const { state: user } = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if(user !== '' || user !== null) {
        navigation.replace('SignIn')
        // navigation.replace('Drawer');
        // navigation.reset({routes: [{name: 'MainTab'}]});
      } else {
        setTimeout(() => {
          navigation.replace('SignIn');
        }, 1000)
      }
    }
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
        <Animatable.Image source={logo} style={styles.logo} resizeMode="contain" animation="fadeIn" duration={2000}></Animatable.Image>
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