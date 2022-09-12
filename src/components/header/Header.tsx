import { Text } from "@geist-ui/core";
import yo from "../../assets/ss.jpeg";
import "./Header.css";
export const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center"
      }}
    >
      <Text h1>Minimal Shop</Text>
      <div>
        <div className="circular--portrait">
          <img src={yo} alt="" />
        </div>
      </div>
    </div>
  );
};
