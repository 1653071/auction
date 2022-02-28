import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { instance, parseJwt } from "../../ultils/ultils";
import { Form, Input, Button, Checkbox } from "antd";
import Password from "antd/lib/input/Password";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");

  const onFinishFailed = () => {
    console.log("Failed:");
  };
  const username_Changed = function (e) {
    Setusername(e.target.value);
  };
  const password_Changed = function (e) {
    Setpassword(e.target.value);
  };
  const onFinish = async function () {
    try {
      const data = { username: username, password: password };
      const res = await instance.post("auth/login", data);
      if (res.data.authetication) {
        // console.log(res.data.accessToken);
        localStorage.accessToken = res.data.accessToken;
        localStorage.name = res.data.name;
        localStorage.isLoggin = true;
        const obj = parseJwt(res.data.accessToken);
        localStorage.userID = res.data.userID;
        localStorage.birthdate = res.data.birthdate;
        localStorage.mail = res.data.mail;
        localStorage.username = res.data.username;
        localStorage.isSeller = res.data.isSeller;
        // console.log(location.state);
        const retUrl = location.state?.from?.pathname || "/";
        navigate(retUrl);
      } else {
        alert("Invalid login.");
      }
    } catch (err) {
      alert("Invalid login.");
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input onChange={username_Changed} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password onChange={password_Changed} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
