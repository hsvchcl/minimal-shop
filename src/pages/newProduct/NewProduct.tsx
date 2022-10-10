import './newProduct.css'
import { Card, Grid, Text, Spacer } from '@geist-ui/core'
import { useState } from 'react'
import { AddUserForm } from '../../components/productAdmin/addProduct/AddProductForm'
import { ProductResume } from '../../components/productAdmin/addProduct/productResume/ProductResume'
import { IProduct, IProductImages } from '../../interface/Product.interface'

export const NewAdminSection = () => {
  const [images, setImages] = useState<IProductImages[]>([])
  const [product, setProduct] = useState<IProduct>({
    id: '',
    productName: '',
    productDescription: '',
    productPrice: 0,
    productImageUrl: '',
    stock: 0,
    images: [],
  })
  return (
    <Grid.Container gap={2} alignItems='baseline'>
      <Grid md={12} xs={24}>
        <Card id='card_new' width='100%'>
          <Text h3 my={0}>
            Añadir Nuevo
          </Text>
          <Text small>Ingresa un nuevo articulo para publicarlo en tu Wall</Text>
          <AddUserForm
            product={product}
            setProduct={setProduct}
            images={images}
            setImages={setImages}
          />
        </Card>
      </Grid>
      {product.productName && (
        <Grid md={12} xs={24} className='animate'>
          <Card id='card_new' width='100%' className='enter-animation'>
            <Text h3 my={0}>
              Resumen
            </Text>
            <Text small>Asi se vera el producto publicado</Text>
            <Spacer h={2} />
            <ProductResume product={product} images={images} />
          </Card>
        </Grid>
      )}
    </Grid.Container>
  )
}
