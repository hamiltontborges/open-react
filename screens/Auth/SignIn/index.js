import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { loginUser } from '../../../services/AuthService';
import {
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../../firebase-config';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import SignInput from '../../../components/Sign/SignInput';
import SignButton from '../../../components/Sign/SignButton';
import GoogleButton from '../../../components/Sign/GoogleButton';

import logo from '../../../assets/open-unifeob.png';
import { getDocByEmail, getDocById, signIn } from '../../../db/Firestore';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const SignIn = () => {
  const { dispatch: userDispatch } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const [snackBarInfo, setSnackBarInfo] = useState({ visible: false, color: '', message: '' });

  const navigation = useNavigation();

  const signinValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Preencher com email válido")
      .required('Preenchimento obrigatório'),
    password: yup
      .string()
      .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
      .required('Preenchimento obrigatório'),
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        // navigation.replace("Home");
      }
    });

    return unsubscribe
  }, []);



  const updateUserLogin = async (email) => {
    try {
      const item = await getDocByEmail(email);
      item.forEach((docu) => {
        signIn(docu.id);
        setContext(docu.id, docu.data().name, docu.data().email, docu.data().picture)
      })
    } catch(error) {
      console.log(error);
    }
  }

  const setContext = (id, name, email, picture) => {

    AsyncStorage.setItem('token', id);

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

  const login = async () => {
    try {
      await loginUser(email, password);
      updateUserLogin(email);
      setSnackBarInfo({ visible: true, color: 'green', message: 'Login efetuado com sucesso!' })
      setTimeout(() => navigation.replace('Home'), 1500);
    }
    catch (error) {
      setSnackBarInfo({ visible: true, color: 'red', message: error })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }} style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain"></Image>
      <Formik
        validationSchema={signinValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={() => {
          login();

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <View style={styles.inputContainer}>
              <SignInput
                nameInput={'email'}
                iconName={'email'}
                placeholder={"Email"}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType={'email-address'}
                password={false}
                hasError={(errors.email && touched.email) ? true : false}
                messageError={errors.email}
              />

              <SignInput
                nameInput={'password'}
                iconName={'lock'}
                placeholder={"Senha"}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                keyboardType={'default'}
                password={true}
                hasError={(errors.password && touched.password) ? true : false}
                messageError={errors.password}
              />
            </View>

            <View style={styles.forgotPassContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Recuperação de Senha")}
                style={styles.forgotPass}
              >
                <Text style={styles.forgotPassText}>Esqueceu sua senha? </Text>
              </TouchableOpacity>
            </View>

            <SignButton
              title={'Submit'}
              onPress={() => {
                handleSubmit();
                setEmail(values.email.toLowerCase());
                setPassword(values.password);
              }}
              iconName={'login'}
              text={'LOGIN'}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <View>
          <Text style={styles.dividerText}>OU</Text>
        </View>
        <View style={styles.dividerLine} />
      </View>

      <GoogleButton />
      <TouchableOpacity
        onPress={() => navigation.push("Registrar")}
        style={styles.signUpMessage}
      >
        <Text style={styles.signUpMessageText}>Ainda não possui cadastro? </Text>
        <Text style={styles.signUpMessageTextBold}>Cadastre-se</Text>
      </TouchableOpacity>

      <Snackbar
        visible={snackBarInfo.visible}
        duration={5000}
        style={{ backgroundColor: snackBarInfo.color }}
        onDismiss={() => setSnackBarInfo({ visible: false })}
      >
        {snackBarInfo.message}
      </Snackbar>

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