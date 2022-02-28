import React from "react";
import { Table } from "antd";
import { Typography } from "antd";

import { HistoryContent, HistoryWrapper } from "./History.style";
const { Title } = Typography;
export default function History({ user }) {
  console.log(user);
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
      render: (e) => {
        return "****" + e.substring(Math.floor(e.length/2),0);
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
  ];
  return (
    <HistoryWrapper>
      <Title level={4} style={{ textAlign: "center" }}>
        Người đã ra giá
      </Title>
      <HistoryContent>
        <Table
          dataSource={user.sort((first, second) => {
            return first.price < second.price ? 1 : -1;
          })}
          columns={columns}
        />
      </HistoryContent>
    </HistoryWrapper>
  );
}
