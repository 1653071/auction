import React,{useEffect,useState,useContext} from "react";

import { Card, Row, Col, Image } from "antd";
import { WinnerAuctionWrapper,Title } from "./WinnerAuction.style";
import { instance } from "../../../ultils/ultils";

export default function WinnerAuction() {
  const [winnerList,setwinnerList] = useState([]);
  const [products,setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(`/auction/winner/${localStorage.userID}`)
      const res_p =await instance.get(`/products`)
      console.log(res.data)
      console.log(res_p.data)
      setwinnerList(res.data)
      setProducts(res_p.data)
    }
    fetchData()
  }, [])
  const fetch = async (id)=>{
   await instance.get(`/products/${id}`).then(res=>{
        return res.data;
    })
    
  }
  return (
    <WinnerAuctionWrapper>
      <Card title="Card title">
        {winnerList.map(function(item1) {
         const p = products.filter(item=> item.id==item1.productId)
         console.log(p)
        return <Card
          style={{ marginTop: 16 }}
          type="inner"
          key={item1.productId}
          extra={<a href="#">Xem comment</a>}
        >
          <Row gutter={24}>
            <Col span={6}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col span={18}>
              <Title>{item1.price}</Title>
              <Title>{item1.productId}</Title>
            </Col>
          </Row>
        </Card>
        })} 
        
      </Card>
      
    </WinnerAuctionWrapper>
  );
}
