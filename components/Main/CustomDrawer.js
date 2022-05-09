import React, { useContext } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import { UserContext } from '../../contexts/UserContext';
import { logout } from '../../services/AuthService';
import { firstLetter } from '../../regex/functionsRegex';


export const CustomDrawer = (props) => {

  const { state: user } = useContext(UserContext);

  const { navigation } = props;

  const createButtonAlert = () =>
  Alert.alert('Atenção', 'Deseja realmente sair do aplicativo?', [
    {
      text: 'Cancelar',
      onPress: () => {},
      style: 'cancel',
    },
    { text: 'Continuar', onPress: () =>  {
      AsyncStorage.setItem('token', '');
      logout();
      navigation.replace('SignIn');
    }},
  ]);

  return (
    <DrawerContentScrollView contentContainerStyle={{
      paddingTop: 0,
    }} {...props} >
      <View style={{ flexGrow: 2 }}>
        <View style={styles.areaHeader}>

          {
            user.avatar !== ''
              ?
              <Avatar.Image size={70} source={{ uri: user.avatar }} />
              :
              <Avatar.Text size={70} label={firstLetter(user.fullname)} color={'white'} style={{ backgroundColor: '#264F9C' }} />
          }
          <Text style={[styles.textHeader, { paddingTop: 10 }]}>{user.fullname}</Text>
          <Text style={[styles.textHeader, styles.textEmail]}>{user.email}</Text>

        </View>
        <DrawerItem
          icon={() => <Ionicons name="person" size={23} color='#09142c' />}
          label="Meu perfil"
          labelStyle={styles.labelOptions}
          onPress={() => {navigation.navigate('Profile') }}
        />
        <DrawerItem
          icon={() => <Entypo name="upload" size={24} color='#09142c' />}
          label="Adicionar vídeo"
          labelStyle={styles.labelOptions}
          onPress={() => {navigation.navigate('VideoUpload')}}
        />
        <DrawerItem
          icon={() => <Entypo name="folder-video" size={24} color='#09142c' />}
          label="Meus vídeos"
          labelStyle={styles.labelOptions}
          onPress={() => { }}
        />
        <DrawerItem
          icon={() => <MaterialIcons name="message" size={24} color='#09142c' />}
          label="Mensagens"
          labelStyle={styles.labelOptions}
          onPress={() => { }}
        />
        <Divider style={{ marginVertical: 5, backgroundColor: 'gray'  }} />
        <DrawerItem
          icon={() => <Ionicons name="settings-sharp" size={24} color="black" />}
          label="Configurações"
          labelStyle={styles.labelOptions}
          onPress={() => { }}
        />
        <DrawerItem
          icon={() => <AntDesign name="questioncircle" size={24} color="black" />}
          label="Ajuda e Feedback"
          labelStyle={styles.labelOptions}
          onPress={() => { }}
        />
        <Divider style={{ marginVertical: 5, backgroundColor: 'gray' }} />
        <DrawerItem
          icon={() => <Entypo name="log-out" size={24} color='#09142c' />}
          label="Sair"
          labelStyle={styles.labelOptions}
          onPress={() => {
            createButtonAlert()
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  areaHeader: {
    backgroundColor: '#09142c',
    paddingTop: 50,
    padding: 20,
    justifyContent: 'center',
  },
  textHeader: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textEmail: {
    fontSize: 13,
  },
  labelOptions: {
    fontSize: 16,
    color: '#09142c',
  }
})