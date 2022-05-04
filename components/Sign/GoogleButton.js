import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import googleLogo from '../../assets/google.png';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { siginGoogle } from '../../db/Firestore';
import { UserContext } from '../../contexts/UserContext';

import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  EXPO_CLIENT_ID,
} from '@env';


export default GoogleButton = () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  });

  useEffect(async () => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken)
      await getUserData(response.authentication.accessToken)
      navigation.replace("Home")
    }
  }, [response]);

  const isSignUp = async (email, name, pictureLink) => {
    siginGoogle(email, name, pictureLink);
  }

  const setContext = (name, email, picture) => {
    userDispatch( {
      type: 'setAvatar',
      payload: {
        avatar: picture
      },
      type: 'setEmail',
      payload: {
        email: email
      },
      type: 'setFullname',
      payload: {
        fullname: name
      },
    })
  }

  const getUserData = async (accessToken) => {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
      isSignUp(data.email, data.name, data.picture);
      AsyncStorage.setItem('token', data.id);
      setContext(data.name, data.email, data.picture);
    });
  }

  return (
    <>
      { }
      <View style={styles.buttonGoogleContainer}>
        <TouchableOpacity
          onPress={() => {
            promptAsync({ showInRevents: true })


          }}
          style={styles.buttonGoogle}
        >
          <Image source={googleLogo} style={styles.googleLogo} resizeMode="contain"></Image>
          <Text style={styles.buttonGoogleText}>Entrar com Google</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  buttonGoogleContainer: {
    width: '80%',
  },
  buttonGoogle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    paddingVertical: 12,
    borderRadius: 10,

  },
  buttonGoogleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  googleLogo: {
    width: 28,
    height: 28,
  },
});


