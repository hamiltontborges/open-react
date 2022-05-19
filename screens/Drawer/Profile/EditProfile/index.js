import React, { useState, useContext } from 'react';

import { UserContext } from '../../../../contexts/UserContext';
import { useNavigation } from '@react-navigation/core';

import { StyleSheet, Text, TextInput, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import SignButton from '../../../../components/Sign/SignButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import ProfileInput from '../../../../components/Main/ProfileInput';
import SelectDropdown from 'react-native-select-dropdown'

import { firstLetter, formatDate } from '../../../../regex/functionsRegex';
import { courses } from './cousers';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { updateUser } from '../../../../db/Firestore';
import { storage } from '../../../../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const Profile = () => {

  const { state: user } = useContext(UserContext);
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [name, setName] = useState(user.fullname);
  const [birth, setBirth] = useState(user.birth);
  const [course, setCourse] = useState(user.course);
  const [avatar, setAvatar] = useState(user.avatar);
  const [perfil, setPerfil] = useState(user.perfil);
  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false)

  const [snackBarInfo, setSnackBarInfo] = useState({ visible: false, color: '', message: '' });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpen(!open);
    setDate(currentDate);
    setBirth(currentDate);
  }

  const createButtonAlert = () =>
    Alert.alert('Atenção', 'Seus dados serão atualizados!', [
      {
        text: 'Cancelar',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'Continuar', onPress: () => {
          submitProfile();
          setTimeout(() => navigation.navigate('Home'), 1000);
        }
      },
    ]);

  const submitProfile = async () => {
    try {
      await storageGetUrlPhoto();
      setContext(name, avatar, course, birth, perfil);
      // await updateUser(user.id, name, avatar, course, birth, perfil)
      setSnackBarInfo({ visible: true, color: 'green', message: 'Prefil atualizado com sucesso!' });
    }
    catch {
      setSnackBarInfo({ visible: true, color: 'red', message: 'Algo deu errado!' });
    }
    finally {
      setContext(name, avatar, course, birth, perfil);
      await updateUser(user.id, name, avatar, course, birth, perfil)
      setSnackBarInfo({ visible: true, color: 'green', message: 'Prefil atualizado com sucesso!' });
    }
  }

  const storageUploadPhoto = async (resultUri) => {
    const reference = ref(storage, `/${user.id}/avatar.jpg`);
    const img = await fetch(resultUri);
    const bytes = await img.blob();
    await uploadBytes(reference, bytes);
  }


  const storageGetUrlPhoto = async () => {
    const reference = ref(storage, `/${user.id}/avatar.jpg`);
    await getDownloadURL(reference).then(item => {
      setAvatar(item)
      setContext(name, avatar, course, birth, perfil);
      updateUser(user.id, name, item, course, birth, perfil)
    })
  }

  const setContext = (name, picture, course, birth, perfil) => {

    userDispatch({
      type: 'setAvatar',
      payload: {
        avatar: picture
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
    });
    userDispatch({
      type: 'setBirth',
      payload: {
        birth: birth
      }
    });
    userDispatch({
      type: 'setPerfil',
      payload: {
        perfil: perfil
      }
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      await storageUploadPhoto(result.uri);
      setAvatar(result.uri);
    }
  }

  return (
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingBottom: 25, }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage} style={styles.photoTouch}>
            <MaterialIcons name="add-photo-alternate" size={12} color='#FFFFFF' style={styles.iconEdit} />
            {
              avatar !== ''
                ?
                <Avatar.Image size={100} source={{ uri: avatar }} style={styles.image} />
                :
                <Avatar.Text size={100} label={firstLetter(user.fullname)} color={'white'} style={styles.image} />
            }
          </TouchableOpacity>
        </View>
        <View style={styles.infoArea}>
          <ProfileInput
            editable={false}
            value={user.email}
            placeholder={'Email'}
            icon={<MaterialIcons name="email" size={20} color="#09142c" />}
          />
          <ProfileInput
            icon={<Ionicons name="person" size={20} color="#09142c" />}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={'Nome'}
          />
          <TouchableOpacity title="DatePicker" onPress={() => setOpen(true)}>
            <View style={[styles.inputDateArea]}>
              <FontAwesome5 name="calendar-alt" size={20} color="#09142c" />
              <Text style={styles.inputDate}>
                {birth ? formatDate(birth) : 'Data de nascimento'}
              </Text>
            </View>
          </TouchableOpacity>

          {
            open && <DateTimePicker value={date} testID='DatePicker' onChange={onChange} style={styles.calendar} />
          }
          <View style={[styles.inputSelectArea]}>
            <FontAwesome5 name="book" size={20} color="#09142c" />
            <SelectDropdown
              defaultValue={course ? course : 'Selecione o curso'}
              buttonStyle={styles.selectButton}
              buttonTextStyle={styles.selectButtonText}
              rowTextStyle={{ fontSize: 14 }}
              rowStyle={styles.selectDropdown}
              dropdownStyle={styles.dropdown}
              data={courses}
              onSelect={(selectedItem, index) => {
                setCourse(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
          </View>
          <View style={[styles.inputDescriptionArea]}>
            <MaterialIcons name="description" size={24} color="#09142c" style={styles.descriptionIcon} />
            <TextInput
              style={styles.inputDescription}
              name={'perfil'}
              placeholder={'Digite aqui seu perfil:'}
              value={perfil}
              placeholderTextColor="#7E7E7E"
              selectionColor={'#09142c'}
              onChangeText={(text) => setPerfil(text)}
              multiline={true}
              maxLength={500}
            />
          </View>
          <SignButton
            style={styles.button}
            onPress={() => createButtonAlert()}
            iconName={'send'}
            text={'ATUALIZAR'}
          />
        </View>

        <Snackbar
          wrapperStyle={{ top: 0 }}
          visible={snackBarInfo.visible}
          duration={5000}
          style={{ backgroundColor: snackBarInfo.color }}
          onDismiss={() => setSnackBarInfo({ visible: false })}
        >
          {snackBarInfo.message}
        </Snackbar>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    height: 70,
    width: '100%',
    marginBottom: 10,
  },
  photoTouch: {
    borderRadius: 50,
    top: 15,
    alignSelf: 'center',
    position: 'relative',
  },
  iconEdit: {
    backgroundColor: '#09142c',
    position: 'absolute',
    top: 0,
    right: 6,
    zIndex: 1,
    padding: 3,
    borderRadius: 10,

  },
  image: {
    backgroundColor: '#264F9C',
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
  },
  inputSelectArea: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#09142c',
  },
  selectButton: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    textAlign: 'center',
  },
  selectButtonText: {
    fontSize: 14,
  },
  selectDropdown: {
    padding: 15,
  },
  dropdown: {
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#09142c',
  },
  inputDescriptionArea: {
    height: 200,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    // marginBottom: 15,
    borderWidth: 1,
    borderColor: '#09142c',
  },
  descriptionIcon: {
    alignSelf: 'flex-start',
    marginLeft: -3,
  },
  inputDescription: {
    textAlignVertical: 'top',
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    flexWrap: 'wrap',
  }
})




