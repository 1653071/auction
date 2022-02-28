import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { Button, Modal, Form, Input, Checkbox } from "antd";

import { instance } from "../../../../ultils/ultils";
import "antd/dist/antd.css";
import { MailFilled } from "@ant-design/icons";



export default function RegisterForm() {
    const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const username_Changed = function (e) {
    Setusername(e.target.value);
  };
  const mail_Changed = function (e) {
    setMail(e.target.value);
  };
  const name_Changed = function (e) {
    setName(e.target.value);
  };
  const birthdate_Changed = function (e) {
    setBirthDate(e.target.value);
  };
  const password_Changed = function (e) {
    Setpassword(e.target.value);
  };
  const onFinish= async ()=>{
     const data = {
        name: name,
        password: password,
        username: username,
        datecreate:birthdate ,
        mail : mail
      }
      const res = await instance.post('/users/register',data);
      if(res.status ===200){
          alert("Đăng kí thành công")
      }
      else{
          alert("Đăng kí thất bại")
      }

  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Tên"
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input onChange={name_Changed} />
      </Form.Item>
      <Form.Item
        label="Ngày sinh"
        name="birthdate"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input onChange={birthdate_Changed} />
      </Form.Item>
      <Form.Item
        label="Mail"
        name="mail"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input onChange={mail_Changed}/>
      </Form.Item>
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input onChange={username_Changed}/>
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password onChange={password_Changed}/>
      </Form.Item>

      

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
