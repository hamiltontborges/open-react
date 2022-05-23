import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { registerUser } from '../../../services/AuthService';

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
import { signUp } from '../../../db/Firestore';
import PasswordInput from '../../../components/Sign/PasswordInput';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [snackBarInfo, setSnackBarInfo] = useState({ visible: false, color: '', message: '' });

  const navigation = useNavigation();

  const signupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Preencher com email válido")
      .required('Preenchimento obrigatório'),
    name: yup
      .string()
      .min(10, ({ min }) => `O nome deve ter no mínimo ${min} caracteres`)
      .max(40, ({ max}) => `O nome deve ter no máximo ${max} caracteres`)
      .required('Preenchimento obrigatório'),
    password: yup
      .string()
      .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
      .required('Preenchimento obrigatório'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais.')
      .required('Preenchimento obrigatório'),
  })


  const register = async () => {
    try {
      await registerUser(email, password);
      setSnackBarInfo({ visible: true, color: 'green', message: 'Usuário cadastrado com sucesso!' })
      signUp(email, name);
      setTimeout(() => navigation.navigate('SignIn'), 1500);
    }
    catch (error) {
      setSnackBarInfo({ visible: true, color: 'red', message: error })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }} style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain"></Image>
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
        onSubmit={() => {
          register();
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
                nameInput={'name'}
                iconName={'person'}
                placeholder={"Nome completo"}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                keyboardType={'default'}
                password={false}
                hasError={(errors.name && touched.name) ? true : false}
                messageError={errors.name}
              />

              <PasswordInput
                nameInput={'password'}
                iconName={'lock'}
                placeholder={"Senha"}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                keyboardType={'default'}
                hasError={(errors.password && touched.password) ? true : false}
                messageError={errors.password}
              />

              <PasswordInput
                nameInput={'confirmPassword'}
                iconName={'lock'}
                placeholder={"Confirme a senha"}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                keyboardType={'default'}
                hasError={(errors.confirmPassword && touched.confirmPassword) ? true : false}
                messageError={errors.confirmPassword}
              />
            </View>

            <SignButton
              title={'Submit'}
              onPress={() => {
                handleSubmit();
                setEmail(values.email.toLowerCase());
                setName(values.name);
                setPassword(values.password);
              }}
              iconName={'person-add'}
              text={'REGISTRAR'}
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
        onPress={() => navigation.replace("SignIn")}
        style={styles.signUpMessage}
      >
        <Text style={styles.signUpMessageText}>Já possui cadastro? </Text>
        <Text style={styles.signUpMessageTextBold}>Entre</Text>
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

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d3468",
  },
  logo: {
    height: 100,
    width: '50%'
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