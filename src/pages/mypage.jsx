import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Colors } from "../constants/Colors";
import { Properties } from "../constants/Properties";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Card = styled.div`
  background: ${Colors.BACKGROUND_SECONDARY};
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${Colors.TEXT};
  margin-bottom: 24px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${Colors.TEXT};
  margin-bottom: 8px;
`;

const Email = styled.p`
  color: ${Colors.TEXT_SECONDARY};
  font-size: 16px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 24px;
`;

const InfoItem = styled.div`
  background: ${Colors.BACKGROUND_FOURTH};
  padding: 20px;
  border-radius: 16px;
`;

const InfoLabel = styled.div`
  color: ${Colors.TEXT_SECONDARY};
  font-size: 14px;
  margin-bottom: 8px;
`;

const InfoValue = styled.div`
  color: ${Colors.TEXT};
  font-size: 16px;
  font-weight: 500;
`;

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${Properties.API_URL}/auth/myinfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }

        if (!response.ok) {
          throw new Error("사용자 정보를 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (loading) {
    return (
      <Container>
        <Card>
          <div>Loading...</div>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>내 프로필</Title>
        <ProfileSection>
          <Avatar src={userInfo?.profilePhoto} alt="프로필 이미지" />
          <UserInfo>
            <Name>{userInfo?.name}</Name>
            <Email>{userInfo?.google_mail}</Email>
          </UserInfo>
        </ProfileSection>

        <InfoGrid>
          <InfoItem>
            <InfoLabel>가입일</InfoLabel>
            <InfoValue>
              {new Date(userInfo?.create_date).toLocaleDateString()}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>보유 도메인 수</InfoLabel>
            <InfoValue>{userInfo?.domains?.length || 0}개</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Card>
    </Container>
  );
};

export default Mypage;
