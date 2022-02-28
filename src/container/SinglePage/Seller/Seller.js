import React from "react";

import { Typography } from "antd";
import { SellerContent,SellerWrapper } from "./Seller.style";
const {Title} = Typography;
export default function Seller(){
    return (
        <SellerWrapper>
           <Title level={4} style={{textAlign:"center"}}>Người bán</Title>
           <SellerContent>
               Thông tin người bán
           </SellerContent>
           
        </SellerWrapper>
    );
}