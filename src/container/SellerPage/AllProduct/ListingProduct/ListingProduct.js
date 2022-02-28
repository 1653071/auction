import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import SellerContext from "../../../../context/SellerContext";
export default function ListingProduct() {
  const { store } = useContext(SellerContext);
  const { filter } = store;
  return (
    <>
      <Row gutter={24} style={{ marginTop: "20px" }}>
        {store.items.filter(function (item) {
            if(filter === "all"){
              return item;
            }
            else if(filter === "filter_success"){
              return Date.parse(item.dateend) < Date.now()
            }
            return Date.parse(item.dateend) > Date.now();
          }).map(function (item) {
          return (
            <Col key={item.id} className="gutter-row" span={6}>
              <Link to={`/seller/products/${item.id}`} state={{ item: item }}>
                <ProductCard key={item.id} item={item} />
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
