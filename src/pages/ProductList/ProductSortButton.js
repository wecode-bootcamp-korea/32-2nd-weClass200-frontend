import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProductSortButton = ({ title, sortUrl }) => {
  const navigate = useNavigate();

  // TODO(API주소 수정)

  // useEffect(() => {
  //   fetch(`http://proudcts/${location.search}`)
  //     .then(res => res.json())
  //     .then(data => setProductList(data));
  // }, [location.search]);

  const sortList = sort => {
    const sortedList = `?sort=${sort}`;
    navigate(sortedList);
  };

  return (
    <ProductSortBtn
      onClick={() => {
        sortList(sortUrl);
      }}
    >
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

  &:hover {
    background-color: black;
    color: white;
    transform: scale(1.2);
  }
`;
