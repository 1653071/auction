import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductImage from "./ProductImage/ProductImage";
import {
  PostImage,
  SinglePageWrapper,
  Container,
  ProductDetail,
} from "./SinglePage.style";
import Information from "./Information/Information";
import Description from "./Description/Description";
import { Image, Row, Col } from "antd";
import Seller from "./Seller/Seller";
import RelateProduct from "./RelateProduct/RelateProduct";
import History from "./History/History";
import { instance } from "../../ultils/ultils";

export default function SinglePage(props) {
  
  const location = useLocation();
  const { item1 } = location.state;
  const [usersauction, setUserauction] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res_user = await instance(`/auction/product/${item1.id}`);
      setUserauction(res_user.data);
    };
    fetchUser();
  }, []);
  return (
    <SinglePageWrapper>
      <Container>
        <PostImage>
          <Row gutter={24}>
            <Col span={6}>
              <Row>
                <Image
                  height={150}
                  src={item1.image[1]}
                  style={{ width: "100%", padding: "0", margin: "0" }}
                />
              </Row>
              <Row>
                <Image
                  height={150}
                  src={item1.image[1]}
                  style={{ width: "100%", padding: "0", margin: "0" }}
                />
              </Row>
            </Col>
            <Col span={18}>
              <Image
                height={300}
                src={item1.image[0]}
                style={{ width: "100%", padding: "0", margin: "0" }}
              />
            </Col>
          </Row>
        </PostImage>
        <Information item={item1} />
      </Container>
      <ProductDetail>
        <Seller />
        <Description description={item1.description} />

        <History user={usersauction}></History>
      </ProductDetail>
    </SinglePageWrapper>
  );
}
