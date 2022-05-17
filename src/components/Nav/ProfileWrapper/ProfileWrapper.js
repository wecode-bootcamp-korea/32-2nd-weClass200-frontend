import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function ProfileWrapper() {
  const navigate = useNavigate();

  function removeToken() {
    const isLoggedIn = localStorage.getItem("new_token");
    if (isLoggedIn) {
      localStorage.clear();
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  const isTokenCheck = localStorage.getItem("new_token");
  const profileName = localStorage.getItem("name");
  const profileImg = localStorage.getItem("img");

  return (
    <Wrapper>
      {isTokenCheck && (
        <>
          <ProfileTab to="/creator">크리에이터 센터</ProfileTab>
          <ProfileTab to="/user">내 클래스</ProfileTab>
        </>
      )}
      <Login to="login" onClick={removeToken}>
        {isTokenCheck ? "로그아웃" : "로그인"}
      </Login>
      {isTokenCheck && (
        <>
          <UserName> 반가워요 {profileName}님</UserName>
          <ImgWrapper>
            <Img src={profileImg} />
          </ImgWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default ProfileWrapper;

const Wrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const ProfileTab = styled(Link)`
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
  text-decoration: none;
  color: black;
`;

const Login = styled(Link)`
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
  text-decoration: none;
  color: black;
`;

const UserName = styled.div`
  margin: 0 20px;
  font-size: 14px;
  font-weight: 400;
`;

const ImgWrapper = styled.div`
  height: 30px;
  width: 30px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
`;
