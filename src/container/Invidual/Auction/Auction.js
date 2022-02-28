import React, { useEffect, useState } from "react";
import { AuctionWrapper } from "./Auction.style";
import { Space, Table, Tag } from "antd";
import { instance } from "../../../ultils/ultils";
export default function AuctionProduct() {
  const [auction, setAuction] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await instance(`auction/user/${localStorage.userID}`);
      setAuction(res.data);
    };
    fetchData();
  }, []);
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Giá bạn ra",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ngày",
      dataIndex: "datecreate",
      key: "price",
      
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <AuctionWrapper>
      <Table columns={columns} dataSource={auction} />
    </AuctionWrapper>
  );
}
