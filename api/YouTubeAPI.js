import React from 'react';

const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/`;
const YOUTUBE_VIDEO_SNIPPET = 'videos?part=snippet&id=';
const YOUTUBE_API_KEY = '&key=AIzaSyBY9wEqHVS1DG6IRgwvck9vA_GDZj-vXk8'

export const getInfoVideoYoutube = async (idVideo) => {
  const url = `${YOUTUBE_API}${YOUTUBE_VIDEO_SNIPPET}${idVideo}${YOUTUBE_API_KEY}`
  const res = await fetch(url);
  const data = await res.json();
  const videoData = data.items[0]
  return videoData
}