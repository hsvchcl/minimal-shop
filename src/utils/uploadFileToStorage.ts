import { ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase/firebase.config'

export const uploadFileToStorage = (fileArray: []) => {
  try {
    for (const file of fileArray) {
      const storageRef = ref(storage, `/files/${Date.now()}`)
      return uploadBytesResumable(storageRef, file)
    }
  } catch (error) {
    console.error(error)
  }
}
