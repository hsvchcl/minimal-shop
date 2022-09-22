import { Button, Input, Spacer, useToasts } from '@geist-ui/core'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { IProduct } from '../../interface/Product.interface'
import { searchImage } from '../../services/rapidAPI.service'
import { getUserLoggedInfo } from '../../utils/userInfo'
import { addNewProduct } from './products.service'

export const AddUserForm = () => {
  const [user, setUser] = useState<IProduct>({
    id: '',
    productName: '',
    productDescription: '',
    productPrice: 0,
    productImageUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const { setToast } = useToasts()

  const handlerform = async (e: any) => {
    setUser({ ...user, id: uuid(), [e.target.name]: e.target.value })
  }

  const saveUser = async () => {
    try {
      const userInfo = getUserLoggedInfo()
      setLoading(true)
      const images = await searchImage(user.productName!)
      const { image, source } = images[0]
      await addNewProduct({
        ...user,
        productImageUrl: image.url,
        productDescription: source.title,
        shopUID: userInfo.shopUID,
      })
      setLoading(false)
      setToast({
        text: `${user.productName!.toLocaleUpperCase()} has saved!`,
        type: 'success',
        delay: 2000,
      })
    } catch (error) {
      if (error instanceof Error) {
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
      <Input
        width="100%"
        name="productName"
        clearable
        placeholder="Black shoes"
        onChange={handlerform}
        scale={4 / 3}
      />
      <Spacer h={0.5} />
      <Input
        label="$"
        htmlType="number"
        name="productPrice"
        clearable
        placeholder="Price"
        onChange={handlerform}
        scale={4 / 3}
      />
      <Spacer h={2} />
      <Button
        shadow
        loading={loading}
        type="secondary"
        onClick={() => saveUser()}
        style={{ fontWeight: 900, textTransform: 'uppercase' }}
      >
        Save product
      </Button>
    </div>
  )
}
