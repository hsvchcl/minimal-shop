import { Card, Grid, Text } from '@geist-ui/core'
import { AddUserForm } from '../components/users/AddUserForm'
import { ListProducts } from '../components/users/ListUser'

export const ProductAdminSection = () => {
  return (
    <Grid.Container gap={2} justify="flex-start" alignItems="flex-start">
      <Grid xs={12}>
        <Card id="card_new" shadow width="100%">
          <Text h2 my={0}>
            Add new
          </Text>
          <Text>Add new product to catalog</Text>
          <AddUserForm />
        </Card>
      </Grid>
      <Grid xs={12}>
        <ListProducts />
      </Grid>
    </Grid.Container>
  )
}
