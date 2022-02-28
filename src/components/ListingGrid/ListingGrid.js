import React, { useContext,useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Divider,Pagination } from "antd";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProductCard from "../ProductCard/ProductCard";
import { ListingGridWrapper } from "./ListingGrid.style";
import ProductContext from "../../context/ProductContext";

const style = { background: "#0092ff", padding: "8px 0" };

export default function ListingGrid(props) {
  const [currentPage,setCurrentPage] = useState(); 
  const [totalPage,setTotalPage] = useState(); 
  const [limit,setLimit] = useState(); 
  const [offset,setOffset] = useState(0); 
  function onShowSizeChange(current, pageSize,total) {
    console.log(total)
    const offset = (current - 1) * pageSize;
    setOffset(offset)
    // const currentCountries = allCountries.slice(offset, offset + pageSize)
    console.log(current, pageSize);
  }
  
  const { store } = useContext(ProductContext);
  const { items, query ,category_id} = store;
  console.log(category_id);

  return (
    <ListingGridWrapper>
      <Row gutter={18}>
        {store.items.slice(offset, offset + 8)
          .filter(function (item) {
            return item.name.toLowerCase().includes(query.toLowerCase());
          })
          .filter(function (item) {
            if(category_id === "all"){
              return item;
            }
            return item.category_id === category_id;
          })
          .map(function (item) {
            return (
              <Col key={item.id} className="gutter-row" span={6}>
               
                 <Link to={`/listing/${item.id}`} state={{ item1: item }}> <ProductCard key={item.id} item={item}/></Link>
               
              </Col>
            );
          })}
      </Row>
      <Pagination 
      onChange={onShowSizeChange} defaultCurrent={1} total={store.items.length} defaultPageSize={8} />
    </ListingGridWrapper>
  );
}
