import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/core';

import { logout } from '../../services/AuthService';

import {
  StyleSheet,
  ScrollView
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import SignButton from '../../components/Sign/SignButton';


const ForgotPassword = () => {
  const [snackBarInfo, setSnackBarInfo] = useState({ visible: false, color: '', message: '' });
  const navigation = useNavigation();


  const logoutUser = async () => {
    try {
      await logout();
      setSnackBarInfo({ visible: true, color: 'green', message: 'Até mais!' });
      setTimeout(() => navigation.replace('SignIn'), 1500);
    }
    catch (error) {
      setSnackBarInfo({ visible: true, color: 'red', message: error })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1, marginTop: 80, justifyContent: 'flex-start', alignItems: "center" }} style={styles.container}>
    
          <>
            <SignButton
              title={'Submit'}
              onPress={() => {
                logoutUser();
              }}
              iconName={'send'}
              text={'LOGOUT'}
              disabled={false}
            />
          </>

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
  }
})