import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({onPress, iconName, text}) => {
  return (
    <TouchableOpacity
          onPress={onPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{text}</Text>
          <MaterialIcons name={iconName} size={24} color="#1d3468" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#e9c915',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#1d3468',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
})