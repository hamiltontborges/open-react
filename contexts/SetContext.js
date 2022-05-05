import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import UserContext from './UserContext';


export const setFullContext = (token, id, name, email, picture, course) => {

  const { dispatch: userDispatch } = useContext(UserContext);

  AsyncStorage.setItem('token', token);

  userDispatch({
    type: 'setId',
    payload: {
      id: id,
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
      course: course
    }
  })
}
