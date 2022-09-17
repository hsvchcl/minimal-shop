export interface IProduct {
  id?: string
  productName?: string
  productDescription?: string
  productPrice?: number
  productImageUrl?: string
}

export interface IUser {
  displayName?: string
  email?: string
  photoURL?: string
  uid?: string
}

export interface IModalDisplay {
  modalUserInfo: boolean
  modalEditProduct: boolean
}
