import { StorageReference } from "firebase/storage";

export interface IProduct {
  fid?: string;
  id?: string;
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  productImageUrl?: string;
  created?: number;
  shopUID?: string;
  stock?: number;
  files?: [];
  images?: IProductImages[] | any[];
}

export interface IUser {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
  shopUID?: string;
}

export interface IModalDisplay {
  modalUserInfo: boolean;
  modalEditProduct: boolean;
}

export interface IProductImages{
  imageURL?: string;
  imageRef?: StorageReference;
}
