import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase.config'

export const getShopProducts = (shopUID: string): any => {
  try {
    return query(
      collection(db, 'products'),
      where('shopUID', '==', shopUID),
    )
  } catch (error) {
    console.error(error)
  }
}
