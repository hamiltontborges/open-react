import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { resetPasswordUser } from '../../../services/AuthService';

import {
  StyleSheet,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import SignInput from '../../../components/Sign/SignInput';
import SignButton from '../../../components/Sign/SignButton';

import logo from '../../../assets/open-unifeob.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [snackBarInfo, setSnackBarInfo] = useState({ visible: false, color: '', message: '' });

  const navigation = useNavigation();

  const signupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Preencher com email válido")
      .required('Preenchimento obrigatório'),
  })


  const sendEmailResetPassword = async () => {
    try {
      await resetPasswordUser(email);
      setSnackBarInfo({ visible: true, color: 'green', message: 'Email de recuperação de senha enviado!' });
      setTimeout(() => navigation.replace('SignIn'), 1500);
    }
    catch (error) {
      setSnackBarInfo({ visible: true, color: 'red', message: error })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1, marginTop: 80, justifyContent: 'flex-start', alignItems: "center" }} style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain"></Image>
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{ email: ''}}
        onSubmit={() => {
          sendEmailResetPassword();

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
            </View>

            <SignButton
              title={'Submit'}
              onPress={() => {
                handleSubmit();
                setEmail(values.email);
              }}
              iconName={'send'}
              text={'RECUPERAR SENHA'}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>

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

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d3468",
  },
  logo: {
    height: 100,
    width: '50%'
  },
  inputContainer: {
    width: '80%'
  }
})