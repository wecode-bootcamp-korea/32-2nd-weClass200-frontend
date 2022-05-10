import React from "react";
import styled from "styled-components";

function SearchBar() {
  return (
    <NavWrapper>
      <InputBox placeholder="찾으시는 취미가 있나요?" />
      <FontAwsome className="fa-solid fa-magnifying-glass" />
    </NavWrapper>
  );
}

export default SearchBar;

const NavWrapper = styled.div`
  display: flex;
  width: 40%;
  margin-left: 50px;
  justify-content: center;
  height: 38px;
  position: relative;
`;

const InputBox = styled.input`
  text-align: left;
  align-items: center;
  display: flex;
  height: 38px;
  width: 100%;
  padding-left: 16px;
  padding-right: 10px;
  background-color: #f8f8f8;
  border: none;
`;

const FontAwsome = styled.i`
  position: absolute;
  right: 15px;
  top: 10px;
`;
