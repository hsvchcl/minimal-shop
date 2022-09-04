import { Spacer, Tabs, Text } from "@geist-ui/core";
import { ProductAdminSection } from "./ProductAdminSection";
import { ShopSection } from "./ShopSection";
export const Home = () => {
  return (
    <>
      <Text h1>Minimal Shop</Text>
      <Spacer h={2} />
      <Tabs initialValue="1">
        <Tabs.Item label="My Shop" value="1">
          <Spacer h={2} />
          <ShopSection />
        </Tabs.Item>
        <Tabs.Item label="Product admin" value="2">
          <Spacer h={2} />
          <ProductAdminSection />
        </Tabs.Item>
      </Tabs>
    </>
  );
};
