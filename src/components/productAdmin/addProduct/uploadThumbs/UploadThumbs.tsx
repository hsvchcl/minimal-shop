import './uploadThumbs.css'
import { Card, Image, Spacer, useToasts } from '@geist-ui/core'
import { XCircle } from '@geist-ui/icons'
import { IProductImages } from '../../../../interface/Product.interface'
import { deleteFileFromStorage } from '../../../../utils/deleteFileFromStorage'
import defaultImage from '../../../../assets/DefaultProductImage.svg'

export const UploadThumbs = (props: {
  images: IProductImages[]
  setImages: (newImageSet: IProductImages[]) => void
}) => {
  const { setToast } = useToasts()

  // Delete image from storage
  const deleteImageFromStorage = (element: IProductImages) => {
    element.imageRef &&
      deleteFileFromStorage(element.imageRef)
        ?.then(() => {
          console.log('Archivo eliminado con exito!')
          deleteImageFromArray(element)
          setToast({
            text: 'Imágen eliminada correctamente',
            type: 'warning',
            delay: 2000,
          })
        })
        .catch((err) => {
          console.error(err)
        })
  }

  // Delete image from local array
  const deleteImageFromArray = (productImage: IProductImages) => {
    const idxToDelete = props.images.findIndex((image) => image.imageURL === productImage.imageURL)
    const newImageSet = [...props.images]
    newImageSet.splice(idxToDelete, 1)
    props.setImages(newImageSet)
  }

  return (
    <section hidden={props.images.length ? false : true} className='animate'>
      <Spacer h={2} />
      <Card shadow>
        <div className='section-image'>
          {props.images &&
            props.images.map((imageUrl, idx) => (
              <div key={idx} className='image-hover'>
                <div className='tag' onClick={() => deleteImageFromStorage(imageUrl)}>
                  <XCircle />
                </div>
                <Image src={imageUrl.imageURL || defaultImage} height={6} />
              </div>
            ))}
        </div>
      </Card>
    </section>
  )
}
