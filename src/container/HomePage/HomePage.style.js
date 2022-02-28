import styled from "styled-components";
export const SearchbarWrapper = styled.div`
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 2% ;
  width: 80%;
  position: absolute;
  bottom :0;
  left: 50%;
  transform: translate(-50%, 20%);
  background-color:white;
  z-index:1;
  box-shadow:0 6px 20px rgba(0, 0, 0,0.1);
  border-radius:5px;
  .notice{
      color: white;
      text-align:left;
      font-size:16px;
      font-weight:bold;
      padding-top:2px;
  }
`;
export const ProductArea= styled.div`
    margin-top: 60px;
    width: 90%;
    margin: 0 auto;
`;