import React, { useState ,useEffect} from "react";
import {
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  LikeOutlined,
} from "@ant-design/icons";
import { Typography, Button, Row, Col, Input, InputNumber, Modal } from "antd";
import {
  InformationWrapper,
  Contractor,
  Price,
  ContractorWrapper,
  PriceWrapper,
  HeadTitle,
  Time,
  Auction,
  AuctionInfo,
  DateWrapper,
  Right,
  SelectPriceWrapper,
} from "./Information.style";
import { instance } from "../../../ultils/ultils";
const { Title } = Typography;
export default function Information(props) {
  const auctionSubmit = () => {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [priceauction,SetPriceAuction] = useState();
  const [time,setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.parse(props.item.dateend)-Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [])
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const auctionClick = async () =>{
    if(!localStorage.accessToken){
      return alert("Đăng nhập để đấu giá");
    }
    const date = new Date();
    const payload= {
      productId:props.item.id,
      price: priceauction,
      userId: localStorage.userID,
      sellerId: props.item.sellerId,
      datecreate: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      name:localStorage.name
    }
    await instance.post(`/auction/add`,payload).then((res)=>{
        if(res.status === 200){
          alert("Đấu giá thành công")
        }
        else{
          alert("Đấu giá thất bại")
        }
    })
  }
  const onChangePrice = e => {
    SetPriceAuction(e);
  };
  const addToWatchList = async () => {
    const data = {
      productId: props.item.id,
      userId: localStorage.userID,
      name: props.item.name,
      image: props.item.image[0]
    };
    const res = await instance.post("watchlist/add", data);
    if (res.status === 200) {
      alert("Them thành công");
    } else if (res.status === 204) {
      alert("Thêm thất bại");
    }
  };
  return (
    <InformationWrapper>
      <Row gutter={24}>
        <Col span={20}><Title
        level={4}
        style={{ fontWeight: "bold", color: "#994C00", fontFamily: "Arial" }}
      >
        {props.item.name}
      </Title></Col>
      <Col span={4}>
      <Button
          type="primary"
          shape="circle"
          onClick={addToWatchList}
          icon={<LikeOutlined></LikeOutlined>}
        >
       
        </Button></Col>
      </Row>
      <AuctionInfo>
        <Row gutter={24} style={{ paddingBottom: "20px" }}>
          <Col span={8}>Thời gian</Col>
          <Col span={16}>
            <DateWrapper>Từ {props.item.datecreated} đến {props.item.dateend}</DateWrapper>
          </Col>
        </Row>
        <Row gutter={24}>
          {Date.parse(props.item.dateend) > Date.now() ? (
            <>
            <Col span={8}>Còn lại</Col>
            <Col span={16}>
              <Time>{Math.floor(time / 86400000)} ngày {Math.floor((time % 86400000) / 3600000)} : {Math.floor(((time % 86400000) % 3600000) / 60000)}: {Math.floor(((time % 86400000)%60000)/1000)}</Time>
            </Col>
            </>
          ):(
            <><Col span={8}>Còn lại</Col>
            <Col span={16}>
            <Time>Hết hạn</Time>
          </Col></>
          )}
        </Row>
        

        <ContractorWrapper>
          <HeadTitle>Giá khởi điểm</HeadTitle>
          <Contractor>{props.item.price}</Contractor>
        </ContractorWrapper>
        <PriceWrapper>
          <HeadTitle>Giá cao nhất hiện tại</HeadTitle>
          <Price>{props.item.price}</Price>
        </PriceWrapper>
      </AuctionInfo>
      <Auction>
        <form onSubmit={auctionSubmit}>
          <SelectPriceWrapper>
            <InputNumber onChange={onChangePrice} defaultValue={props.item.price} step={props.item.jump} />
          </SelectPriceWrapper>
          <Button  className="auction" onClick={auctionClick}>
            Đấu giá
          </Button>
        </form>
      </Auction>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {`Đồng ý đấu giá với số tiền 1000`}
      </Modal>
    </InformationWrapper>
  );
}
