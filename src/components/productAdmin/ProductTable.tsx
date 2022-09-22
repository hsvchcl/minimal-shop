import { Table, Image, Button, ButtonGroup } from '@geist-ui/core'
import { useSelector } from 'react-redux'
import { IProduct } from '../../interface/Product.interface'
import { RootState } from '../../redux/store'
import { priceFormat } from '../../utils/priceFormat'
import { format } from 'date-fns'

export const ProductTable = () => {
  const products = useSelector(
    (state: RootState): IProduct[] => state.productReducer,
  )

  const priceWithFormat = (value: any, rowData: any, rowIndex: number) => {
    return <>{priceFormat(value)}</>
  }

  const dateFormatter = (value: any, rowData: any, rowIndex: number) => {
    return <>{format(new Date(value), 'dd/MM/yyyy')}</>
  }

  const productImageRender = (value: string) => {
    return <Image src={value} height={4} margin={1} />
  }

  const actionButton = () => {
    return (
      <>
        <ButtonGroup>
          <Button scale={0.5}>edit</Button>
          <Button scale={0.5}>Delete</Button>
        </ButtonGroup>{' '}
      </>
    )
  }

  return (
    <Table data={products}>
      <Table.Column
        prop="productImageUrl"
        label="Ref"
        render={productImageRender}
      />
      <Table.Column prop="productName" label="Producto" />
      <Table.Column prop="productDescription" label="Descripción" width={350} />
      <Table.Column
        prop="productPrice"
        label="Precio"
        render={priceWithFormat}
      />
      <Table.Column
        prop="created"
        label="Fecha Ingreso"
        render={dateFormatter}
      />
      <Table.Column prop="action" label="action" render={actionButton} />
    </Table>
  )
}
