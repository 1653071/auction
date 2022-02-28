import React,{useEffect,useState} from "react";

import { Card, Row, Col, Image } from "antd";
import { WatchListWrapper ,Title} from "./WatchList.style";
import {instance} from "../../../ultils/ultils"
export default function WatchList() {
  const [watchList,setWatchList] = useState([]);
  const [data,setData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const res = await instance(`watchlist/user/${localStorage.userID}`);
      setWatchList(res.data)
    }
    fetchData()
  }, [])
  const fetch_product = async(id)=>{
   await instance(`products/${id}`).then(res=>setData(res.data));
    
  }
  return (
    <WatchListWrapper>
      <Card>
        {watchList.map(function(item) {
        
         return <Card
          style={{ marginTop: 16 }}
          type="inner"
        
          extra={<a href="#">Xem chi tiết</a>}
        >
          <Row gutter={24}>
            <Col span={6}>
              <Image
                width={200}
                src={item.image}
              />
            </Col>
            <Col span={18}>
              <Title>{item.nameproduct}</Title>
            </Col>
          </Row>
        </Card>
        })}
        
      </Card>
      
    </WatchListWrapper>
  );
}
