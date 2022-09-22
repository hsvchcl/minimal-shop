import { Card, Grid, Text } from '@geist-ui/core'
import { onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { AddUserForm } from '../components/productAdmin/AddProductForm'
import { getRegisterProducts } from '../components/productAdmin/products.service'
import { ProductTable } from '../components/productAdmin/ProductTable'
import { productActions } from '../redux/productSlice'
import { store } from '../redux/store'

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

export const ProductAdminSection = () => {
  useEffect(() => {
    loadProductData()
  },[])

  return (
    <Grid.Container gap={2} alignItems="baseline">
      <Grid md={6}>
        <Card id="card_new" shadow width="100%">
          <Text h3 my={0}>
            Agregar nuevo
          </Text>
          <Text>Ingresa un nuevo producto</Text>
          <AddUserForm />
        </Card>
      </Grid>
      <Grid md={18}>
        <Card id="card_new" shadow width="100%">
          <Text h3 my={0}>
            Productos publicados
          </Text>
          <Text>Todos los productos que tienes en stock</Text>
          <ProductTable />
        </Card>
      </Grid>
    </Grid.Container>
  )
}
