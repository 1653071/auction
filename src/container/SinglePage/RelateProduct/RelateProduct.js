import React from "react";

import { Typography ,Row,Col} from "antd";

import {
  RelateProductContent,
  RelateProductWrapper,
} from "./RelateProduct.style";
import ProductCard from "../../../components/ProductCard/ProductCard";
const { Title } = Typography;
export default function RelateProduct() {
  return (
    <RelateProductWrapper>
      <Title level={4} style={{textAlign:"center"}}>Mô tả sản phẩm</Title>
      <RelateProductContent>
        <Row justify="center" gutter={16}>
          <Col className="gutter-row" span={4}>
            <ProductCard />
          </Col>
          <Col className="gutter-row" span={4}>
            <ProductCard />
          </Col>
          <Col className="gutter-row" span={4}>
            <ProductCard />
          </Col>
          <Col className="gutter-row" span={4}>
            <ProductCard />
          </Col>
          <Col className="gutter-row" span={4}>
            <ProductCard />
          </Col>
        </Row>
      </RelateProductContent>
    </RelateProductWrapper>
  );
}
