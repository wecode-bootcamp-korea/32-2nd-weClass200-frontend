import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProductSortButton = ({ title, sortUrl, isCurrent, test }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sortList = () => {
    const currentUrl = `${location.pathname}${location.search}`;
    const currentIdx = test.findIndex(el => currentUrl.includes(el.sortUrl));

    if (currentIdx !== -1) {
      navigate(currentUrl.replace(test[currentIdx].sortUrl, sortUrl));
    } else {
      navigate(`${currentUrl}${sortUrl}`);
    }
  };

  return (
    <ProductSortBtn onClick={sortList} isCurrent={isCurrent}>
      {title}
    </ProductSortBtn>
  );
};

export default ProductSortButton;

const ProductSortBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding: 10px 15px;
  background-color: white;
  border: 2px solid rgb(229, 229, 229);
  border-radius: 10px;
  font-weight: 600;

  ${({ isCurrent }) =>
    isCurrent &&
    ` background-color: black;
    color: white;`}

  &:hover {
    background-color: black;
    color: white;
  }
`;
