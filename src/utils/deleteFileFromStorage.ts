import { deleteObject, StorageReference } from 'firebase/storage'

export const deleteFileFromStorage = (imageReference: StorageReference) => {
  try {
    // Delete the file
    return deleteObject(imageReference)
  } catch (error) {
    console.error(error)
  }
}
