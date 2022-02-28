import React,{useState} from "react";

import { Form, Input, Button, Checkbox } from 'antd';
import { instance } from "../../../../ultils/ultils";
export default function ChangePassForm() {
    const onFinish = async function (a) {
        try {
          console.log(a.passwordcurrent);
          const payload ={
            "currentpassword":a.passwordcurrent,
            "changepassword":a.passwordchange
           
         }
          const res =  await instance.put(`/users/changepassword/${localStorage.userID}`,payload)
          if(res.status === 200){
              alert("change pass success")
          }
          else{
            alert("change pass fail")
          }
        } catch (err) {
          alert("Invalid login.");
        }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <Form
      name="basic"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Password"
        name="passwordcurrent"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Password"
        name="passwordchange"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
