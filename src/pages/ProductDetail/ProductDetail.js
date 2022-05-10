import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductDetailMain from "./ProductDetailMain/ProductDetailMain";
import ProductDetailAside from "./ProductDetailAside/ProductDetailAside.js";
import { DETAIL_API } from "../../config.js";

const ProductDetail = () => {
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    fetch(`${DETAIL_API.detail}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => setDetail(res.product));
  }, []);

  return (
    <Wrapper>
      <ProductDetailMain detail={detail} setDetail={setDetail} />
      <ProductDetailAside detail={detail} />
    </Wrapper>
  );
};

export default ProductDetail;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 150px;
`;
