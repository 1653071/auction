import React, {useContext} from "react";
import { Row, Col, Divider } from "antd";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ProductCard from "../../../components/ProductCard/ProductCard";
import TodoAppContext from '../../../context/ProductContext';
const style = { background: "#0092ff", padding: "8px 0" };

export default function GridProduct(props) {
  const {store} = useContext(TodoAppContext);
  const { items, query } = store;
  console.log(props.filter);
  function renderTable(tableInfo) {
    let Component;
    switch (tableInfo) {
    
      case 'expired':
        Component= items.filter((item) =>  Date.parse(item.dateend)> Date.now()).sort((first, second) => {
          return (Date.parse(first.dateend)-Date.parse(first.datecreate)) < (Date.parse(second.dateend)-Date.parse(second.datecreate)) ? 1 : -1;
        }).slice(0,5).map((item) =>(
        <Col className="gutter-row" span={4}>
          <ProductCard item={item} key={item.id} />
        </Col>
        ))
      break;
      case "highestprice":
        Component= items.sort((first, second) => {
          return first.price < second.price ? 1 : -1;
        }).filter((item) => Date.parse(item.dateend)< Date.now()).slice(0,5).map((item) =>(
        <Col className="gutter-row" span={4}>
          <ProductCard item={item} key={item.id} />
        </Col>
        ))
      break;
      default:
        Component= items.sort((first, second) => {
          return first.price < second.price ? 1 : -1;
        }).filter((item) => Date.parse(item.dateend)< Date.now()).slice(0,5).map((item) =>(
        <Col className="gutter-row" span={4}>
          <ProductCard item={item} key={item.id} />
        </Col>
        ))
      break;
      

    }
    return Component;
  }
  return (
    <> 
      <SectionTitle title={props.title} />
      
      <Row justify="center" gutter={16}>
        {
        renderTable(props.filter)
        }
        
      </Row>
      
      
      
    </>
  );
}
