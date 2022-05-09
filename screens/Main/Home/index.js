import { StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../contexts/UserContext';
import { getVideosByDescDate } from '../../../db/Firestore';
import CardVideo from '../../../components/Video/CardVideo';

const Home = () => {
  const { state: user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getRecentsVideos = async () => {
    setLoading(true);
    setList([]);

    let videos = await getVideosByDescDate();
    if (videos) {
      setList(videos);
    }
    setLoading(false);
  }

  useEffect(() => {
    getRecentsVideos();
  }, []);
  

  const onRefresh = () => {
    setRefreshing(false);
    getRecentsVideos()
  }

  return (
    <View >
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <View style={styles.listArea}>
        {list.map((value, key) => (
          <CardVideo key={key} data={value} />
        ))}
        {loading ??
          <ActivityIndicator size="large" color='#09142c'></ActivityIndicator>
        }
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  listArea: {
    marginHorizontal: 15,
    marginVertical: 20,
  }
})
