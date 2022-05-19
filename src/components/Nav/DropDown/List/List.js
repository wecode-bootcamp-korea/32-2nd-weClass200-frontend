import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function List({ menuMouseIn, menuMouseOut, content, isHover }) {
  const isTokenCheck = localStorage.getItem("new_token");

  return (
    <Wrapper>
      <MainCategory
        to={
          isTokenCheck
            ? `products/private?type_name=${content.category}`
            : `products/public?type_name=${content.category}`
        }
        onMouseOver={menuMouseIn}
      >
        {content.category}
      </MainCategory>
      <DivBox isHover={isHover}>
        <DropMenu isHover={isHover} onMouseLeave={menuMouseOut}>
          {content.subCategory.map(content => (
            <SubCategory
              to={
                isTokenCheck
                  ? `products/private?type_name=${content.subTitle}`
                  : `products/public?type_name=${content.subTitle}`
              }
              key={content.id}
            >
              {content.subTitle}
            </SubCategory>
          ))}
        </DropMenu>
      </DivBox>
    </Wrapper>
  );
}

export default List;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 15%;
  align-items: space-between;
  background-color: white;
`;

const MainCategory = styled(Link)`
  margin-right: 70px;
  color: black;
  font-size: 17px;
  font-weight: 700;
  text-decoration: none;
  padding-bottom: 10px;

  &:hover {
    cursor: pointer;
    color: #ff5600;
  }
`;

const DropMenu = styled.div`
  position: absolute;
  visibility: ${({ isHover }) => (isHover ? "block" : "hidden")};
  top: 30px;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
`;

const DivBox = styled.div`
  background-color: ${({ isHover }) => (isHover ? "white" : null)};
  height: ${({ isHover }) => (isHover ? "120px" : null)};
`;

const SubCategory = styled(Link)`
  display: block;
  padding: 10px 0 10px 6px;
  color: black;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: #ff5600;
    background-color: #f8f8f8;
  }
`;
