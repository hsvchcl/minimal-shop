import ShortUniqueId from 'short-unique-id'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { query, getDocs, collection, where, addDoc, limit } from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase.config'

export const signInWithGoogle = async () => {
  try {
    const shopUID = new ShortUniqueId({ length: 10 })()
    const googleProvider = new GoogleAuthProvider()
    const res: any = await signInWithPopup(auth, googleProvider)
    let user = res.user
    user.shopUID = shopUID

    const queryUsers = query(collection(db, 'users'), where('uid', '==', user.uid), limit(1))

    const docs = await getDocs(queryUsers)
    if (docs.empty) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        shopUID: shopUID,
      })
    } else {
      const { shopUID } = docs.docs.map((element) => element.data())[0]
      user = { ...user, shopUID }
    }
    return user
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
