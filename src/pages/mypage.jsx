import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../constants/Colors";
import { Properties } from "../constants/Properties";
import Cookies from "js-cookie";

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ProfileSection = styled.div`
  background-color: ${Colors.BACKGROUND_SECONDARY};
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 40px;
  display: flex;
  gap: 32px;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  object-fit: cover;
  border: 4px solid ${Colors.BACKGROUND_FOURTH};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${Colors.TEXT};
  margin-bottom: 8px;
`;

const Email = styled.p`
  font-size: 16px;
  color: ${Colors.TEXT_SECONDARY};
  margin-bottom: 16px;
`;

const StatsCard = styled.div`
  background-color: ${Colors.BACKGROUND_SECONDARY};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${Colors.BACKGROUND_FOURTH};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.PRIMARY};
  font-size: 24px;
  font-weight: 600;
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${Colors.TEXT};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${Colors.TEXT_SECONDARY};
`;

const InfoList = styled.div`
  background-color: ${Colors.BACKGROUND_SECONDARY};
  border-radius: 16px;
  padding: 24px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid ${Colors.BORDER};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: ${Colors.TEXT_SECONDARY};
`;

const InfoValue = styled.span`
  color: ${Colors.TEXT};
  font-weight: 500;
`;

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      return <Navigate to="/signin" replace />;
    }

    try {
      const response = await fetch(`${Properties.API_URL}/auth/myinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <Container>
      <ProfileSection>
        <ProfileImage src={userData.profilePhoto} alt={userData.name} />
        <ProfileInfo>
          <Name>{userData.name}</Name>
          <Email>{userData.google_mail}</Email>
        </ProfileInfo>
      </ProfileSection>

      <StatsCard
        style={{ cursor: "pointer" }}
        onClick={() => (window.location.href = "/domains")}
      >
        <StatIcon>D</StatIcon>
        <StatInfo>
          <StatValue>{userData.domains?.length || 0}</StatValue>
          <StatLabel>등록된 도메인</StatLabel>
        </StatInfo>
      </StatsCard>

      <InfoList>
        <InfoItem>
          <InfoLabel>이름</InfoLabel>
          <InfoValue>{userData.name}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>이메일</InfoLabel>
          <InfoValue>{userData.google_mail}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>가입일</InfoLabel>
          <InfoValue>
            {new Date(userData.create_date).toLocaleDateString()}
          </InfoValue>
        </InfoItem>
      </InfoList>
    </Container>
  );
};

export default MyPage;
