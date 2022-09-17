import { useState } from "react";
import {
  Card,
  Text,
  Spacer,
  Badge,
  ButtonDropdown,
  useToasts
} from "@geist-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../redux/productSlice";
import { IProduct } from "../../interface/Product.interface";
import { ProductEdit } from "../../components/modals/ProductEdit";
import { RootState } from "../../redux/store";

export const ListProducts = () => {
  const userRegister = useSelector((state: RootState): IProduct[] => state.productReducer)
  const dispatch = useDispatch();
  const { setToast } = useToasts();
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState<IProduct>({});

  const delUser = (id: string, productName: string) => {
    dispatch(productActions.deleteUser(id));
    setToast({
      text: `${productName} has been deleted!`,
      type: "success",
      delay: 2000
    });
  };

  const editProduct = (product: IProduct) => {
    setOpenModal(true);
    setProduct(product);
  };

  return (
    <div
      style={{
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      {/* {userRegister.length === 0 && <NotFoundSection />} */}
      <Card hidden={userRegister.length === 0} shadow width="100%">
        <Text hidden={userRegister.length === 0} h2>
          Products
        </Text>
        {userRegister
          .map((el: IProduct, idx: number) => (
            <Card key={idx}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 30
                }}
              >
                <ButtonDropdown key={Math.random()}>
                  <ButtonDropdown.Item main>
                    Products Actions
                  </ButtonDropdown.Item>
                  <ButtonDropdown.Item onClick={() => editProduct(el)}>
                    Edit
                  </ButtonDropdown.Item>
                  <ButtonDropdown.Item
                    type="error"
                    onClick={() => delUser(el.id!, el.productName!)}
                  >
                    Delete
                  </ButtonDropdown.Item>
                </ButtonDropdown>
              </div>
              <Spacer h={2} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 20
                }}
              >
                <div>
                  <img className="avatar-img" src={el.productImageUrl} alt="" />
                </div>
                <div>
                  <Text h3 style={{fontWeight:900}}>
                    {el.productName!.toLocaleUpperCase()}
                  </Text>
                  <p>{el.productDescription}</p>
                  <Badge>
                    $
                    {el
                      .productPrice!.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </Badge>
                </div>
              </div>
            </Card>
          ))
          .reverse()}
      </Card>
      <ProductEdit
        openModal={openModal}
        setOpenModal={setOpenModal}
        product={product}
      />
    </div>
  );
};
