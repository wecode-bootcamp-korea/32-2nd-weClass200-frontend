import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductDetailMain from "./ProductDetailMain/ProductDetailMain";
import ProductDetailAside from "./ProductDetailAside/ProductDetailAside.js";
import { config } from "../../config.js";

const ProductDetail = () => {
  const [detail, setDetail] = useState([]);
  const params = useParams();

  const getData = () => {
    fetch(`${config.list}/public/${params.id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => setDetail(res.product));
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  return (
    <Wrapper>
      <ProductDetailMain detail={detail} getData={getData} />
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
