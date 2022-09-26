import { Spacer, Tabs } from '@geist-ui/core'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Header } from '../components/header/Header'
import { getRegisterProducts } from '../components/productAdmin/products.service'
import { IProduct } from '../interface/Product.interface'
import { productActions } from '../redux/productSlice'
import { RootState, store } from '../redux/store'
import { NewAdminSection } from './newAdminSection'
import { ProductAdminSection } from './ProductAdminSection'
import { ShopSection } from './ShopSection'

const loadProductData = () => {
  const query = getRegisterProducts()
  onSnapshot(query, (querySnapshot: any) => {
    store.dispatch(
      productActions.addProduct(
        querySnapshot.docs.map((doc: any) => ({ ...doc.data(), fid: doc.id })),
      ),
    )
  })
}

export const Home = () => {
  const products = useSelector(
    (state: RootState): IProduct[] => state.productReducer,
  )
  useEffect(() => {
    document.title = 'Wall'
    loadProductData()
  }, [])
  return (
    <>
      <Header />
      <Spacer h={2} />
      <Tabs initialValue="3">
        <Tabs.Item
          label="Wall"
          value="1"
          disabled={products.length ? false : true}
        >
          <Spacer h={2} />
          <ShopSection />
        </Tabs.Item>
        <Tabs.Item label="Nuevo" value="3">
          <Spacer h={2} />
          <NewAdminSection />
        </Tabs.Item>
        <Tabs.Item label="Productos" value="2">
          <Spacer h={2} />
          <ProductAdminSection />
        </Tabs.Item>
      </Tabs>
    </>
  )
}
