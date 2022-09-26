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

export const AddUserForm = () => {
  const [product, setProduct] = useState<IProduct>({
    id: '',
    files: [],
    productName: '',
    productDescription: '',
    productPrice: 0,
    productImageUrl: '',
    stock: 0,
  })
  const [loading, setLoading] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [percent, setPercent] = useState(0.0)
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

        // update progress
        setPercent(percent)
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url)
        })
      },
    )
  }

  const saveProduct = async () => {
    try {
      const productInfo = getUserLoggedInfo()
      setLoading(true)
      let images = await searchImage(product.productName!)
      images = images ? images : [{ image: '', source: '' }]

      const { image, source } = images[0] || [{ image: '', source: '' }]

      await addNewProduct({
        ...product,
        productImageUrl: image?.url || '',
        productDescription: source.title || 'Producto sin descripción',
        shopUID: productInfo.shopUID,
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
      <Progress value={percent} />
      <label htmlFor="files">SelFoto</label>
      <Input
        htmlType="file"
        width="100%"
        name="productName"
        clearable
        placeholder="iPhone"
        onChange={handlerFile}
        scale={4 / 3}
      />
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
      <Textarea
        name="productDescription"
        placeholder="Descripción"
        onChange={handlerform}
        scale={4 / 3}
        width={'100%'}
      />
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
