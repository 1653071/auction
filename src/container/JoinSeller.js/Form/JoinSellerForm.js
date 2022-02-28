import React  from "react";
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { useState } from 'react';





 
export default function JoinSellerForm() {
    const [form] = Form.useForm();



  return (
    <Form
      form={form}
      layout="vertical"
      style={{borderRadius:"10px" , border:"", boxShadow:"0px 10px 50px rgb(0,0,0,0.08)",padding:"30px 30px"   }}
     
    >
       <Form.Item label="Tên" required tooltip="This is a required field" style={{fontWeight:"bold"}}>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Chung minh nhan dan" required tooltip="This is a required field" style={{fontWeight:"bold"}}>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Tai Khoan Ngan Hang"
        tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        style={{fontWeight:"bold"}}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
}