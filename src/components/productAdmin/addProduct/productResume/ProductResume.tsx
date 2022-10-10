import './productResume.css'
import { Card, Text, Image, Badge, Spacer } from '@geist-ui/core'
import { IProduct, IProductImages } from '../../../../interface/Product.interface'
import defaultImage from '../../../../assets/DefaultProductImage.svg'
import { priceFormat } from '../../../../utils/priceFormat'

export const ProductResume = (props: { product: IProduct; images: IProductImages[] }) => {
  return (
    <>
      <div className='product-resume__container'>
        <div className='product-resume__card-container'>
          <Card shadow padding={1}>
            <Image src={props.images[0]?.imageURL || defaultImage} width='100%' draggable={false} />
            <Text h3 my={0} style={{ fontWeight: 900 }}>
              {props.product.productName}
            </Text>
            <Text>{props.product.productDescription}</Text>
            {props.product.productPrice && (
              <div className='animate'>
                <Badge>{priceFormat(props.product.productPrice)}</Badge>
                <Spacer h={0.5} />
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}
