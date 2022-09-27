import { Card, Grid, Text } from '@geist-ui/core'
import { AddUserForm } from '../components/productAdmin/addProduct/AddProductForm'

export const NewAdminSection = () => {
  return (
    <Grid.Container gap={2} alignItems='baseline'>
      <Grid md={12} xs={24}>
        <Card id='card_new' width='100%'>
          <Text h3 my={0}>
            Añadir Nuevo
          </Text>
          <Text>Ingresa un nuevo articulo para publicarlo en tu Wall</Text>
          <AddUserForm />
        </Card>
      </Grid>
    </Grid.Container>
  )
}
