import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { config } from "../../config";
import Product from "./Product";
import ProductSortButton from "./ProductSortButton";
import ProductListCarousel from "./ProductListCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OFF_SET = 0;

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [limit, setLimit] = useState(4);
  const location = useLocation();

  useEffect(() => {
    fetch(
      `${config.list}/public${location.search}&offset=${OFF_SET}&limit=${limit}`
    )
      .then(res => res.json())
      .then(product => {
        setProductList(product.products);
      });
  }, [location.search, limit]);

  const changeLimit = () => {
    setLimit(prev => prev + 4);
  };

  return (
    <Wrapper>
      <ProductListCarousel />
      <ProductSortButtons>
        {PRODUCT_SORT_BUTTON.map(list => {
          const isCurrent = location.search.includes(list.sortUrl);
          return (
            <ProductSortButton
              title={list.title}
              key={list.id}
              sortUrl={list.sortUrl}
              isCurrent={isCurrent}
              sortBtn={PRODUCT_SORT_BUTTON}
            />
          );
        })}
      </ProductSortButtons>
      <AllProduct>
        {productList.map(product => {
          return (
            <Product
              key={product.id}
              id={product.id}
              contentName={product.content_name}
              creatorName={product.creator_name}
              thumbImg={product.thumb_img}
              discountCoupon={product.discount_coupon}
              likeAmount={product.like_amount}
              discountRate={product.discount_rate}
              priceAmount={product.price_amount}
              month={product.month}
            />
          );
        })}
      </AllProduct>
      <NextBtnBox>
        <NextButton onClick={changeLimit}>더보기</NextButton>
      </NextBtnBox>
    </Wrapper>
  );
};

export default ProductList;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: inline-block;
  margin-top: 150px;
`;

const ProductSortButtons = styled.ul`
  width: 1179px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  gap: 10px;
  margin-bottom: 30px;
`;

const AllProduct = styled.div`
  width: 1179px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-template-rows: auto;
  row-gap: 25px;
  column-gap: 20px;
  margin: 0 auto;
`;

const NextBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const NextButton = styled.button`
  padding: 16px 100px;
  text-align: center;
  justify-content: center;
  border: none;
  background-color: lightgray;
  color: black;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const PRODUCT_SORT_BUTTON = [
  {
    id: 1,
    title: "리뷰많은순",
    sortUrl: "&ordering=review",
  },
  {
    id: 2,
    title: "찜많은순",
    sortUrl: "&ordering=like",
  },
  {
    id: 3,
    title: "별점높은순",
    sortUrl: "&ordering=score",
  },
  {
    id: 4,
    title: "최신순",
    sortUrl: "&ordering=new",
  },
  {
    id: 5,
    title: "가격낮은순",
    sortUrl: "&ordering=price",
  },
];
