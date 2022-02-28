import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import { Button, Modal, Form, Input, Checkbox } from "antd";
import { instance, parseJwt } from "../../../ultils/ultils";

import "antd/dist/antd.css";
import {
  NavigationWrapper,
  AuthWrapper,
  Cart,
  List,
  AvatarWrapper,
  Seller,
} from "./Navigation.style";
import { UserOutlined } from "@ant-design/icons";
import {
  ShoppingCartOutlined,
  OrderedListOutlined,
  DownOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import RegisterForm from "./RegisterForm/RegisterForm";

export default function Navigation() {
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
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/invidual">Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Lịch sử đấu giá
        </a>
      </Menu.Item>

      <Menu.Item
        onClick={() => {
          delete localStorage.accessToken;
          delete localStorage.name;
          delete localStorage.isLoggin;
          delete localStorage.userID;
          navigate("/");
        }}
        danger
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);
  const [isModalSignUpVisible, setIsModalSignUpVisible] = useState(false);

  const showModal = () => {
    setIsModalSignInVisible(true);
  };

  const handleOk = () => {
    setIsModalSignInVisible(false);
  };

  const handleCancel = () => {
    setIsModalSignInVisible(false);
  };
  const showModalSignUp = () => {
    setIsModalSignUpVisible(true);
  };

  const handleOkSignUp = () => {
    setIsModalSignUpVisible(false);
  };

  const handleCancelSignUp = () => {
    setIsModalSignUpVisible(false);
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
    <NavigationWrapper>
      <Menu
        mode="horizontal"
        style={{ backgroundColor: "#8d5524", width: "60%" }}
      >
        <Menu.Item key="home">
          <Link to="/" style={{ color: "white", fontWeight: "900" }}>
            Trang chủ
          </Link>
        </Menu.Item>
        <Menu.Item key="home1">
          <Link to="/listing" style={{ color: "white", fontWeight: "900" }}>
            Sản phẩm
          </Link>
        </Menu.Item>
      </Menu>

      {localStorage.isLoggin === undefined ? (
        <AuthWrapper>
          <Button
            onClick={showModalSignUp}
            style={{
              color: "white",
              backgroundColor: "#663300",
              fontWeight: "900",
              float: "right",
              marginLeft: "174px",
              marginTop: "2px",
            }}
          >
            Đăng Ký
          </Button>
          <Button
            onClick={showModal}
            style={{
              color: "white",
              backgroundColor: "#663300",
              fontWeight: "900",
              float: "right",
              marginLeft: "24px",
              marginTop: "2px",
            }}
          >
            Đăng Nhập
          </Button>
          <Modal
            title="Đăng nhập"
            visible={isModalSignInVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinish}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input onChange={username_Changed} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
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
          </Modal>
          <Modal
            title="Đăng ký"
            visible={isModalSignUpVisible}
            onOk={handleOkSignUp}
            onCancel={handleCancelSignUp}
          >
            <RegisterForm/>
          </Modal>
        </AuthWrapper>
      ) : (
        <AuthWrapper>
          <Seller>
            <DollarOutlined
              theme="filled"
              twoToneColor="#eb2f96"
              style={{ color: "white", fontSize: "16px", fontWeight: "900" }}
            />

            {(localStorage.isSeller) ? (
              <Link to="/seller">
                <p className="seller-text">Kênh bán hàng</p>
              </Link>
            ) : (
              <p
                className="seller-text"
                onClick={async () => {
                  const res = await instance
                    .put(`/users/request/${localStorage.userID}`)
                    .then(() => {
                      alert("Thành công");
                    })
                    .catch(() => {
                      alert("Không thành công");
                    });
                }}
              >
                Duyệt thành người bán
              </p>
            )}
          </Seller>
          
          
          <Dropdown overlay={menu}>
            <AvatarWrapper>
              <Avatar
                size={24}
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              ></Avatar>
              <p className="name">Xin chào, {localStorage.name}</p>
            </AvatarWrapper>
          </Dropdown>
        </AuthWrapper>
      )}
    </NavigationWrapper>
  );
}
