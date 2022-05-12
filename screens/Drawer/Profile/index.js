import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { UserContext } from '../../../contexts/UserContext';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { firstLetter, formatDate } from '../../../regex/functionsRegex';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const Profile = () => {

  const { state: user } = useContext(UserContext);

  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: '#09142c', flexGrow: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.editArea} onPress={() => navigation.navigate('Edite seus dados')}>
            <Feather name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.viewInfo}>
          {
            user.avatar !== ''
              ?
              <Avatar.Image size={100} source={{ uri: user.avatar }} style={styles.image} />
              :
              <Avatar.Text size={100} label={firstLetter(user.fullname)} color={'white'} style={styles.image} />
          }
          <View style={styles.infoArea}>
            <View style={styles.subtitleArea}>
            <Ionicons name="person" size={18} color="#09142c" />
              <Text style={styles.subtitle}>
                NOME:
              </Text>
            </View>
            <Text style={styles.text}>
              {user.fullname}
            </Text>
            <View style={styles.subtitleArea}>
              <MaterialIcons name="email" size={18} color="#09142c" style={styles.icon} />
              <Text style={styles.subtitle}>
                EMAIL:
              </Text>
            </View>
            <Text style={styles.text}>
              {user.email}
            </Text>
            <View style={styles.subtitleArea}>
            <FontAwesome5 name="birthday-cake" size={18} color="#09142c" />
              <Text style={styles.subtitle}>
                ANIVERSÁRIO:
              </Text>
            </View>
            <Text style={styles.text}>
              {user.birth ? formatDate(user.birth) : ''}
            </Text>
            <View style={styles.subtitleArea}>
            <FontAwesome5 name="book" size={17} color="#09142c" />
              <Text style={styles.subtitle}>
                CURSO:
              </Text>
            </View>
            <Text style={styles.text}>
              {user.course}
            </Text>
            <View style={styles.subtitleArea}>
            <MaterialIcons name="description" size={20} color="#09142c" style={styles.descriptionIcon} />
              <Text style={styles.subtitle}>
                PERFIL:
              </Text>
            </View>
            <Text style={styles.text}>
              {user.perfil}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    position: 'relative',
  },
  editArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  viewInfo: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    flexGrow: 1,
  },
  image: {
    backgroundColor: '#264F9C',
    alignSelf: 'center',
    top: -50,
  },
  infoArea: {
    width: '100%',
    paddingHorizontal: 20,
    top: -40,
  },
  subtitleArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#09142c",
    marginLeft: 8,
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
    paddingLeft: 10,
    color: "#1C305C",
  },
})




