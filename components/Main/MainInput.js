import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import React from 'react'

const MainInput = ({ nameInput, label, placeholder, onChangeText, multiline = false, numberOfLines = 1 }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        name={nameInput}
        label={label}
        placeholder={placeholder}
        onChangeText={onChangeText}
        mode={'outlined'}
        multiline={multiline}
        numberOfLines={numberOfLines}
        outlineColor={'#1d3468'}
        activeOutlineColor={'#1d3468'}
      />
    </View>
  )
}

export default MainInput

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  }
})