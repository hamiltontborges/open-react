import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { UserContext } from '../../../contexts/UserContext';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import { firstLetter, formatDate } from '../../../regex/functionsRegex';
import ProfileInput from '../../../components/Main/ProfileInput';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


const Profile = () => {


  const { state: user } = useContext(UserContext);

  const [name, setName] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [birth, setBirth] = useState(user.birth);
  const [course, setCourse] = useState(user.course);
  const [avatar, setAvatar] = useState(user.avatar);
  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false)

  const navigation = useNavigation();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birth;
    setOpen(!open);
    setDate(selectedDate);
    setBirth(selectedDate);
  }

  return (
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <View style={styles.header}>
          {
            user.avatar !== ''
              ?
              <Avatar.Image size={100} source={{ uri: user.avatar }} style={styles.image} />
              :
              <Avatar.Text size={100} label={firstLetter(user.fullname)} color={'white'} style={styles.image} />
          }
        </View>
        <View style={styles.infoArea}>
          <ProfileInput
            icon={<Ionicons name="person" size={24} color="#09142c" />}
            value={name}
            placeholder={'Nome'}
          />
          <ProfileInput
            value={email}
            placeholder={'Email'}
            icon={<MaterialIcons name="email" size={24} color="#09142c" />}
          />
          <TouchableOpacity title="DatePicker" onPress={() => setOpen(true)}>
            <View style={[styles.inputDateArea]}>
              <FontAwesome5 name="calendar-alt" size={24} color="black" />
              <Text style={styles.inputDate}>
                {birth ? formatDate(birth) : 'Data de nascimento'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* <Button title="DatePicker" onPress={() => setOpen(true)} /> */}
          {
            open && <DateTimePicker value={date} testID='DatePicker' onChange={onChange} />
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    height: 70,
    width: '100%',
    backgroundColor: '#09142c',
    marginBottom: 10,
  },
  image: {
    backgroundColor: '#264F9C',
    top: 15,
    alignSelf: 'center',
  },
  infoArea: {
    width: '80%',
    paddingTop: 50,
    alignItems: 'center',
  },
  infoEmail: {
    fontSize: 16,
  },
  inputDateArea: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#09142c',
  },
  inputDate: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    paddingTop: 15,
  }

})




