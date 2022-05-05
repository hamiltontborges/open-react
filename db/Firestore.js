import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where
} from 'firebase/firestore';

export const siginGoogle = async (email, name, pictureLink ) => {
  
  const querySnapshot = await getDocByEmail(email);
  if (querySnapshot.empty) {
    signUp(email, name, pictureLink,Timestamp.fromDate(new Date()));
  } else {
    querySnapshot.forEach((docu) => {
      signIn(docu.id);
    })
  }
}

export const signIn = async (id) => {
  await updateDoc(doc(db, "users", id), { last_signin: Timestamp.fromDate(new Date()) });
}

export const signUp = async (email, name='', pictureLink='',last_signin='') => {
  const docRef = await addDoc(collection(db, 'users'), {
    email: email,
    full_name: name,
    picture: pictureLink,
    date_register: Timestamp.fromDate(new Date()),
    course: '',
    birth_date: '',
    last_signin: last_signin,
  });
  console.log(docRef.id);
  return docRef.id;
}

export const getDocByEmail = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
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

export const checkToken = async () => {
  
}
