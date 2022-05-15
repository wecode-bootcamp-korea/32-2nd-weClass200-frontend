import React, { useState, useEffect } from "react";
import MainCarousel from "./MainCarousel/MainCarousel";
import styled from "styled-components";
import ClassCarousel from "./ClassCarousel/ClassCarousel";
import MainProducts from "./MainProducts/MainProducts";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";

function Main() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [userLearn, setUserLearn] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  const navigate = useNavigate();

  function goToDetail(id) {
    navigate(`/products/${id}`);
  }

  useEffect(() => {
    if (localStorage.getItem("new_token")) {
      fetch(config.privateBest)
        .then(res => res.json())
        .then(data => setBestProducts(data));
    } else {
      fetch(config.publicBest)
        .then(res => res.json())
        .then(data => setBestProducts(data));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("new_token")) {
      fetch(config.privateSale)
        .then(res => res.json())
        .then(data => setSaleProducts(data));
    } else {
      fetch(config.publicSale)
        .then(res => res.json())
        .then(data => setSaleProducts(data));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("new_token")) {
      fetch(config.privateNew)
        .then(res => res.json())
        .then(data => setNewProducts(data));
    } else {
      fetch(config.publicNew)
        .then(res => res.json())
        .then(data => setNewProducts(data));
    }
  }, []);

  useEffect(() => {
    fetch(`http://10.58.6.184:8000/users/mypage`)
      .then(res => res.json())
      .then(data => setUserLearn(data));
  }, []);

  //TODO
  // useEffect(() => {
  //   fetch(config.privateNew)
  //     .then(res => res.json())
  //     .then(data => console.log(data));
  // }, []);
  //

  return (
    <MainDiv>
      <MainCarousel />
      {localStorage.getItem("new_token") && (
        <ClassCarousel
          goToDetail={goToDetail}
          type="Learning"
          products={userLearn}
        />
      )}

      <ClassCarousel
        goToDetail={goToDetail}
        type="Best"
        products={bestProducts}
      />

      <ClassCarousel
        goToDetail={goToDetail}
        type="New"
        products={newProducts}
      />

      <ClassCarousel
        goToDetail={goToDetail}
        type="Sale"
        products={saleProducts}
      />

      <CategoryWrapper>
        {categoryProducts && (
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
        )}
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
