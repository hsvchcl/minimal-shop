import { IProduct } from '../../interface/Product.interface'
import { db } from '../../firebase/firebase.config'
import { addDoc, collection, doc, orderBy, query, updateDoc, deleteDoc } from 'firebase/firestore'

export const addNewProduct = (product: IProduct) => {
  console.log(product)
  try {
    product = { ...product, created: Date.now() }
    return addDoc(collection(db, 'products'), product)
  } catch (error) {
    console.error(error)
  }
}

export const getRegisterProducts = (): any => {
  try {
    return query(collection(db, 'products'), orderBy('created', 'asc'))
  } catch (error) {
    console.error(error)
  }
}

export const editProduct = (updateData: IProduct | any) => {
  try {
    const postDocRef = doc(db, 'products', updateData.fid)
    return updateDoc(postDocRef, updateData)
  } catch (error) {
    console.error(error)
  }
}

export const deleteProduct = (productID: string) => {
  try {
    const postDocRef = doc(db, 'products', productID)
    return deleteDoc(postDocRef)
  } catch (error) {
    console.error(error)
  }
}
