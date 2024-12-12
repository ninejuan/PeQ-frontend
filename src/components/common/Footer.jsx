import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  padding: 24px 0;
  margin-top: auto; // 이 부분이 중요합니다
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Copyright = styled.p`
  color: ${Colors.TEXT_SECONDARY};
  font-size: 14px;
`;

const Links = styled.div`
  display: flex;
  gap: 24px;
`;

const Link = styled.a`
  color: ${Colors.TEXT_SECONDARY};
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;

  &:hover {
    color: ${Colors.TEXT};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <Copyright>© 2024 Juan Lee. All rights reserved.</Copyright>
        <Links>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
          <Link href="https://github.com/ninejuan" target="_blank">
            GitHub
          </Link>
        </Links>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
