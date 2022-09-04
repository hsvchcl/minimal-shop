import { Button, Input, Spacer, useToasts } from "@geist-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { v4 as uuid } from "uuid";
import { IProduct } from "../../interface/Product.interface";
import { searchImage } from "../../services/rapidAPI.service";

export const AddUserForm = () => {
  const [user, setUser] = useState<IProduct>({
    id: "",
    productName: "",
    productDescription: "",
    productPrice: 0,
    productImageUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const { setToast } = useToasts();

  const dispatch = useDispatch();

  const handlerform = async (e: any) => {
    setUser({ ...user, id: uuid(), [e.target.name]: e.target.value });
  };

  const saveUser = async () => {
    try {
      setLoading(true);
      const images = await searchImage(user.productName!);
      const { image, source } = images[0];
      console.log(images[0]);
      dispatch(
        addUser({
          ...user,
          productImageUrl: image.url,
          productDescription: source.title
        })
      );
      setLoading(false);
      setToast({
        text: `${user.productName!.toLocaleUpperCase()} has saved!`,
        type: "success",
        delay: 2000
      });
    } catch (error: any) {
      setLoading(false);
      setToast({
        text: `Ocurrió un error: ${error.message}`,
        type: "error",
        delay: 2000
      });
    }
  };

  return (
    <>
      <Input
        width="100%"
        name="productName"
        clearable
        placeholder="Black shoes"
        onChange={handlerform}
      />
      <Spacer h={0.5} />
      <Input
        htmlType="number"
        name="productPrice"
        clearable
        placeholder="Price"
        onChange={handlerform}
      />
      <Spacer h={2} />
      <Button
        shadow
        loading={loading}
        type="secondary"
        onClick={() => saveUser()}
      >
        Save product
      </Button>
    </>
  );
};
