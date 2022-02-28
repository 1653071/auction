import React,{useState} from "react";
import { Avatar,Menu, Button } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import {
  InvidualWrapper,
  AvatarWrapper,
  InformationWrapper,
  MenuWrapper,
  Name,
  Email,
  Title,
  
} from "./Invidual.style";

import {
  AppstoreOutlined,
  
  ContainerOutlined,
  MailOutlined,
  AuditOutlined,
  LikeOutlined
} from '@ant-design/icons';

import Profile from "./Profile/Profile";
import WatchList from "./WatchList/WatchList";
import AuctionProduct from "./Auction/Auction";
import WinnerAuction from "./WinnerAuction/WinnerAuction";
const { SubMenu } = Menu;

export default function Invidual() {
  const date =  new Date();
  const [selectedMenuItem, setSelectedMenuItem]= useState('1');
  const componentsSwitch = (key) => {
    switch (key) {
      case '1':
        return (<>
        <Title>Hồ sơ của tôi</Title>
        <Profile /></>);
      case '2':
        return (<>
          <Title>Danh sách yêu thích</Title>
          <WatchList /></>);
      case '3':
        return (<>
          <Title>Danh sách đang đấu giá</Title>
          <AuctionProduct /></>);
      default:
        return (<>
          <Title>Danh sách đấu giá thắng</Title>
          <WinnerAuction /></>);
     }
    };
  return (
    
      <InvidualWrapper>
      <AvatarWrapper>
        <Avatar size={64} icon={<UserOutlined />} />
        <Name>{date.getDay()}</Name>
        <Email>{localStorage.name}</Email>
        <MenuWrapper>
        <Menu
          defaultSelectedKeys={selectedMenuItem}
          defaultOpenKeys={['sub1']}
          mode="inline"
          onClick={(e) => 
            setSelectedMenuItem(e.key)}
          
        >
          <Menu.Item key="1" icon={<AuditOutlined />}>
            Hồ sơ của tôi
          
          </Menu.Item>
          <Menu.Item key="2" icon={<LikeOutlined />}>
            Danh sách sản phẩm yêu thích
          </Menu.Item>
          
          <SubMenu key="sub1" icon={<MailOutlined />} title="Danh sách sản phẩm">
            <Menu.Item key="3">Đang đấu giá</Menu.Item>
            <Menu.Item key="4">Đã hoàn thành</Menu.Item>
           
          </SubMenu>
         
        </Menu>
        </MenuWrapper>
      </AvatarWrapper>
      <InformationWrapper>
     
             {componentsSwitch(selectedMenuItem)}
                          
                       
      </InformationWrapper>
    </InvidualWrapper>
   
  );
}
