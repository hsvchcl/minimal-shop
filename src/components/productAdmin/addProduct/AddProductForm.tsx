import './addProductForm.css'
import { Button, Input, Spacer, useToasts, Text, Textarea, Progress } from '@geist-ui/core'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { IProduct, IProductImages } from '../../../interface/Product.interface'
import { getUserLoggedInfo } from '../../../utils/userInfo'
import { addNewProduct } from '../products.service'
import { uploadFileToStorage } from '../../../utils/uploadFileToStorage'
import { getDownloadURL } from 'firebase/storage'
import { UploadThumbs } from './uploadThumbs/UploadThumbs'
import { FilePlus } from '@geist-ui/icons'

export const AddUserForm = (props: {
  product: IProduct
  setProduct: (producto: IProduct) => void
  images: IProductImages[]
  setImages: (images: IProductImages[]) => void
}) => {
  const [loading, setLoading] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [percent, setPercent] = useState(0.0)

  const [loadImage, setLoadImage] = useState(true)
  const { setToast } = useToasts()

  useEffect(() => {
    const { productName, productPrice, stock } = props.product
    if (
      productName &&
      productName.length > 3 &&
      String(productPrice).length > 0 &&
      String(stock).length > 0
    ) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [props.product])

  const handlerform = async (e: any) => {
    props.setProduct({ ...props.product, id: uuid(), [e.target.name]: e.target.value })
  }

  const handlerFile = (event: any) => {
    const files = event.target.files
    uploadFile(files)
  }

  const uploadFile = (files: []) => {
    if (props.images.length <= 4) {
      const uploadTask = uploadFileToStorage(files)
      uploadTask?.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

          setLoadImage(false)
          // update progress
          setPercent(percent)
        },
        (err) => console.log(err),
        () => {
          setLoadImage(true)
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url)
            const imageObject = {
              imageURL: url,
              imageRef: uploadTask.snapshot.ref,
            }
            props.setImages([...props.images, imageObject])
          })
        },
      )
    } else {
      setToast({
        text: 'No puede subir mas de 5 imágenes por producto',
        type: 'error',
        delay: 3000,
      })
    }
  }

  const saveProduct = async () => {
    try {
      const productInfo = getUserLoggedInfo()
      setLoading(true)
      await addNewProduct({
        ...props.product,
        productImageUrl: '',
        productDescription: 'Producto sin descripción',
        shopUID: productInfo.shopUID,
        images: props.images.map((el: IProductImages) => ({
          ...el,
          imageRef: JSON.stringify(el.imageRef),
        })),
      })
      setLoading(false)
      setToast({
        text: `${props.product.productName!.toLocaleUpperCase()} has saved!`,
        type: 'success',
        delay: 2000,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        setLoading(false)
        setToast({
          text: `Ocurrió un error: ${error.message}`,
          type: 'error',
          delay: 2000,
        })
      }
    }
  }

  return (
    <div>
      <Spacer h={1.5} />
      <Input
        width='100%'
        name='productName'
        clearable
        placeholder='iPhone'
        onChange={handlerform}
        scale={4 / 3}
      >
        <Text small>Nombre</Text>
      </Input>
      <Spacer h={1} />
      <Input
        htmlType='number'
        name='productPrice'
        clearable
        placeholder='1000'
        onChange={handlerform}
        scale={4 / 3}
        width={'100%'}
        min={1}
      >
        <Text small>Precio</Text>
      </Input>
      <Spacer h={1} />
      <Input
        htmlType='number'
        name='stock'
        clearable
        placeholder='12'
        onChange={handlerform}
        scale={4 / 3}
        width={'100%'}
        min={1}
      >
        <Text small>Stock</Text>
      </Input>
      <Spacer h={1} />
      <Text small>Descripción</Text>
      <Spacer h={0.5} />
      <Textarea
        name='productDescription'
        placeholder='El mejor producto...'
        onChange={handlerform}
        scale={4 / 3}
        width={'100%'}
      />

      <UploadThumbs images={props.images} setImages={props.setImages} />
      <Spacer h={1.5} />

      <label htmlFor='files'>
        <div className='upload-card'>
          <FilePlus cursor={'pointer'} />
          <Text>
            Agregar imágenes
            {props.images.length > 0 && ': ' + props.images.length + ' de 5'}
          </Text>
        </div>
        <input
          accept='image/*'
          type='file'
          id='files'
          style={{ display: 'none' }}
          onChange={handlerFile}
        />
      </label>
      <Spacer h={1} />
      <div hidden={loadImage}>
        <Progress value={percent} />
      </div>

      <Spacer h={2} />
      <Button
        width={'100%'}
        disabled={!validForm}
        loading={loading}
        type='secondary'
        onClick={() => saveProduct()}
        style={{ textTransform: 'uppercase' }}
      >
        Guardar
      </Button>
    </div>
  )
}
