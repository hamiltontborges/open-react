import { StyleSheet, View, ActivityIndicator, ScrollView, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getVideosBySearch } from '../../db/Firestore';
import CardVideo from '../../components/Video/CardVideo';


const Search = ({ route }) => {
  let searchText = route.params.paramKey;
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getVideos = async () => {
    setLoading(true);
    setList([]);

    let videos = await getVideosBySearch(searchText);
    if (videos) {
      setList(videos);
    }
    setLoading(false);
  }

  useEffect(() => {
    getVideos();
  }, [searchText]);

  return (
    <View>
      <ScrollView>
        <Text style={styles.areaTitle}>
          <Text>Resultados de </Text>
          <Text style={styles.search}>{searchText}</Text>
        </Text>
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

export default Search

const styles = StyleSheet.create({
  areaTitle: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  search: {
    fontWeight: 'bold'
  },
  listArea: {
    marginHorizontal: 15,
    marginVertical: 20,
  }
})