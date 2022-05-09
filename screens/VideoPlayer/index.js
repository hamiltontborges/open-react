import { StyleSheet, Text, View, Alert, ScrollView, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import React, { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { firstLetter, formatDate } from '../../regex/functionsRegex';

const VideoPlayer = ({ route }) => {
  const [playing, setPlaying] = useState(false);
  const tags = route.params.paramKey.tags;

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
      <View style={styles.container}>
        <YoutubePlayer
          height={190}
          play={playing}
          videoId={route.params.paramKey.id_video_yt}
          onChangeState={onStateChange}
        />
        <Text style={styles.title}>{route.params.paramKey.name}</Text>
        <Text style={styles.datePosted}>Postado em {formatDate(route.params.paramKey.date_posted.toDate().toLocaleString())}</Text>
        <View style={styles.areaText}>
          <View style={styles.userArea}>

            {route.params.paramKey.user.avatar !== ''
              ? <Image style={styles.userAvatar} source={{ uri: route.params.paramKey.user.avatar }} />
              : <Avatar.Text size={40} label={firstLetter(route.params.paramKey.user.name)} color={'white'} style={{ backgroundColor: '#264F9C' }} />
            }
            <Text style={styles.userName}>
              {route.params.paramKey.user.name}
            </Text>
          </View>
          <View >
            <View>
              <Text style={styles.tagTitle}>Tags:</Text>
              <View style={styles.tagArea}>
                {tags.map((value, key) => (
                  <Text key={key} style={styles.tags}> {value} </Text>
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.descriptionTitle}>Descrição:</Text>
          <Text>{route.params.paramKey.description}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default VideoPlayer

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  areaText: {
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  userArea: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: 'bold',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#264F9C',
  },
  datePosted: {
    fontSize: 13,
    marginTop: 5,
  },
  tagTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  tagArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tags: {
    backgroundColor: '#DBDBDB',
    fontSize: 10,
    color: 'black',
    borderRadius: 10,
    margin: 1.5,
    padding: 1,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  }
})