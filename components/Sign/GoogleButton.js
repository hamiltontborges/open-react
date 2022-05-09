import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import googleLogo from '../../assets/google.png';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDocByEmail, siginGoogle } from '../../db/Firestore';
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
      navigation.replace('Drawer');
    }
  }, [response]);

  const isSignUp = async (email, name, pictureLink) => {
    siginGoogle(email, name, pictureLink);
  }

  const updateUserLogin = async (email) => {
    try {
      const item = await getDocByEmail(email);
      item.forEach((docu) => {
        const data = docu.data();
        console.log(docu.id)
        setContext(docu.id, data.full_name, data.email, data.picture, data.course)
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  const setContext = (id, name, email, picture, course) => {
    userDispatch({
      type: 'setId',
      payload: {
        id: id
      }
    });
    userDispatch({
      type: 'setAvatar',
      payload: {
        avatar: picture
      }
    });
    userDispatch({
      type: 'setEmail',
      payload: {
        email: email
      }
    });
    userDispatch({
      type: 'setFullname',
      payload: {
        fullname: name
      }
    });
    userDispatch({
      type: 'setCourse',
      payload: {
        fullname: course
      }
    });
  }

  const getUserData = async (accessToken) => {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
      isSignUp(data.email, data.name, data.picture);
      AsyncStorage.setItem('token', response.authentication.accessToken);
      updateUserLogin(data.email)
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


