import React, { useContext, useReducer, useEffect, useState } from "react";
import { Input, Space, Row, Col } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import appContext from "../../context/ProductContext";
import { SearchWrapper } from "./SearchBar.style";
const { Search } = Input;
const onSearch = (value) => console.log(value);

export default function SearchBar(props) {
  const { dispatch } = useContext(appContext);
  const [term, setTerm] = useState("");
  useEffect(
    function () {
      dispatch({
        type: "update_filter",
        payload: term,
      });
    },
    [term, dispatch]
  );

  const btnClear_Clicked = function (e) {
    setTerm("");
  };
  const txtTerm_Changed = function (e) {
    setTerm(e.target.value);
  };
  return (
    <SearchWrapper>
      <Row gutter={24} width={"100%"} style={{width:"100%"}}>
        <Col span={24}>
          <Search
            placeholder="Nhap tim kiem"
            onChange={txtTerm_Changed}
            style={{ width: "100%",margin:"0 auto" }}
          />
        </Col>
        
      </Row>
    </SearchWrapper>
  );
}
