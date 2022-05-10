import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function ProfileWrapper({ PostUserData, isLogIn }) {
  return (
    <Wrapper>
      <ProfileTab to="/creator">크리에이터 센터</ProfileTab>
      <ProfileTab to="/user">내 클래스</ProfileTab>
      <Login onClick={PostUserData}>{isLogIn ? "로그아웃" : "로그인"}</Login>
      {isLogIn && (
        <>
          <FontAwsome className="fa-solid fa-heart" />
          <FontAwsome className="fa-solid fa-user" />
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

const Login = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
`;

const FontAwsome = styled.i`
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;
