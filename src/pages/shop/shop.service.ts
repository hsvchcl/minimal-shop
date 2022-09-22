import { db } from '../../firebase/firebase.config'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

export const getShopProducts = (shopUID: string) => {
  try {
    const queryUsers = query(
      collection(db, 'products'),
      where('shopUID', '==', shopUID),
      orderBy('created', 'desc'),
    )
    return getDocs(queryUsers)
  } catch (error) {}
}
