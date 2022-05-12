import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadPhotoStorage = async (userId, avatar) => {
  const reference = ref(storage, `${userId}/avatar.jpg`);
  const img = await fetch(avatar);
  const bytes = await img.blob();
  await uploadBytes(reference, bytes);
}

export const getUrlPhotoStorage = async (userId) => {
  const reference = ref(storage, `${userId}/avatar.jpg`);
  await getDownloadURL(reference).then(item => {
    return item;
  })
}