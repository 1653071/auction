import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { Button, Modal, Form, Input, Checkbox, notification } from "antd";

import { instance } from "../../../ultils/ultils";
import "antd/dist/antd.css";
import { MailFilled } from "@ant-design/icons";
const { TextArea } = Input;

export default function ComplementaryDescription({ id }) {
  const [description, setDescription] = useState("");
  const description_Changed = function (e) {
    setDescription(e.target.value);
  };

  const onFinish = async () => {
    const data = {
      description: description,
    };
    const res = await instance.put(`/products/updatedescription/${id}`, data);
    if (res.status === 200) {
      notification.open({
        message: "Trạng thái",
        description: "Thành công",
      });
    } else {
      alert("Bổ sung thất bại");
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Mô tả bổ sung"
        name="description"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <TextArea
          rows={6}
          showCount
          maxLength={500}
          onChange={description_Changed}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 24 }}>
        <Button type="primary" htmlType="submit">
          Xác nhận bổ sung
        </Button>
      </Form.Item>
    </Form>
  );
}
