import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { UserContext } from '../../../contexts/UserContext';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import MainInput from '../../../components/Main/MainInput';
import { Snackbar } from 'react-native-paper';
import { formatDate } from '../../../regex/functionsRegex';



const Profile = () => {

  const { state: user } = useContext(UserContext);

  const [name, setName] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [birth, setBirth] = useState(user.birth);
  const [course, setCourse] = useState(user.course);
  const [avatar, setAvatar] = useState(user.avatar);

  const navigation = useNavigation();


  return (
    <View>
      <ScrollView>
        <View style={styles.header}>
          {
            user.avatar !== ''
              ?
              <Avatar.Image size={100} source={{ uri: user.avatar }} style={styles.image} />
              :
              <Avatar.Text size={100} label={firstLetter(user.fullname)} color={'white'} style={{ backgroundColor: '#264F9C' }} />
          }
        </View>
        <View style={styles.infoArea}>
          <Text style={styles.infoName}>{name}</Text>
          <Text style={styles.infoEmail}>{email}</Text>
          <Text>{birth}</Text>
          <Text>{course}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#09142c',
  },
  image: {
    top: 15,
    alignSelf: 'center',
  },
  infoArea: {
    paddingTop: 50,
    alignItems: 'center',
  },
  infoName: {
    fontSize: 18,
    fontWeight: '700',
  },
  infoEmail: {
    fontSize: 16,
  },
})