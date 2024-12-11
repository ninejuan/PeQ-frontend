import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const MenuLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden; // 가로 스크롤 방지
`;

function MenuLayout() {
  return (
    <MenuLayoutContainer>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </MenuLayoutContainer>
  );
}

export default MenuLayout;
