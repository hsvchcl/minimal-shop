import './uploadThumbs.css'
import { Card, Image, Spacer } from '@geist-ui/core'
export const UploadThumbs = (props: { images: string[] }) => {
  return (
    <section hidden={props.images.length ? false : true}>
      <Spacer h={2} />
      <Card shadow>
        <div className="section-image">
          {props.images &&
            props.images.map((imageUrl, idx) => (
              <div key={idx}>
                <Image src={imageUrl} height={5} />
              </div>
            ))}
        </div>
      </Card>
    </section>
  )
}
