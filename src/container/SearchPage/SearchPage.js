import React from "react";
import { Menu, Dropdown, Button } from "antd";
import ListingGrid from "../../components/ListingGrid/ListingGrid";
import { Pagination } from 'antd';
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

export default function SearchPage() {
  return (
    <>
      <p className="result-title">Kết quả tìm kiếm cho : "Iphone"</p>
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        <Button>bottomLeft</Button>
      </Dropdown>
      <ListingGrid></ListingGrid>
      <Pagination defaultCurrent={1} total={50} />
    </>
  );
}
