import { Spacer, Tabs } from '@geist-ui/core'
import { useEffect } from 'react'
import { Header } from '../components/header/Header'
import { ProductAdminSection } from './ProductAdminSection'
import { ShopSection } from './ShopSection'
export const Home = () => {
  useEffect(() => {
    document.title = 'Wall'
  })
  return (
    <>
      <Header />
      <Spacer h={2} />
      <Tabs initialValue="2">
        <Tabs.Item label="My Wall" value="1">
          <Spacer h={2} />
          <ShopSection />
        </Tabs.Item>
        <Tabs.Item label="Product admin" value="2">
          <Spacer h={2} />
          <ProductAdminSection />
        </Tabs.Item>
      </Tabs>
    </>
  )
}
