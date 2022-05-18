import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { config } from "../../config";
import Product from "./Product";
import ProductSortButton from "./ProductSortButton";
import ProductListCarousel from "./ProductListCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch(`${config.list}${location.search}`)
      .then(res => res.json())
      .then(product => {
        setProductList(product.result);
      });
  }, [location.search]);

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

const PRODUCT_SORT_BUTTON = [
  {
    id: 1,
    title: "리뷰많은순",
    sortUrl: "&sort_method=review",
  },
  {
    id: 2,
    title: "찜많은순",
    sortUrl: "&sort_method=like",
  },
  {
    id: 3,
    title: "별점높은순",
    sortUrl: "&sort_method=score",
  },
  {
    id: 4,
    title: "최신순",
    sortUrl: "&sort_method=new",
  },
  {
    id: 5,
    title: "가격순",
    sortUrl: "&sort_method=price",
  },
];
