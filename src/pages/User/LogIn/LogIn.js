import React from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL } from "../../../config";

function LogIn() {
  return (
    <Wrapper>
      <ButtonTitleLayout>
        <ContentLayout>
          <LogoLayout>
            <Logo src="/images/weclass_logo.png" />
          </LogoLayout>
          <LogoTitle>
            <Title>
              준비물까지 챙겨주는
              <br /> 온라인 클래스
            </Title>
          </LogoTitle>
          <ButtonWrapper>
            <KakaoAuthUrl href={KAKAO_AUTH_URL}>
              <SocialLoghinButton>
                카카오로 3초만에 로그인하기
              </SocialLoghinButton>
            </KakaoAuthUrl>
            <LoghinButton>다른 방법으로 로그인하기</LoghinButton>
          </ButtonWrapper>
        </ContentLayout>
      </ButtonTitleLayout>
      <MainImg src="/images/login_img_02.jpeg" />
    </Wrapper>
  );
}

export default LogIn;

const Wrapper = styled.div`
  display: flex;
`;

const ButtonTitleLayout = styled.div`
  position: relative;
  width: 50%;
  height: 100vh;
  padding: 80px 24px;
`;

const LogoTitle = styled.div`
  margin-bottom: 30px;
`;

const LogoLayout = styled.div`
  margin-bottom: 50px;
`;

const ContentLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.88 1 0%;
  margin: 0 auto;
  align-items: center;
`;

const SocialLoghinButton = styled.button`
  width: 360px;
  height: 40px;
  background-color: #ffe810;
  border: none;
  align-items: center;
  border: none;
  margin: 2px;
  font-weight: bold;
  text-decoration: none;
`;

const KakaoAuthUrl = styled.a`
  text-decoration: none;
`;

const LoghinButton = styled.button`
  width: 360px;
  height: 40px;
  background-color: #f8f8f8;
  border: none;
  align-items: center;
  border: none;
  margin: 2px;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 40px;
  text-align: left;
`;

const MainImg = styled.img`
  flex: 1 1 0%;
  height: 100vh;
  object-fit: cover;
`;

const Logo = styled.img`
  width: 120px;
`;
