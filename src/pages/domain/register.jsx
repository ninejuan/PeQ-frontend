import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../constants/Colors";
import { Properties } from "../../constants/Properties";
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: ${Colors.BACKGROUND};
  color: ${Colors.TEXT};
`;

const Card = styled.div`
  background-color: ${Colors.BACKGROUND_SECONDARY};
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 32px;
  text-align: center;
  color: ${Colors.TEXT};
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: ${Colors.BACKGROUND_THIRD};
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 24px;
  border: 1px solid ${Colors.BORDER};

  &:focus-within {
    border-color: ${Colors.PRIMARY};
  }
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  padding: 12px;
  font-size: 16px;
  color: ${Colors.TEXT};
  outline: none;

  &::placeholder {
    color: ${Colors.TEXT_SECONDARY};
    opacity: 0.7;
  }
`;

const Domain = styled.span`
  padding: 12px;
  color: ${Colors.TEXT_SECONDARY};
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${Colors.PRIMARY};
  color: ${Colors.BACKGROUND};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${Colors.SECONDARY};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: #40c057;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-top: 20px;
`;

const CheckButton = styled(Button)`
  background-color: ${Colors.BACKGROUND_THIRD};
  color: ${Colors.TEXT};

  &:hover {
    background-color: ${Colors.BACKGROUND_FOURTH};
  }
`;

const RegisterButton = styled(Button)`
  background-color: ${Colors.PRIMARY};
  opacity: ${(props) => (!props.isAvailable || props.isChecking ? 0.6 : 1)};
  cursor: ${(props) =>
    !props.isAvailable || props.isChecking ? "not-allowed" : "pointer"};
`;

const DomainRegister = () => {
  const navigate = useNavigate();
  const [subdomain, setSubdomain] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");

  const validateDomain = (domain) => {
    const regex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
    return {
      isValid: regex.test(domain),
      message: regex.test(domain)
        ? ""
        : "영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다.",
    };
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSubdomain(value);

    if (value) {
      const validation = validateDomain(value);
      if (!validation.isValid) {
        setError(validation.message);
        setIsAvailable(null);
      } else {
        setError("");
      }
    } else {
      setError("");
      setIsAvailable(null);
    }
  };

  const checkAvailability = async () => {
    if (!subdomain) return;

    const validation = validateDomain(subdomain);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setIsChecking(true);
    setError("");

    try {
      const response = await fetch(
        `${Properties.API_URL}/domain/available/${subdomain}`
      );
      const data = await response.json();
      setIsAvailable(data);
      if (!data) {
        setError("이미 사용중인 도메인입니다.");
      }
    } catch (err) {
      setError("도메인 확인 중 오류가 발생했습니다.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleReset = () => {
    setSubdomain("");
    setIsAvailable(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    if (!isAvailable) return;
    console.log("available");
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.log("no accessToken");
      setError("로그인이 필요한 서비스입니다.");
      return;
    }
    console.log("accessable");

    try {
      const response = await fetch(`${Properties.API_URL}/domain/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          subdomain: subdomain,
        }),
        credentials: "include",
      });
      console.log("response", response);

      if (!response.ok) {
        console.log("response not ok");
        throw new Error("도메인 등록에 실패했습니다.");
      }

      const data = await response.json();
      console.log("data", data);
      setError("");
      alert("도메인이 성공적으로 등록되었습니다!");
      handleReset();
    } catch (err) {
      console.log("error");
      setError(err.message || "도메인 등록 중 오류가 발생했습니다.");
    }
  };

  const handleCheck = (e) => {
    e.preventDefault();
    checkAvailability();
  };

  return (
    <Container>
      <Card>
        <Title>도메인 등록</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              value={subdomain}
              onChange={handleInputChange}
              placeholder="원하는 도메인 입력"
            />
            <Domain>.peq.us</Domain>
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {isAvailable && (
            <SuccessMessage>등록 가능한 도메인입니다!</SuccessMessage>
          )}
          <ButtonGroup>
            <CheckButton
              type="button"
              onClick={handleCheck}
              disabled={isChecking || !subdomain || !!error}
            >
              {isChecking ? "확인 중..." : "도메인 확인하기"}
            </CheckButton>
            <RegisterButton
              type="submit"
              isAvailable={isAvailable}
              isChecking={isChecking}
              disabled={!isAvailable || isChecking || !!error}
            >
              등록하기
            </RegisterButton>
          </ButtonGroup>
        </form>
      </Card>
    </Container>
  );
};

export default DomainRegister;
