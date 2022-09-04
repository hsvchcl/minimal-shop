import { Badge, Card, Grid, Text } from "@geist-ui/core";
import { useSelector } from "react-redux";
import { IProduct } from "../interface/Product.interface";

export const ShopSection = () => {
  const userRegister: IProduct[] = useSelector((state: any) => state.users);

  return (
    <Grid.Container gap={2} justify="flex-start">
      {userRegister &&
        userRegister.map((el: IProduct, idx) => (
          <Grid xs={6} key={idx}>
            <Card shadow width="100%">
              <img src={el.productImageUrl} alt="" height='250' style={{objectFit: "contain"}}/>
              <Text h3>{el.productName!.toLocaleUpperCase()}</Text>
              <Text p>{el.productDescription} -sss</Text>
              <Badge>
                $
                {el.productPrice!
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </Badge>
            </Card>
          </Grid>
        )).reverse()}
    </Grid.Container>
  );
};
