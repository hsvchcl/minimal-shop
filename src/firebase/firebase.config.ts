import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  //   signInWithEmailAndPassword,
  //   createUserWithEmailAndPassword,
  //   sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore'
import { firebaseConfig } from './firebase.credentials'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const queryUsers = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(queryUsers)
    if (!docs.docs.length) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      })
    }
    return user;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
      alert(err.message)
    }
  }
}

export const logout = () => {
  signOut(auth)
}
