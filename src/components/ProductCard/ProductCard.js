import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import { Price, Time } from "./ProductCard.style";
import {
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  LikeOutlined,
} from "@ant-design/icons";
import { instance } from "../../ultils/ultils";
const { Meta } = Card;
export default function ProductCard({ item }) {
  
  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={<img alt="example" src={item.image[0]} height={300} />}
      bordered={true}
    >
      <Meta
        title={item.name}
      />
      <Price>Price: {item.price}</Price>
      <Time>
       
      </Time>
      {/* <Link to={`/listing/${item.id}`} state={{item1:item}}>Dau961 gia1</Link> */}
    </Card>
  );
}
