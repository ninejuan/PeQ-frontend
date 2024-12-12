import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MenuLayouts = () => {
  return (
    <LayoutWrapper>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </LayoutWrapper>
  );
};

export default MenuLayouts;
