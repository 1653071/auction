import React, {useContext} from "react";
import { Tabs , Pagination} from 'antd';
import ProductCard from "../../../components/ProductCard/ProductCard";
import ListingGrid from "../../../components/ListingGrid/ListingGrid";
import ListingProduct from "./ListingProduct/ListingProduct";
import SellerContext from "../../../context/SellerContext"
const { TabPane } = Tabs;
export default function PostedProduct() {
  const { store,dispatch } = useContext(SellerContext);
  const { items} = store;
  function callback(key) {

    dispatch({
      type: "filter_due",
      payload: key
    });
  }
  return (
    <>
      <Tabs defaultActiveKey="all" style={{paddingLeft:"10px"}} onChange={callback}>
        <TabPane tab="Tất cả sản phẩm" key="all" style={{paddingLeft:"10px"}}>
          <ListingProduct />
          

      
        </TabPane>
        <TabPane tab="Còn hạn" key="filter_due">
          <ListingProduct />
        </TabPane>
        <TabPane tab="Đã hoàn thành đấu giá " key="filter_success">
        <ListingProduct />
        </TabPane>
        <TabPane tab="Đang đấu giá " key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <Pagination defaultCurrent={1} total={50} style={{marginTop:"20px",float:"left",paddingLeft:"20px"}} />
    </>
  );
}
