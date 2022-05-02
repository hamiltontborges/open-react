import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ iconName, placeholder, value, onChangeText, keyboardType, password }) => {
  return (
    <View style={styles.inputArea}>
      <MaterialIcons name={iconName} size={24} color="#353535" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={password}
        placeholderTextColor="#7E7E7E"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputArea: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#353535',
    marginLeft: 10,
  }
})