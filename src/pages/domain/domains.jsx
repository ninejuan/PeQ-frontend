import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Properties } from "../../constants/Properties";
import { Colors } from "../../constants/Colors";
import Cookies from "js-cookie";
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${Colors.BACKGROUND};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${Colors.TEXT_PRIMARY};
  margin-bottom: 2rem;
  text-align: center;
`;

const DomainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DomainCard = styled(motion.div)`
  background: ${Colors.BACKGROUND_SECONDARY};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const DomainName = styled.h3`
  font-size: 1.2rem;
  color: ${Colors.TEXT_PRIMARY};
  margin-bottom: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${Colors.TEXT_SECONDARY};
  font-size: 1.2rem;
`;

const Domains = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await fetch(`${Properties.API_URL}/auth/myinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setDomains(data.domains || []);
    } catch (error) {
      console.error("도메인 정보를 불러오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDomainClick = (domain) => {
    navigate(`/domain/manage/${domain}`);
  };

  if (loading) {
    return (
      <Container>
        <EmptyState>도메인 정보를 불러오는 중...</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>내 도메인 목록</Title>
      {domains.length === 0 ? (
        <EmptyState>
          등록된 도메인이 없습니다. 새로운 도메인을 등록해보세요!
        </EmptyState>
      ) : (
        <DomainGrid>
          {domains.map((domain, index) => (
            <DomainCard
              key={domain}
              onClick={() => handleDomainClick(domain)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <DomainName>{domain}</DomainName>
            </DomainCard>
          ))}
        </DomainGrid>
      )}
    </Container>
  );
};

export default Domains;
