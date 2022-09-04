import React from "react";
import { Page } from "@geist-ui/core";
import "./App.css";
import { useSelector } from "react-redux";
import { Home } from "./pages/Home";

function App() {
  const initalUserstate = useSelector((state: any) => state.users);
  console.log(initalUserstate);
  return (
    <Page>
      <Home />
    </Page>
  );
}

export default App;
