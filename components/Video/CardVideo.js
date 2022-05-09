import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import { firstLetter, formatDate } from '../../regex/functionsRegex'

const CardVideo = ({ data }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity 
    onPress={() => {navigation.navigate('VideoPlayer', {
      paramKey: data,
    })}}
    style={styles.cardArea}
    >
      <Image style={styles.thumb} source={{ uri: data.thumb }} />
      <View style={styles.infoArea}>
        <Text numberOfLines={3} ellipsizeMode='tail' style={styles.nameVideo}>
          {data.name}
        </Text>
        <View>
          <View style={styles.userArea}>
            {data.user.avatar !== ''
              ? <Image style={styles.userAvatar} source={{ uri: data.user.avatar }} />
              : <Avatar.Text size={15} label={firstLetter(data.user.name)} color={'white'} style={{ backgroundColor: '#264F9C' }} />
            }
            <Text style={styles.userName}>
              {data.user.name}
            </Text>
          </View>
          <Text style={styles.date}>
            Postado em {formatDate(data.date_posted.toDate().toLocaleString())}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CardVideo

const styles = StyleSheet.create({
  cardArea: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  thumb: {
    width: '40%',
    height: 80,
    borderRadius: 10,
  },
  infoArea: {
    width: '60%',
    height: 80,
    marginLeft: 7,
    justifyContent: 'flex-end',
  },
  nameVideo: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  date: {
    fontSize: 10,
  },
  userArea: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  userName: {
    marginLeft: 3,
    fontSize: 10,
  },
  userAvatar: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#264F9C',
  }
})