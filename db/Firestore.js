import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

const usersCollection = collection(db, "users");
const videosCollection = collection(db, "videos");

export const siginGoogle = async (email, name, pictureLink) => {

  const querySnapshot = await getDocByEmail(email);
  if (querySnapshot.empty) {
    signUp(email, name, pictureLink, Timestamp.fromDate(new Date()));
  } else {
    querySnapshot.forEach((docu) => {
      signIn(docu.id);
    })
  }
}

export const signIn = async (id) => {
  await updateDoc(doc(db, "users", id), { last_signin: Timestamp.fromDate(new Date()) });
}

export const updateUser = async (id, name, avatar, course, birth, perfil) => {
  await updateDoc(doc(db, "users", id), { 
    full_name: name,
    picture: avatar,
    course: course,
    birth_date: birth,
    perfil: perfil,
    date_update: Timestamp.fromDate(new Date()),
  });
}

export const signUp = async (email, name = '', pictureLink = '', last_signin = '', perfil='') => {
  const docRef = await addDoc(usersCollection, {
    email: email,
    full_name: name,
    picture: pictureLink,
    date_register: Timestamp.fromDate(new Date()),
    course: '',
    birth_date: '',
    last_signin: last_signin,
    perfil: perfil,
  });
  console.log(docRef.id);
  return docRef.id;
}

export const getDocByEmail = async (email) => {
  const q = query(usersCollection, where("email", "==", email));
  return await getDocs(q);
}

export const getDocById = async (id) => {
  const docSnap = await getDoc(doc(db, "user", id));
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export const getVideosByDescDate = async () => {
  let videos = []
  const docSnap = query(videosCollection, orderBy("date_posted", "desc"));
  const resultado = await getDocs(docSnap);
  resultado.forEach((docu) => {
    const data = docu.data();
    videos.push(data)
  })
  return videos;
}

export const getVideosBySearch = async (word) => {
  let videos = []
  const docSnap = query(videosCollection, where("name", "==", word));
  const resultado = await getDocs(docSnap);
  resultado.forEach((docu) => {
    const data = docu.data();
    videos.push(data)
  })
  return videos;
}

export const postVideo = async (user, id_video_yt, name, description, thumb, tags=[], date_posted_yt) => {
  try{
    const docRef = await addDoc(videosCollection, {
      user: {
        id: user.id,
        name: user.fullname,
        avatar: user.avatar,
        email: user.email,
      },
      id_video_yt: id_video_yt,
      name: name,
      description: description,
      thumb: thumb,
      tags: tags,
      date_posted_yt: date_posted_yt,
      date_posted: new Date(),
    });
    console.log(docRef.id);
    return docRef.id;
  } catch (erro) {
    throw 'Algo deu errado'
  }

}

export const getVideoByIdYT = async (id_video_yt) => {
  const q = query(videosCollection, where("id_video_yt", "==", id_video_yt));
  return await getDocs(q);
}
