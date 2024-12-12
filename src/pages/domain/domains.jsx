import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { Properties } from "../../constants/Properties";
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: ${Colors.BACKGROUND};
  color: ${Colors.TEXT};
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${Colors.TEXT};
  letter-spacing: -0.5px;
`;

const CreateButton = styled(Link)`
  padding: 12px 24px;
  background-color: ${Colors.PRIMARY};
  color: ${Colors.TEXT};
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DomainTable = styled.div`
  background-color: ${Colors.BACKGROUND_SECONDARY};
  border-radius: 16px;
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  padding: 16px 24px;
  background-color: ${Colors.BACKGROUND_THIRD};
  border-bottom: 1px solid ${Colors.BORDER};
  gap: 16px;
`;

const TableColumn = styled.div`
  color: ${Colors.TEXT_SECONDARY};
  font-size: 14px;
  font-weight: 600;
`;

const DomainRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  padding: 20px 24px;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid ${Colors.BORDER};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${Colors.BACKGROUND_THIRD};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const DomainNameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DomainText = styled.span`
  font-weight: 600;
  color: ${Colors.TEXT};
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background-color: rgba(64, 192, 87, 0.1);
  color: #40c057;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled(Link)`
  padding: 8px;
  border-radius: 8px;
  color: ${Colors.TEXT_SECONDARY};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${Colors.BACKGROUND_FOURTH};
    color: ${Colors.TEXT};
  }
`;

const DomainIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${Colors.BACKGROUND_FOURTH};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${Colors.PRIMARY};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  border-radius: 16px;
  margin: 40px auto;
  max-width: 500px;
`;

const EmptyStateTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${Colors.TEXT};
`;

const EmptyStateText = styled.p`
  color: ${Colors.TEXT_SECONDARY};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const Domains = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch(`${Properties.API_URL}/auth/myinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error("도메인 목록을 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setDomains(data.domains || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const alertUnavailableAlert = () => {
    alert("도메인 설정 모달은 준비중입니다!");
  };

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (loading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>내 도메인</Title>
        <CreateButton to="/domain/register">새 도메인 등록</CreateButton>
      </Header>

      {domains.length > 0 ? (
        <DomainTable>
          <TableHeader>
            <TableColumn>도메인</TableColumn>
            <TableColumn>생성일</TableColumn>
            <TableColumn>만료일</TableColumn>
            <TableColumn>상태</TableColumn>
            <TableColumn>관리</TableColumn>
          </TableHeader>
          {domains.map((domain, index) => (
            <DomainRow
              key={index}
              onClick={() =>
                (window.location.href = `/domain/manage/${
                  domain?.subdomain_name || ""
                }`)
              }
              to={`/domain/manage/${domain?.subdomain_name || ""}`}
              style={{ cursor: "pointer" }}
            >
              <DomainNameCell>
                <DomainIcon>
                  {domain?.subdomain_name?.[0]?.toUpperCase() || "?"}
                </DomainIcon>
                <DomainText>
                  {domain?.subdomain_name || "알 수 없는 도메인"}.peq.us
                </DomainText>
              </DomainNameCell>
              <div>
                {domain?.create_date
                  ? new Date(domain.create_date).toLocaleDateString()
                  : "정보 없음"}
              </div>
              <div>
                {domain?.expire_date
                  ? new Date(domain.expire_date).toLocaleDateString()
                  : "정보 없음"}
              </div>
              <StatusBadge>활성</StatusBadge>
              <ActionGroup>
                <IconButton
                  to={`/domain/manage/${domain?.subdomain_name || ""}`}
                >
                  레코드
                </IconButton>
                <IconButton
                  //   to={`/domain/settings/${domain?.subdomain_name || ""}`}
                  style={{ color: Colors.PRIMARY }}
                  onClick={alertUnavailableAlert}
                >
                  설정
                </IconButton>
              </ActionGroup>
            </DomainRow>
          ))}
        </DomainTable>
      ) : (
        <EmptyState>
          <EmptyStateTitle>등록된 도메인이 없습니다</EmptyStateTitle>
          <EmptyStateText>
            새로운 도메인을 등록하고 무료로 관리해보세요.
            <br />
            무제한 서브도메인과 SSL 인증서를 제공합니다.
          </EmptyStateText>
          <CreateButton to="/domain/register">도메인 등록하기</CreateButton>
        </EmptyState>
      )}
    </Container>
  );
};

export default Domains;
