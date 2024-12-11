import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "../constants/Colors";
import { Properties } from "../constants/Properties";
import GoogleLogo from "../assets/google_sso_icon.svg";
import PeQLogo from "/peq_logo.svg";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  #root {
    height: 100%;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Colors.BACKGROUND};
  padding: 0 20px;
  box-sizing: border-box;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  padding: 40px;
  margin-top: -200px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
`;

const LoginText = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  color: ${Colors.TEXT};
`;

const LoginLogo = styled.img`
  width: 45%;
  height: 45%;
  margin-right: 12px;
  margin-bottom: 20px;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${Colors.BACKGROUND_THIRD};
  border: 1px solid #dadce0;
  border-radius: 6px;
  padding: 12px 24px;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  color: ${Colors.TEXT_SECONDARY};
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: ${Colors.BACKGROUND_FOURTH};
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;

const GoogleSignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    handleRedirect();
  }, []);

  const checkLoginStatus = () => {
    const token = Cookies.get("accessToken");
    setIsLoggedIn(token ? true : false);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${Properties.API_URL}/auth/google`;
  };

  const handleRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      try {
        const response = await fetch(
          `${Properties.API_URL}/auth/google/redirect?code=${code}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          Cookies.set("accessToken", data.accessToken, { expires: 7 });
          setIsLoggedIn(true);

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        } else {
          console.log(response.status);
          console.error("로그인 실패");
        }
      } catch (error) {
        console.error("로그인 처리 중 오류 발생:", error);
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <LoginContainer>
          <LoginLogo src={PeQLogo} />
          <LoginText>Google ID로 {Properties.SERVICE_NAME}에 로그인</LoginText>
          {isLoggedIn ? (
            <div>
              <p style={{ fontSize: "20px" }}>로그인된 상태입니다.</p>
              <Navigate to="/" />
            </div>
          ) : (
            <GoogleButton onClick={handleGoogleLogin}>
              <img src={GoogleLogo} alt="Google logo" />
              Sign in with Google
            </GoogleButton>
          )}
        </LoginContainer>
      </PageContainer>
    </>
  );
};

export default GoogleSignIn;
