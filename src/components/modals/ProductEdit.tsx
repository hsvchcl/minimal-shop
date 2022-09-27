import { Modal } from '@geist-ui/core'
import { useEffect, useState } from 'react'
import { IProduct } from '../../interface/Product.interface'
import { EditProductForm } from '../productAdmin/EditProductForm'
import { useDispatch } from 'react-redux'
import { productActions } from '../../redux/productSlice'
import { editProduct } from '../productAdmin/products.service'

export const ProductEdit = (props: any) => {
  const [newEditProduct, setEditProduct] = useState<IProduct>({})
  const dispatch = useDispatch()

  useEffect(() => {
    setEditProduct(props.product)
  }, [props.product])

  const closeHandler = () => {
    props.setOpenModal(false)
  }

  const handlerEditProduct = () => {
    dispatch(productActions.editProduct(newEditProduct))
    editProduct(newEditProduct)
    props.setOpenModal(false)
  }

  return (
    <Modal
      visible={props.openModal}
      disableBackdropClick
      backdropClassName='blur-bg'
      onClose={() => closeHandler}
      width='40rem'
    >
      <Modal.Title>Edición</Modal.Title>
      <Modal.Subtitle>{props.product?.productName}</Modal.Subtitle>
      <Modal.Content>
        <EditProductForm
          product={newEditProduct}
          setEditProduct={setEditProduct}
          newEditProduct={newEditProduct}
        />
      </Modal.Content>
      <Modal.Action passive onClick={() => props.setOpenModal(false)}>
        Cancelar
      </Modal.Action>
      <Modal.Action onClick={() => handlerEditProduct()}>Guardar cambios</Modal.Action>
    </Modal>
  )
}
