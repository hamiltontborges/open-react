import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../../../firebase-config';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  EXPO_CLIENT_ID,
} from '@env';

import logo from '../../../assets/open-unifeob.png';


WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const navigation = useNavigation();

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
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        // navigation.replace("Home");
      }
    });

    return unsubscribe
  }, []);

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
    } catch (error) {
      console.log(`ERRO => Mensagem: ${error}`);
    }
  }

  const login = async () => {
    try {
      const userCredential = awaitUpWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log(`Logged in with: ${user.email}`);
    }
    catch (error) {
      console.log(`ERRO => Mensagem: ${error}`);
    }
  }

  const logout = async () => {
    setUser({});
    console.log(`User ${user.email} logout`);
    await signOut(auth);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }} style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain"></Image>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)} s
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={login}
          style={styles.button}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={register}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={accessToken ? getUserData : () => { promptAsync({ showInRevents: true }) }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>signOut</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity
          // onPress={logout}
        >
          <Text style={styles.buttonOutlineText}>Já possui cadastro? Entre</Text>
        </TouchableOpacity>

      <Text>{user?.email}</Text>

    </ScrollView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d3468",
  },
  logo: {
    width: '80%'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#e9c915',
    width: '100%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: '#1d3468',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})