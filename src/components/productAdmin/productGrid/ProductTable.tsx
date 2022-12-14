import './productTable.css'
import { Table, Image, Button, useToasts, Popover, Text } from '@geist-ui/core'
import { useSelector } from 'react-redux'
import { IProduct, IProductImages } from '../../../interface/Product.interface'
import { RootState } from '../../../redux/store'
import { priceFormat } from '../../../utils/priceFormat'
import { format } from 'date-fns'
import { ProductEdit } from '../../modals/ProductEdit'
import { useState } from 'react'
import { deleteProduct } from '../products.service'
import { Edit, MoreVertical, Trash } from '@geist-ui/icons'
import notFound from '../../../assets/notFound2.svg'
import notImageProduct from '../../../assets/DefaultProductImage.svg'

const NoData = () => {
  return (
    <div className='no-data--container'>
      <Image src={notFound} height={10} margin={2} />
      <Text>Ningún artículo registrado</Text>
    </div>
  )
}

export const ProductTable = () => {
  const { setToast } = useToasts()
  const [openModal, setOpenModal] = useState(false)
  const [product, setProduct] = useState<IProduct>({})

  const products = useSelector((state: RootState): IProduct[] => state.productReducer)

  const priceWithFormat = (value: any) => {
    return <>{priceFormat(value)}</>
  }

  const dateFormatter = (value: any) => {
    return <>{format(new Date(value), 'dd/MM/yyyy')}</>
  }

  const productImageRender = (value: IProductImages[]) => {
    return <Image src={value[0].imageURL || notImageProduct} height={4} margin={1} />
  }

  const actionButton = (_value: string, rowData: any) => {
    const content = () => (
      <>
        <Popover.Item>
          <Button
            auto
            icon={<Edit />}
            type='abort'
            onClick={() => {
              openModalEdit(rowData)
            }}
          >
            Editar
          </Button>
        </Popover.Item>
        <Popover.Item>
          <Button
            auto
            icon={<Trash />}
            type='abort'
            onClick={() => {
              deleteSelectedProduct(rowData)
            }}
          >
            Eliminar
          </Button>
        </Popover.Item>
      </>
    )

    return (
      <Popover content={content} leaveDelay={0} placement='right'>
        <MoreVertical cursor={'pointer'} />
      </Popover>
    )
  }

  const openModalEdit = (rowData: any) => {
    setProduct(rowData)
    setOpenModal(true)
  }

  const deleteSelectedProduct = (rowData: IProduct) => {
    deleteProduct(rowData.fid!)
    openToast(`${rowData.productName} fue eliminado correctamente`, 'success')
  }

  const openToast = (text: string, type: any) => {
    setToast({
      text: text,
      type: type,
      delay: 2000,
    })
  }

  return (
    <>
      {products.length ? (
        <>
          <Table data={products}>
            <Table.Column prop='images' label='Ref' render={productImageRender} />
            <Table.Column prop='stock' label='Stock' />
            <Table.Column prop='productName' label='Producto' />
            <Table.Column prop='productDescription' label='Descripción' width={350} />
            <Table.Column prop='productPrice' label='Precio' render={priceWithFormat} />
            <Table.Column prop='created' label='Fecha Ingreso' render={dateFormatter} />
            <Table.Column prop='action' label='action' render={actionButton} />
          </Table>
          <ProductEdit openModal={openModal} setOpenModal={setOpenModal} product={product} />
        </>
      ) : (
        <NoData />
      )}
    </>
  )
}
