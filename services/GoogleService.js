import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import googleLogo from '../../../assets/google.png';

import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  EXPO_CLIENT_ID,
} from '@env';


export default () => {

  const [accessToken, setAccessToken] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  const getUserData = async () => {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      setUser(data);
      console.log(data);
    });
  }
  return (
    <View style={styles.buttonGoogleContainer}>
      <TouchableOpacity
        onPress={accessToken ? getUserData : () => { promptAsync({ showInRevents: true }) }}
        style={styles.buttonGoogle}
      >
        <Image source={googleLogo} style={styles.googleLogo} resizeMode="contain"></Image>
        <Text style={styles.buttonGoogleText}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
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