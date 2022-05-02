import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
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
import googleLogo from '../../../assets/google.png';

import SignInput from '../../../components/SignInput';
import SignButton from '../../../components/SignButton';


WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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

        <SignInput
          iconName={'email'}
          placeholder={"Email"}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType={'email-address'}
          password={false}
        />

        <SignInput
          iconName={'lock'}
          placeholder={"Password"}
          value={password}
          onChangeText={text => setPassword(text)}
          keyboardType={'default'}
          password={true}
        />
      </View>

      <View style={styles.forgotPassContainer}>
        <TouchableOpacity
          // onPress={() => navigation.replace("SignUp")}
          style={styles.forgotPass}
        >
          <Text style={styles.forgotPassText}>Esqueceu sua senha? </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <SignButton
          onPress={login}
          iconName={'login'}
          text={'LOGIN'}
        />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <View>
          <Text style={styles.dividerText}>OU</Text>
        </View>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.buttonGoogleContainer}>
        <TouchableOpacity
          onPress={accessToken ? getUserData : () => { promptAsync({ showInRevents: true }) }}
          style={styles.buttonGoogle}
        >
          <Image source={googleLogo} style={styles.googleLogo} resizeMode="contain"></Image>
          <Text style={styles.buttonGoogleText}>Entrar com Google</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={logout}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>signOut</Text>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        onPress={() => navigation.replace("SignUp")}
        style={styles.signUpMessage}
      >
        <Text style={styles.signUpMessageText}>Ainda não possui cadastro? </Text>
        <Text style={styles.signUpMessageTextBold}>Cadastre-se</Text>
      </TouchableOpacity>

      <Text>{user?.email}</Text>

    </ScrollView>
  )
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d3468",
  },
  logo: {
    height: 200,
    width: '80%'
  },
  inputContainer: {
    width: '80%'
  },
  forgotPassContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '80%',
    paddingTop: 5,
  },
  forgotPass: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
  },
  forgotPassText: {
    fontSize: 14,
    color: '#e9c915',
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  divider: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#f0f0f0'
  },
  dividerText: {
    color: '#f0f0f0',
    width: 50,
    textAlign: 'center'
  },
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
  signUpMessage: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
  },
  signUpMessageText: {
    fontSize: 16,
    color: '#e9c915',
  },
  signUpMessageTextBold: {
    fontSize: 16,
    color: '#e9c915',
    fontWeight: 'bold'
  },

})