import { StyleSheet, Text, View } from 'react-native'
import React, { useContext} from 'react'
import { UserContext } from '../../contexts/UserContext';

const Home = () => {
  const { state: user } = useContext(UserContext);
  return (
    <View>
      <Text>{user.id}</Text>
      <Text>{user.fullname}</Text>
      <Text>{user.email}</Text>
      <Text>{user.avatar}</Text>
      <Text>{user.course}</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
