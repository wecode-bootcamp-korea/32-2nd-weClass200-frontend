import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DropDown from "./DropDown/DropDown";
import ProfileWrapper from "./ProfileWrapper/ProfileWrapper";
import SearchBar from "./SearchBar/SearchBar";
import logoSrc from "./../../assets/images/weclass_logo.png";

function Nav() {
  const [isLogIn, setIsLogIn] = useState(true);
  const navigate = useNavigate();

  function PostUserData() {
    setIsLogIn(prev => !prev);
  }

  const searchRef = useRef(null);
  const isTokenCheck = localStorage.getItem("new_token");

  const searchProduct = () => {
    isTokenCheck
      ? navigate(`/products/private?search=${searchRef.current.value}`)
      : navigate(`/products/public?search=${searchRef.current.value}`);
  };

  return (
    <NavFixed>
      <Wrapper>
        <Container>
          <Logo src={logoSrc} />
          <Title to="/">클래스</Title>
          <SearchBar searchRef={searchRef} searchProduct={searchProduct} />
          <ProfileWrapper PostUserData={PostUserData} isLogIn={isLogIn} />
        </Container>
      </Wrapper>
      <DropDown />
    </NavFixed>
  );
}

export default Nav;

const NavFixed = styled.div`
  position: fixed;
  z-index: 90;
  background-color: white;
`;
const Wrapper = styled.section`
  display: flex;
  height: 78px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  width: 1176px;
  align-items: center;
`;

const Title = styled(Link)`
  margin-left: 20px;
  border-width: 0;
  color: #ff5600;
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 24px;
`;
