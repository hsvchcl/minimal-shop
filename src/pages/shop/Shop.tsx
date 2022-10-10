import './shop.style.css'
import { Badge, Card, Grid, Page, Spacer, Text, Image, Loading } from '@geist-ui/core'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProduct } from '../../interface/Product.interface'
import { priceFormat } from '../../utils/priceFormat'
import { getShopProducts } from './shop.hooks'
import logoShop from '../../assets/logo.svg'
import notFound from '../../assets/not_found.svg'
import defaultImage from '../../assets/DefaultProductImage.svg'

const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <div className='loading-container'>
        <Image src={logoShop} height={5} />
        <Loading type='warning'></Loading>
      </div>
    </div>
  )
}

const NoProductFound = () => {
  return (
    <div className='not-found-container'>
      <Image src={notFound} height={5}></Image>
      <h2>Ohh no!</h2>
      <p>Ningun producto para desplegar</p>
    </div>
  )
}

const ProductGrid = (props: {
  shopID: string
  loading: boolean
  setLoading: (status: boolean) => void
}) => {
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    document.title = 'Wall Shop'
    const query = getShopProducts(String(props.shopID))
    onSnapshot(query, (querySnapshot: any) => {
      setProducts(
        querySnapshot.docs
          .map((doc: any) => ({
            id: doc.id,
            data: doc.data(),
          }))
          .map((prod: any) => prod.data),
      )
      props.setLoading(false)
    })
  }, [])
  return (
    <>
      <Grid.Container gap={2} justify='flex-start'>
        {products.length
          ? products.map((product, idx) => (
              <Grid xs={6} key={idx}>
                <Card width='100%'>
                  <Image
                    src={product.productImageUrl || defaultImage}
                    height='200px'
                    width='400px'
                    draggable={false}
                  />
                  <Text h4 my={0}>
                    {product.productName}
                  </Text>
                  <Text>{product.productDescription}</Text>
                  <Badge type='success'>{priceFormat(product.productPrice || 0)}</Badge>{' '}
                  <Spacer h={0.5} />
                  <Card.Footer></Card.Footer>
                </Card>
              </Grid>
            ))
          : !props.loading && <NoProductFound />}
      </Grid.Container>
    </>
  )
}

export const Shop = () => {
  const [loading, setLoading] = useState(true)
  const { shopID } = useParams()

  return (
    <>
      {loading && <LoadingPage />}
      <Page hidden={loading}>
        <ProductGrid shopID={shopID || ''} loading={loading} setLoading={setLoading} />
      </Page>
    </>
  )
}
