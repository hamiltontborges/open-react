import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { UserContext } from '../../../contexts/UserContext';
import { formatDate, getVideoId } from '../../../regex/functionsRegex';

import MainInput from '../../../components/Main/MainInput';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import SignButton from '../../../components/Sign/SignButton';
import { postVideo } from '../../../db/Firestore';


const VideoUpload = () => {
  const [foundVideo, setFoundVideo] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoName, setVideoName] = useState('');
  const [videoMessageNotFound, setVideoMessageNotFound] = useState('');
  const [videoThumb, setVideoThumb] = useState('');
  const [videoDatePosted, setVideoDatePosted] = useState('');
  const [videoTags, setVideoTags] = useState([]);
  const [link, setLink] = useState('');

  const { state: user } = useContext(UserContext);

  const [snackBarInfo, setSnackBarInfo] = useState({ visible: false, color: '', message: '' });

  const navigation = useNavigation();

  const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/`;
  const YOUTUBE_VIDEO_SNIPPET = 'videos?part=snippet&id=';
  const YOUTUBE_API_KEY = '&key=AIzaSyBY9wEqHVS1DG6IRgwvck9vA_GDZj-vXk8'

  const getInfoVideo = async (idVideo) => {

    const res = await fetch(`${YOUTUBE_API}${YOUTUBE_VIDEO_SNIPPET}${idVideo}${YOUTUBE_API_KEY}`);
    const data = await res.json();
    const video = data.items[0]
    if (video) {
      console.log(video)
      setVideoThumb(video.snippet.thumbnails.high.url)
      setVideoName(video.snippet.title)
      setVideoDesc(video.snippet.description)
      setVideoDatePosted(video.snippet.publishedAt)
      setVideoTags(video.snippet.tags)
      setFoundVideo(true)
    }
    else {
      setFoundVideo(false);
      setVideoMessageNotFound('Nenhum vídeo encontrado');
    }
  }

  const showForm = (link) => {
    let id = getVideoId(link);
    setVideoId(id);
    getInfoVideo(id);
    setLink(link)
  }

  const submitVideo = async () => {
    try{
      await postVideo(user, videoId, videoName, videoDesc, videoThumb, videoTags, videoDatePosted)
          setSnackBarInfo({ visible: true, color: 'green', message: 'Vídeo postado com sucesso!' });
          setFoundVideo(false);
          setLink('');
          setTimeout(() => navigation.replace('Drawer'), 1000);
    }
    catch {
      setSnackBarInfo({ visible: true, color: 'red', message: 'Algo deu errado!' });
    }
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Postar vídeo</Text>
        <MainInput
          nameInput={'link'}
          label={'Link do vídeo do Youtube'}
          placeholder={'Cole o link aqui'}
          value={link}
          onChangeText={(link) => {
            showForm(link)
          }}
        />
        {foundVideo
          ?
          <View>
            <Text style={styles.info}>Informações do Vídeo</Text>
            <Image style={styles.thumb} source={{ uri: videoThumb }} />
            <Text style={styles.subtitle}>Data de postagem no Youtube:</Text>
            <Text style={styles.text}>{formatDate(videoDatePosted)}</Text>
            <Text style={styles.subtitle}>Nome do Vídeo:</Text>
            <Text style={styles.text}>{videoName}</Text>
            <Text style={styles.subtitle}>Descrição: </Text>
            <Text style={styles.text}>{videoDesc}</Text>
            <View style={styles.buttonArea}>
              <SignButton
                style={styles.button}
                onPress={() => {
                  submitVideo();
                }}
                iconName={'send'}
                text={'POSTAR'}
              />
            </View>
          </View>
          :
          link !== ''
            ?
            <View style={styles.areaNotFoundMsg}>
              <Text style={styles.notFoundMsg}>{videoMessageNotFound}</Text>
              <Text>Verifique se digitou o link corretamente.</Text>
            </View>
            :
            <View></View>
        }
      </View>


      <Snackbar
        wrapperStyle={{ top: 0 }}
        visible={snackBarInfo.visible}
        duration={5000}
        style={{ backgroundColor: snackBarInfo.color }}
        onDismiss={() => setSnackBarInfo({ visible: false })}
      >
        {snackBarInfo.message}
      </Snackbar>

    </ScrollView>
  )
}

export default VideoUpload

const styles = StyleSheet.create({
  title: {
    color: '#1d3468',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 20,
    width: '90%',
  },
  info: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  thumb: {
    alignSelf: 'center',
    width: 250,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 13,
    marginBottom: 10,
  },
  areaNotFoundMsg: {
    alignItems: 'center',
  },
  notFoundMsg: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  buttonArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  }
})