import React, { useState, useEffect } from "react";
import MainCarousel from "./MainCarousel/MainCarousel";
import styled from "styled-components";
import ClassCarousel from "./ClassCarousel/ClassCarousel";
import MainProducts from "./MainProducts/MainProducts";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";

function Main() {
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [userLearn, setUserLearn] = useState([]);

  const navigate = useNavigate();

  function goToDetail(id) {
    navigate(`/productDetail/${id}`);
  }

  useEffect(() => {
    fetch(`/data/MainMock/mainCategory.json`)
      // fetch(config.main)
      .then(res => res.json())
      .then(data => setProducts(data.result));
  }, []);

  useEffect(() => {
    fetch(config.list)
      .then(res => res.json())
      .then(data => setCategoryProducts(data.result));
  }, []);

  useEffect(() => {
    fetch(`/data/MainMock/isLearning.json`)
      .then(res => res.json())
      .then(data => setUserLearn(data.result));
  }, []);

  return (
    <MainDiv>
      <MainCarousel />
      {localStorage.getItem("new_token") && (
        <>
          {userLearn.map(product => (
            <ClassCarousel
              goToDetail={goToDetail}
              key={product.id}
              type={product.type}
              products={product.products}
            />
          ))}
        </>
      )}
      {products.map(product => (
        <ClassCarousel
          goToDetail={goToDetail}
          key={product.id}
          type={product.type}
          products={product.products}
        />
      ))}
      <CategoryWrapper>
        <CategoryGrid>
          <CategortTitle>강의 전체 보기 </CategortTitle>
          {categoryProducts.map(product => (
            <MainProducts
              goToDetail={goToDetail}
              key={product.id}
              id={product.id}
              thumbImg={product.thumb_img}
              contentName={product.content_name}
              creatorName={product.creator_name}
              discountCoupon={product.discount_coupon}
              likeAmount={product.like_amount}
              discountRate={product.discount_rate}
              priceAmount={product.price_amount}
              month={product.month}
            />
          ))}
        </CategoryGrid>
      </CategoryWrapper>
      <Hr />
    </MainDiv>
  );
}

export default Main;

const MainDiv = styled.div`
  overflow-x: hidden;
`;

const CategoryWrapper = styled.div`
  width: 100vw;
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
`;

const CategoryGrid = styled.div`
  display: grid;
  justify-items: center;
  position: relative;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  grid-row-gap: 20px;
  width: 1179px;
`;

const CategortTitle = styled.span`
  position: absolute;

  top: -30px;
  left: 0;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const Hr = styled.hr`
  background-color: white;
  height: 0.1px;
  margin-bottom: 50px;
`;
