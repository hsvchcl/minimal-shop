import { Button, Input, Spacer, Textarea } from "@geist-ui/core";
import { IProduct } from "../../interface/Product.interface";
import { searchImage } from "../../services/rapidAPI.service";
import { sample } from "lodash";
import { useState } from "react";
import { RefreshCcw, UserX } from "@geist-ui/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const EditProductForm = (props: {
  product: IProduct;
  setEditProduct: Function;
  newEditProduct: IProduct;
}) => {
  const [loading, setLoading] = useState(false);
  const [imagesFind, setImagesFind] = useState([]);
  const [counter, setCounter] = useState(0);

  const handlerform = async (e: any) => {
    console.log(e.target.value);
    props.setEditProduct({
      ...props.product,
      [e.target.name]: e.target.value
    });
  };

  const handlerChangeImage = async (product: IProduct) => {
    try {
      if (imagesFind.length === 0) {
        // when first load:
        setLoading(true);
        const response = await searchImage(product.productName!);
        const { image } = sample(response);
        setImagesFind(response);
        handlerform({ target: { name: "productImageUrl", value: image.url } });
        setLoading(false);
      } else {
        // find images prev load
        setLoading(true);
        setCounter(counter + 1);
        const imageObject:any = imagesFind.at(counter);
        handlerform({ target: { name: "productImageUrl", value: imageObject.image.url } });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20
        }}
      >
        <div>
          {/* <img
            src={props.product.productImageUrl}
            style={{ borderRadius: 15 }}
            width={200}
            alt=""
          /> */}
          <LazyLoadImage
            src={props.product.productImageUrl} // use normal <img> attributes as props
            width={200}
            style={{ borderRadius: 5 }}
          />
          <Spacer h={1} />
          <Button
            type="success"
            style={{ width: "100%" }}
            onClick={() => handlerChangeImage(props.newEditProduct)}
            loading={loading}
            icon={<RefreshCcw />}
          >
            Refresh
          </Button>
        </div>
        <div style={{ width: "100%" }}>
          <Input
            width="100%"
            name="productName"
            initialValue={props.product.productName}
            placeholder="Black shoes"
            onChange={handlerform}
          />
          <Spacer h={0.5} />
          <Textarea
            width="100%"
            name="productDescription"
            initialValue={props.product.productDescription}
            placeholder="Black shoes"
            onChange={handlerform}
          />
          <Spacer h={0.5} />
          <Input
            htmlType="number"
            name="productPrice"
            initialValue={String(props.product.productPrice)}
            placeholder="Price"
            onChange={handlerform}
          />
          <Spacer h={2} />
        </div>
      </div>
    </>
  );
};
