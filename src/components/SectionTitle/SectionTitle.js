import React from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import auctionimage from "./auction.png";
import { PageHeader, Image } from "antd";

import {
  Icon,
  Line,
  LineLeft,
  LineRight,
  SectionTitleWrapper,
  Wrapper,
} from "./SectionTitle.style";
export default function SectionTitle(props) {
  return (
    <Wrapper>
      <SectionTitleWrapper>{props.title}</SectionTitleWrapper>
      <Line>
        <LineRight />
        <Image src={auctionimage} width="20px"/>

        <LineLeft />
      </Line>
    </Wrapper>
  );
}
