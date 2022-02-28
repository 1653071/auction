import styled from "styled-components";
export const NavigationWrapper = styled.div`
  display: flex;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #8d5524;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 2;
  &.normal{
      
  }
  &.sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
`;
export const Seller = styled.div`
  display: inline-block;
  padding-right: 10px;
  .seller-text {
    display: inline-block;
    padding-left: 10px;
    font-weight: 900;
    color: white;
  }
`;
export const Cart = styled.div`
  display: inline-block;
  padding-right: 10px;
  .cart-text {
    display: inline-block;
    padding-left: 10px;
    font-weight: 900;
    color: white;
  }
`;
export const List = styled.div`
  padding-right: 50px;
  display: inline-block;
  .cart-text {
    display: inline-block;
    padding-left: 10px;
    font-weight: 900;
    color: white;
  }
`;
export const AvatarWrapper = styled.div`
  display: inline-block;
  .name {
    display: inline-block;
    padding-left: 10px;
    font-weight: 900;
    color: white;
  }
`;
export const AuthWrapper = styled.div`
  width: 40%;
  display: inline-block;
  padding-top: 10px;
`;
