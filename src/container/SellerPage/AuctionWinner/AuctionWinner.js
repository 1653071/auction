import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Descriptions,
  Radio,
  Button,
  Input,
  Pagination,
  Form,
  Table,
  Space,
  Badge,
  Modal,
  Row,
  Col,
  notification,
} from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { instance } from "../../../ultils/ultils";
import { Price } from "../../../components/ProductCard/ProductCard.style";
import SellerContext from "../../../context/SellerContext";
import ComplementaryDescription from "./ComplementaryDescription";
const { TextArea } = Input;
export default function AuctionWinner() {
  const { store, dispatch } = useContext(SellerContext);
  const { items } = store;
  const [auctionID, setAuctionID] = useState(null);
  const [comment, setComment] = useState("");
  const handleOkDeleteModal = async () => {
    const res = await instance.delete(`auction/delete/${auctionID}`);
    if (res.status === 200) {
      alert("Xóa thành công");
    } else {
      alert("Xóa thất bại");
    }
  };
  const handleOkDescriptionModal = async () => {
    const res = await instance.delete(`auction/delete/${auctionID}`);
    if (res.status === 200) {
      alert("Xóa thành công");
    } else {
      alert("Xóa thất bại");
    }
  };
  const [visibleDeleteModal, setVisibleDeleteModal] = React.useState(false);
  const showModalDelete = () => {
    setVisibleDeleteModal(true);
  };

  const handleCancelDeleteModal = () => {
    console.log("Clicked cancel button");
    setVisibleDeleteModal(false);
  };

  const [visibleDescriptionModal, setvisibleDescriptionModal] =
    React.useState(false);
  const showModalDescription = () => {
    setvisibleDescriptionModal(true);
  };

  const handleCancelDescriptionModal = () => {
    console.log("Clicked cancel button");
    setvisibleDescriptionModal(false);
  };

  const columns = [
    {
      title: "Thời điểm",
      dataIndex: "datecreate",
      key: "time",
    },
    {
      title: "Người mua",
      dataIndex: "name",
      key: "bidder",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành động",
      key: "action",
      width: "15%",
      render: (text, record) => (
        <Space size="middle">
          <Button
            key={`a-${record.id}`}
            type="primary"
            shape="round"
            style={{ marginRight: "10px", border: "none" }}
            onClick={() => {
              setAuctionID(record.id);
              showModalDelete();
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const [usersauction, setUserauction] = useState([]);
  const [highest_user, setHighest_user] = useState(null);
  const location = useLocation();
  const { item } = location.state;
  useEffect(() => {
    const fetchUser = async () => {
      const res_user = await instance(`/auction/product/${item.id}`);
      setHighest_user(
        res_user.data
          .sort((first, second) => {
            return first.price < second.price ? 1 : -1;
          })
          .slice(0, 1)
          .map((item) => {
            return item;
          })
      );
      
      setUserauction(res_user.data);
    };
    fetchUser();
  }, []);

  const commentChange = (e) => {
    setComment(e.target.value);
  };
  const onFinishSubmitComment = async () => {
    console.log(highest_user);
    const data = {
      productId: item.id,
      sellerId: localStorage.userID,
      userId: highest_user[0].id,
      comment: comment,
    };
    console.log(data);
    const res = await instance.post("comment/add", data);
    if (res.status === 200) {
      notification.open({
        message: "Trạng thái",
        description: "Gửi thành công cho người chiến thắng",
        className: "custom-class",
        style: {
          width: 600,
        },
      });
    }
  };

  return (
    <>
      <Descriptions
        bordered
        title={`Thông tin của sản phẩm ${item.name}`}
        extra={
          <Button
            type="primary"
            onClick={() => {
              showModalDescription();
            }}
          >
            Edit
          </Button>
        }
      >
        <Descriptions.Item label="Tên">{item.name}</Descriptions.Item>
        <Descriptions.Item label="Người ra giá cao nhất">
          {usersauction
            .sort((first, second) => {
              return first.price < second.price ? 1 : -1;
            })
            .slice(0, 1)
            .map((item) => {
              return item.name;
            })}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian kết thúc">
          {item.dateend}
        </Descriptions.Item>
        <Descriptions.Item label="Giá hiện tại">{item.price}</Descriptions.Item>
        <Descriptions.Item label="Giá khởi điểm">
          {item.price}
        </Descriptions.Item>
        <Descriptions.Item label="Giá mua ngay">
          {item.pricebuy}
        </Descriptions.Item>
        <Descriptions.Item label="Tình trạng" span={3}>
          {Date.parse(item.dateend) > Date.now() ? (
            <Badge status="processing" text="Đang đăng bán" />
          ) : (
            <Badge status="error" text="Đã hết hạn" />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Những người mua" span={3}>
          <Table
            dataSource={usersauction.sort((first, second) => {
              return first.price < second.price ? 1 : -1;
            })}
            columns={columns}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Gửi tin nhắn" span={3}>
          <Form onFinish={onFinishSubmitComment}>
            <Row gutter={24}>
              <Col span={20}>
                <Form.Item
                  name="Comment"
                  rules={[
                    {
                      required: true,
                      message: "Nhập comment cho người thắng!",
                    },
                  ]}
                >
                  <TextArea
                    showCount
                    maxLength={100}
                    style={{ width: "100%" }}
                    onChange={commentChange}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Gửi
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Descriptions
        title="Đánh giá nhận xét"
        extra={<LikeOutlined />}
      ></Descriptions>
      <Modal
        title="Xác nhận"
        visible={visibleDeleteModal}
        onOk={handleOkDeleteModal}
        onCancel={handleCancelDeleteModal}
        okText="Xác nhận"
        cancelText="Hủy"
        okType="danger"
      >
        <p>Xóa khách hàng này?</p>
      </Modal>
      <Modal
        title="Bổ sung thông tin mô tả"
        visible={visibleDescriptionModal}
        onOk={handleOkDescriptionModal}
        onCancel={handleCancelDescriptionModal}
        okText="Xác nhận"
        cancelText="Hủy"
        okType="danger"
        width={1000}
      >
        <ComplementaryDescription id={item.id}></ComplementaryDescription>
      </Modal>
    </>
  );
}
