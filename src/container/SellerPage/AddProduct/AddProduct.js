import React from "react";
import { useState, useReducer, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AddProductWrapper } from "./AddProduct.style";
import {
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Button,
  InputNumber,
  DatePicker,
} from "antd";
import { storage } from "../../../firebase/firebase";
import { instance } from "../../../ultils/ultils";
import cateReducer, {
  initialStateCate,
} from "../../../reducer/ProductCategoryReducer";
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export default function AddProduct() {
  const [storeCategory, dispatchCategory] = useReducer(
    cateReducer,
    initialStateCate
  );
  useEffect(() => {
    async function fetchData() {
      const cateRes = await instance.get("/product_category");

      dispatchCategory({
        type: "init",
        payload: {
          categories: cateRes.data,
        },
      });
    }
    fetchData();
  }, []);

  const [form] = Form.useForm();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [pricebuy, setPricebuy] = useState();
  const [description, setDescription] = useState();
  const [jump, setJump] = useState();
  const [category_id, setCategoryID] = useState();
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [dateend, Setdateend] = useState();
  const [url, setUrl] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [progress, setProgress] = useState(0);
  const name_changed = function (e) {
    setName(e.target.value);
  };
  const description_changed = function (e) {
    setDescription(e.target.value);
  };
  const image_changed = function (e) {
    console.log(e.target.files);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const image_changed1 = function (e) {
    console.log(e.target.files);
    if (e.target.files[0]) {
      setImage1(e.target.files[0]);
    }
  };
  const image_changed2 = function (e) {
    console.log(e.target.files);
    if (e.target.files[0]) {
      setImage2(e.target.files[0]);
    }
  };
  const jump_changed = function (e) {
    setJump(e);
  };
  const price_changed = function (e) {
    setPrice(e);
  };
  const pricebuy_changed = function (e) {
    setPricebuy(e);
  };
  const dateend_changed = function (e) {
    Setdateend(e);
  };

  const category_change = function (value) {
    setCategoryID(value);
  };
  function handleUpload(e) {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url);
            return url;
          });
      }
    );
  }
  function handleUpload1(e) {
    const uploadTask = storage.ref(`images/${image1.name}`).put(image1);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image1.name)
          .getDownloadURL()
          .then((url) => {
            setUrl1(url);
            console.log(url);
            return url;
          });
      }
    );
  }
  function handleUpload2(e) {
    const uploadTask = storage.ref(`images/${image2.name}`).put(image2);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image2.name)
          .getDownloadURL()
          .then((url) => {
            setUrl2(url);
            console.log(url);
          });
      }
    );
  }
  const onFinish = async function (e) {
    try {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      const uploadTask1 = storage.ref(`images/${image1.name}`).put(image1);
      const uploadTask2 = storage.ref(`images/${image2.name}`).put(image2);
      setTimeout(() => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                setUrl(url);
              });
          }
        );
        uploadTask1.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image1.name)
              .getDownloadURL()
              .then((url) => {
                setUrl1(url);
              });
          }
        );
        uploadTask2.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image2.name)
              .getDownloadURL()
              .then((url) => {
                setUrl2(url);
              });
          }
        );
      }, 0);
      const picture = [];
    
      if (url2 !== "") {
       
          picture.push(`${url}`);
          picture.push(`${url1}`);
          picture.push(`${url2}`);
        

          
   
      }
      else{
        return alert("Chua cap nhat url")
      }
      const date = new Date();
      const data = {
        name: name,
        price: price,
        pricebuy: pricebuy,
        category_id: category_id,
        jump: jump,
        dateend: dateend,
        picture: picture,
        description: [description],
        sellerId: localStorage.userID,
        datecreate: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      };
      console.log(data);

      setTimeout(async () => {
        const res = await instance.post("/products/add", data);
        if (res.status == 200) {
          alert("Invalid login.");
        } else {
          alert("Invalid login.");
        }
      }, 10000);
    } catch (err) {}
  };
  const onGenderChange = (value) => {
    switch (value) {
      case "hfIXPdIhFVqxS92bCli5":
        setCategoryID("hfIXPdIhFVqxS92bCli5");
        return;
      default:
        setCategoryID("nFKDk4PRH3UCmIcfX6JN");
        return;
    }
  };
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Form
        name="validate_other"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        style={{
          margin: "60px",
          boxShadow: "0 6px 20px rgba(0, 0, 0,0.1)",
          borderRadius: "5px",
          padding: "60px",
        }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[
                {
                  required: true,
                  message: "Nhập tên sản phẩm",
                },
              ]}
              wrapperCol={{ offset: 3, span: 16 }}
            >
              <Input onChange={name_changed} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="jump"
              label="Buoc gia"
              rules={[
                {
                  required: true,
                  message: "Nhập bước giá",
                },
              ]}
              wrapperCol={{ offset: 2, span: 16 }}
            >
              <InputNumber onChange={jump_changed} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="pricebuy"
              label="Giá mua ngay"
              rules={[
                {
                  required: true,
                  message: "Nhập giá",
                },
              ]}
            >
              <InputNumber onChange={pricebuy_changed} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="price"
              label="Giá khởi điểm"
              rules={[
                {
                  required: true,
                  message: "Nhập giá khởi điểm",
                },
              ]}
            >
              <InputNumber onChange={price_changed} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="decription"
              label="Mô tả sản phẩm"
              rules={[
                {
                  required: true,
                  message: "Please input Intro",
                },
              ]}
              wrapperCol={{ offset: 2, span: 18 }}
            >
              <Input.TextArea
                showCount
                maxLength={500}
                onChange={description_changed}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="dateend" label="Chọn ngày kết thúc">
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                onChange={dateend_changed}
                wrapperCol={{ offset: 5, span: 18 }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Chon loai"
              rules={[{ required: true }]}
              wrapperCol={{ offset: 2, span: 16 }}
            >
              <Select onChange={category_change}>
                {storeCategory.categories.map(function (item) {
                  return (
                    <Select.Option value={item.id}>{item.name}</Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="radio-group" label="Gia hạn">
              <Radio.Group>
                <Radio value="true">Có</Radio>
                <Radio value="false">Không</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="image1" label="Ảnh đại diện" wrapperCol={{ offset: 3, span: 20 }}>
              <input type="file" onChange={image_changed} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="image2" label="Ảnh phụ một " wrapperCol={{ offset: 3, span: 18 }}>
              <input type="file" onChange={image_changed1} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="image3" label="Ảnh phụ hai " wrapperCol={{ offset: 3, span: 18 }}>
              <input type="file" onChange={image_changed2} />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
}
