import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase-config';


onAuthStateChanged(auth, user => {
  if (user != null) {
    // console.log('We are authenticated now!');
  }
  // Do other things
});

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw error = 'Email já cadastrado.'
    } else {
      console.log(`ERRO => Mensagem: ${error.code}`);
    }
  }
}

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(`Logged in with: ${email}`);
    // console.log(userCredential.user.stsTokenManager.accessToken);
    return userCredential.user.stsTokenManager.accessToken;
  }
  catch (error) {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      throw error = 'Usuário e/ou senha incorreto(s).';
    } else if (error.code === 'auth/too-many-requests') {
      throw error = 'Muitas requisições!';
    } else {
      throw error = error.code;
    }
  }
}

export const resetPasswordUser = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error.code == 'auth/user-not-found') {
      throw 'Usuário não encontrado.';
    }
  }
}

export const logout = async () => {
  console.log(`User logout`);
  await signOut(auth);
}
