import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VideoPlayer = ({route}) => {
  return (
    <View>
      <Text>{route.params.paramKey.name}</Text>
    </View>
  )
}

export default VideoPlayer

const styles = StyleSheet.create({})