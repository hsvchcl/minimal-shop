import { Card, Grid, Text } from '@geist-ui/core'
import { ProductTable } from '../components/productAdmin/productGrid/ProductTable'

export const ProductAdminSection = () => {
  return (
    <Grid.Container gap={2} alignItems="baseline">
      <Grid md={24}>
        <Card id="card_new" shadow width="100%">
          <Text h3 my={0}>
            Artículos publicados
          </Text>
          <Text>Estos son todos los productos que tienes publicados en tu Wall</Text>
          <ProductTable />
        </Card>
      </Grid>
    </Grid.Container>
  )
}
