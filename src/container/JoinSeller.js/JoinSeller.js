import React from "react";
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { JoinSellerWrapper,JoinSellerFromWrapper } from "./JoinSeller.style";
import JoinSellerForm from "./Form/JoinSellerForm";

export default function JoinSeller() {
  return (
    <JoinSellerWrapper>
        <p className="quote">Đăng ký ngay để trở thành người bán hàng cộng tác cùng chúng tôi</p>
        <JoinSellerFromWrapper>
           <JoinSellerForm></JoinSellerForm>
        </JoinSellerFromWrapper>
    </JoinSellerWrapper>
  );
}