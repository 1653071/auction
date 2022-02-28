import React, { useEffect, useReducer } from "react";

import { PageHeader } from "antd";
import GridProduct from "./Grid/GridProduct";
import SearchBar from "../../components/SearchBar/SearchBar";
import { SearchbarWrapper, ProductArea } from "./HomePage.style";
import { instance } from "../../ultils/ultils";
import Banner from "./Banner/Banner";
import AppContext from "../../context/ProductContext";
export default function HomePage() {
  const initialState = {
    items: [],
    query: "",
  };
  const reducer = function (state, action) {
    switch (action.type) {
      case "init":
        return {
          items: action.payload.items,
          query: action.payload.query,
        };

      default:
        return state;
    }
  };
  const [store, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const res = await instance.get("/products");

      console.log(res.date);
      dispatch({
        type: "init",
        payload: {
          items: res.data,
          query: "",
        },
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <Banner />
      <AppContext.Provider value={{ store, dispatch }}>
        

        <ProductArea>
          <GridProduct
            key="1"
            filter={"highestprice"}
            title="Sản phẩm có giá cao nhất"
          />
          <GridProduct
            key="2"
            filter={"highestauction"}
            title="Sản phẩm được ra giá nhiều nhất"
          />
          <GridProduct
            key="3"
            filter={"expired"}
            title="Sản phẩm gần hết phiên"
          />
        </ProductArea>
      </AppContext.Provider>
    </>
  );
}
