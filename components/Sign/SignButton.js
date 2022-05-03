import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ title, onPress, iconName, text, disabled }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        title={title}
        onPress={onPress}
        style={styles.button}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{text}</Text>
        <MaterialIcons name={iconName} size={24} color="#1d3468" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
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