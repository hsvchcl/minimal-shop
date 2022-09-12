import { Badge, Button, Card, Grid, Link, Text } from "@geist-ui/core";
import { Plus } from "@geist-ui/icons";
import { useSelector } from "react-redux";
import { IProduct } from "../interface/Product.interface";

export const ShopSection = () => {
  const userRegister: IProduct[] = useSelector((state: any) => state.users);

  return (
    <Grid.Container gap={2} justify="flex-start" alignItems="center">
      {userRegister &&
        userRegister
          .map((el: IProduct, idx) => (
            <Grid xs={6} key={idx}>
              <Card shadow width="100%">
                <img
                  src={el.productImageUrl}
                  alt=""
                  height="250"
                  style={{ objectFit: "contain" }}
                />
                <Text h3 style={{ fontWeight: 900 }}>
                  {el.productName!.toLocaleUpperCase()}
                </Text>
                <Text p>{el.productDescription}</Text>
                <Badge>
                  $
                  {el
                    .productPrice!.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Badge>
                <Card.Footer>
                  <Button icon={<Plus />} type="secondary" ghost width="100%">
                    Add to cart
                  </Button>
                </Card.Footer>
              </Card>
            </Grid>
          ))
          .reverse()}
    </Grid.Container>
  );
};
