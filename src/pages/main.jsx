import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: #4299e1;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 4px 6px rgba(66, 153, 225, 0.2);

  &:hover {
    background: #3182ce;
    transform: translateY(-2px);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Main = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        PeQ 도메인 관리 서비스
      </Title>

      <Description
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        간편하고 직관적인 도메인 관리 솔루션을 경험해보세요. DNS 레코드 관리부터
        서브도메인 설정까지, 모든 것을 한 곳에서 관리할 수 있습니다.
      </Description>

      <Button
        onClick={() => navigate("/domain/manage")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        도메인 관리하기
      </Button>

      <FeatureGrid>
        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>간편한 DNS 관리</h3>
          <p>직관적인 인터페이스로 DNS 레코드를 쉽게 관리하세요</p>
        </FeatureCard>

        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3>실시간 업데이트</h3>
          <p>변경사항이 실시간으로 반영되어 즉시 확인 가능합니다</p>
        </FeatureCard>

        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3>안전한 보안</h3>
          <p>SSL/TLS 인증서로 안전한 도메인 관리를 보장합니다</p>
        </FeatureCard>
      </FeatureGrid>
    </MainContainer>
  );
};

export default Main;
