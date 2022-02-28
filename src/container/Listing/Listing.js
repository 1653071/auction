import React, { useContext, useReducer, useEffect,useState } from "react";
import { Menu, Row, Col } from "antd";
import ListingGrid from "../../components/ListingGrid/ListingGrid";
import AppContext from "../../context/ProductContext";
import { instance } from "../../ultils/ultils";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Input, Space } from 'antd';
import SearchBar from "../../components/SearchBar/SearchBar";
import reducer , {initialState} from '../../reducer/ProductReducer'
import cateReducer , {initialStateCate} from '../../reducer/ProductCategoryReducer'
import { ListingWrapper } from "./Listing.style";
const { Search } = Input;
const { SubMenu } = Menu;
export default function Listing(props) {

  
  const [store, dispatch] = useReducer(reducer, initialState);
  const [storeCategory, dispatchCategory] = useReducer(cateReducer, initialStateCate);
  useEffect(() => {
    async function fetchData() {
      
      const res = await instance.get("/products");
      const cateRes = await instance.get("/product_category")
      const productsRes = res.data;
      console.log(res);
      dispatchCategory({
        type: "init",
        payload: {
          categories: cateRes.data,
          
        },
      });
      dispatch({
        type: "init",
        payload: {
          items: productsRes,
          query: "",
          category_id:"all"
        },
      });
    }
    fetchData();
  }, []);
  
  const filter= e =>{
    console.log(e.key);
    dispatch({
      type: "category_filter",
      payload: e.key
    });
    
  };
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      
     <ListingWrapper>
     <Row gutter={24} style={{ width: "100%" }}>
        <Col span={6}>
          <SearchBar/>
          <Menu
            style={{ float: "left", marginTop:"10px"}}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            onClick={filter}
            
          >
          <Menu.Item key="all">
            Tất cả sản phẩm
          </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Điện tử">
              <Menu.ItemGroup key="g1" >
                {storeCategory.categories.map(function(item){
                  return <Menu.Item key={item.id}>{item.name}</Menu.Item>
                })}
               
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={18}>
          <ListingGrid>

          </ListingGrid>
        </Col>
      </Row>
     </ListingWrapper>
    </AppContext.Provider>
  );
}
