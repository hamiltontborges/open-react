import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ nameInput, iconName, placeholder, value, onChangeText, onBlur, keyboardType, password, hasError, messageError }) => {
  return (
    <>
      <View style={[styles.inputArea, hasError ? styles.error : '']}>
        <MaterialIcons name={iconName} size={24} color="#353535" />
        <TextInput
          name={nameInput}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          keyboardType={keyboardType}
          secureTextEntry={password}
          placeholderTextColor="#7E7E7E"
          selectionColor={'#09142c'}
        />
      </View>
      {hasError ? <Text style={styles.messageErrorText}>{messageError}</Text> : <></>}
    </>
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
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  messageErrorText: {
    color: 'red',
  }
});