import "./uploadThumbs.css";
import { Image } from "@geist-ui/core";
export const UploadThumbs = (props: { images: string[] }) => {
  return (
    <div className="section-image">
      {props.images &&
        props.images.map((imageUrl) => (
          <div>
            <Image src={imageUrl} height={5} />
          </div>
        ))}
    </div>
  );
};
