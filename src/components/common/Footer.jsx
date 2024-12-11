import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../constants/Colors";

const FooterContainer = styled.div`
  width: 100%;
  height: 81px;
  border-top: 1px solid #ededed;
  display: flex;
  background-color: ${Colors.BACKGROUND};
  color: ${Colors.TEXT};
  padding: 0 20px; // 모바일에서 좌우 여백

  @media (max-width: 767px) {
    padding: 0 10px;
  }
`;

const FooterItem = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FooterItemText = styled.div`
  font-size: 15px;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.12px;
  font-weight: 700;

  ${(props) => props.$customStyle}
`;

const Emphasis = styled.strong`
  color: ${Colors.SECONDARY};
  cursor: pointer;
`;

function Footer() {
  const navigate = useNavigate();
  return (
    <FooterContainer>
      <FooterItem>
        <FooterItemText>
          Copyright 2024{" "}
          <Emphasis onClick={() => window.open("https://juany.dev")}>
            Juan Lee
          </Emphasis>
          , All rights reserved.
        </FooterItemText>
      </FooterItem>
    </FooterContainer>
  );
}

export default Footer;
