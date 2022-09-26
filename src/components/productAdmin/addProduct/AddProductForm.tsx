import './addProductForm.css'
import {
  Button,
  Input,
  Spacer,
  useToasts,
  Text,
  Textarea,
  Progress,
} from '@geist-ui/core'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { IProduct } from '../../../interface/Product.interface'
import { searchImage } from '../../../services/rapidAPI.service'
import { getUserLoggedInfo } from '../../../utils/userInfo'
import { addNewProduct } from '../products.service'
import { uploadFileToStorage } from '../../../utils/uploadFileToStorage'
import { getDownloadURL } from 'firebase/storage'
import { UploadThumbs } from './uploadThumbs/UploadThumbs'
import { FilePlus, Folder } from '@geist-ui/icons'

export const AddUserForm = () => {
  const [product, setProduct] = useState<IProduct>({
    id: '',
    files: [],
    productName: '',
    productDescription: '',
    productPrice: 0,
    productImageUrl: '',
    stock: 0,
    images: [],
  })
  const [loading, setLoading] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [percent, setPercent] = useState(0.0)
  const [images, setImages] = useState<string[]>([])
  const [loadImage, setLoadImage] = useState(true)
  const { setToast } = useToasts()

  useEffect(() => {
    const { productName, productPrice, stock } = product
    if (
      productName?.length! > 3 &&
      String(productPrice).length > 0 &&
      String(stock).length > 0
    ) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [product])

  const handlerform = async (e: any) => {
    setProduct({ ...product, id: uuid(), [e.target.name]: e.target.value })
  }

  const handlerFile = (event: any) => {
    const files = event.target.files
    uploadFile(files)
  }

  const uploadFile = (files: []) => {
    const uploadTask = uploadFileToStorage(files)
    uploadTask?.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )

        setLoadImage(false)
        // update progress
        setPercent(percent)
      },
      (err) => console.log(err),
      () => {
        setLoadImage(true)
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImages([...images, url])
        })
      },
    )
  }

  const saveProduct = async () => {
    try {
      const productInfo = getUserLoggedInfo()
      setLoading(true)
      await addNewProduct({
        ...product,
        productImageUrl: '',
        productDescription: 'Producto sin descripción',
        shopUID: productInfo.shopUID,
        images: images,
      })
      setLoading(false)
      setToast({
        text: `${product.productName!.toLocaleUpperCase()} has saved!`,
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
        width="100%"
        name="productName"
        clearable
        placeholder="iPhone"
        onChange={handlerform}
        scale={4 / 3}
      >
        <Text small>Nombre</Text>
      </Input>
      <Spacer h={1} />
      <Input
        htmlType="number"
        name="productPrice"
        clearable
        placeholder="1000"
        onChange={handlerform}
        scale={4 / 3}
        width={'100%'}
        min={1}
      >
        <Text small>Precio</Text>
      </Input>
      <Spacer h={1} />
      <Input
        htmlType="number"
        name="stock"
        clearable
        placeholder="12"
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
        name="productDescription"
        placeholder="El mejor producto..."
        onChange={handlerform}
        scale={4 / 3}
        width={'100%'}
      />

      <UploadThumbs images={images} />
      <Spacer h={1.5} />

      <label htmlFor="files">
        <div className="upload-card">
          <FilePlus cursor={'pointer'} />
          <Text>Agregar imágenes{images.length > 0 && (': '+images.length+' de 5')}</Text>
        </div>
        <input
          accept="image/*"
          type="file"
          id="files"
          style={{ display: 'none' }}
          onChange={handlerFile}
        />
      </label>
      <div hidden={loadImage}>
        <Progress value={percent} fixedTop />
      </div>

      <Spacer h={2} />
      <Button
        width={'100%'}
        disabled={!validForm}
        loading={loading}
        type="secondary"
        onClick={() => saveProduct()}
        style={{ textTransform: 'uppercase' }}
      >
        Guardar
      </Button>
    </div>
  )
}
