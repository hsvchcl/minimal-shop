import { Spacer, Tabs } from "@geist-ui/core";
import { Header } from "../components/header/Header";
import { ProductAdminSection } from "./ProductAdminSection";
import { ShopSection } from "./ShopSection";
export const Home = () => {
  return (
    <>
      <Header />
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
