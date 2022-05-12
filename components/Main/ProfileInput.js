import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';


const ProfileInput = ({ editable = true, name, value, placeholder, icon, onChangeText}) => {
  return (
    <View>
      <View style={styles.inputArea}>
        {icon}
        <TextInput
          editable={editable}
          name={name}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          placeholderTextColor="#7E7E7E"
          selectionColor={'#09142c'}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  )
}

export default ProfileInput

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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#09142c',
  },
  input: {
    width: '100%',
    height: 50,
    textAlign: 'center',
  }

})