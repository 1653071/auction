import React, { lazy, Suspense, useEffect, useReducer } from "react";

import { useState } from "react";
import { SellerWrapper, MenuWrapper, Content } from "./SellerPage.style";
import { Route, Link, Routes } from "react-router-dom";

import { Avatar, Menu, Button } from "antd";
import { MailOutlined, AuditOutlined, LikeOutlined } from "@ant-design/icons";
import AllProduct from "./AllProduct/AllProduct";
import AuctionWinner from "./AuctionWinner/AuctionWinner";
import AddProduct from "./AddProduct/AddProduct";
import { instance } from "../../ultils/ultils";
import reducer, { initialState } from "../../reducer/SellerReducer";
import SellerContext from "../../context/SellerContext";
const { SubMenu } = Menu;
const routes = [
  {
    path: "/products",
    component: lazy(() => import("../SellerPage/AllProduct/AllProduct")),
    exact: true,
  },
];
export default function SellerPage(props) {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [store, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const res = await instance.get(`/products/seller/${localStorage.userID}`);

      const productsRes = res.data;
      console.log(res);
      dispatch({
        type: "init_seller_products",
        payload: {
          items: productsRes,
          filter: "all",
        },
      });
    }
    fetchData();
  }, []);
  return (
    <SellerContext.Provider value={{ store, dispatch }}>
      <SellerWrapper>
        <MenuWrapper>
          <Menu
            defaultSelectedKeys={selectedMenuItem}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            onClick={(e) => setSelectedMenuItem(e.key)}
          >
            <Menu.Item key="12" icon={<AuditOutlined />}>
              Thêm 1 sản phẩm mới
              <Link to={`/seller/add`} />
            </Menu.Item>
            <Menu.Item key="2" icon={<LikeOutlined />}>
              Tất cả sản phẩm
              <Link to={`/seller/products`} />
            </Menu.Item>

            <SubMenu
              key="sub1"
              icon={<MailOutlined />}
              title="Danh sách sản phẩm"
            >
              <Menu.Item key={1}>
                <Link to={`/seller/products`} />
              </Menu.Item>
              <Menu.Item key="4">Đã được đăng</Menu.Item>
            </SubMenu>
          </Menu>
        </MenuWrapper>
        <Content>
          <Suspense>
            <Routes>
              <Route path="add" element={<AddProduct />} />
              <Route path="products" element={<AllProduct />} />
              <Route path="products/:id" element={<AuctionWinner />} />
            </Routes>
          </Suspense>
        </Content>
      </SellerWrapper>
    </SellerContext.Provider>
  );
}
