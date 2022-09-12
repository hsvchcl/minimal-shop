import { Card, Grid, Text } from "@geist-ui/core";
import { useEffect } from "react";
import { AddUserForm } from "../components/users/AddUserForm";
import { ListProducts } from "../components/users/ListUser";

export const ProductAdminSection = () => {

  const handleScroll = () => {
    // console.log('scroll=>', window.scrollY);
    const element = document.getElementById("card_new");
    if (window.scrollY > 200) {
      element?.classList.add("woow");
    }else{
      element?.classList.remove("woow");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Grid.Container gap={2} justify="flex-start" alignItems="flex-start">
      <Grid xs={12}>
        <Card id="card_new" shadow width="100%">
          <Text h2 my={0}>
            Add new
          </Text>
          <Text>Add new product to catalog</Text>
          <AddUserForm />
        </Card>
      </Grid>
      <Grid xs={12}>
        <ListProducts />
      </Grid>
    </Grid.Container>
  );
};
