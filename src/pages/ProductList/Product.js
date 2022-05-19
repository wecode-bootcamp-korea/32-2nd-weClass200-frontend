import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import styled from "styled-components";

const Product = ({
  id,
  contentName,
  creatorName,
  thumbImg,
  discountCoupon,
  likeAmount,
  discountRate,
  priceAmount,
  month,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [productId, setProductId] = useState();
  const [heartAmount, setHeartAmount] = useState(likeAmount);
  const navigate = useNavigate();

  useEffect(() => {
    isLiked
      ? setHeartAmount(prev => prev + 1)
      : setHeartAmount(prev => prev - 1);
  }, [id, isLiked]);

  useEffect(() => {
    fetch(`${config.like}`, {
      method: "POST",
      body: JSON.stringify({
        product_id: Number(productId),
      }),
    });
  }, [isLiked]);

  const handleCountChange = e => {
    setIsLiked(!isLiked);
    setProductId(e.target.id);
  };

  const discountPrice =
    priceAmount * parseFloat(`0.${100 - discountRate}`) - discountCoupon;

  const isTokenCheck = localStorage.getItem("new_token");

  const goToProductDetail = id => {
    isTokenCheck
      ? navigate(`/products/private/${id}`)
      : navigate(`/products/public/${id}`);
  };

  return (
    <ProductItem>
      <ProductImgBox>
        <ProductImg
          src={thumbImg}
          onClick={() => {
            goToProductDetail(id);
          }}
        />
        {discountCoupon && (
          <ProductCoupon>
            {String(discountCoupon).length >= 6
              ? String(discountCoupon).slice(0, 2)
              : String(discountCoupon)[0]}
            만원쿠폰
          </ProductCoupon>
        )}
        <ProductHeartBtn>
          <HeartIcon
            className="fa-solid fa-heart"
            fontSize="25px"
            onClick={handleCountChange}
            isLiked={isLiked}
            id={id}
          />
        </ProductHeartBtn>
      </ProductImgBox>
      <ProductDetailBox>
        <ProductInfoBox>
          <ProductCreator>{creatorName}</ProductCreator>
          <ProductName>{contentName}</ProductName>
        </ProductInfoBox>
        <HeartIconBox>
          <HeartIcon
            className="fa-solid fa-heart"
            fontSize="18px"
            isLiked={isLiked}
          />
          <HeartCount>{heartAmount + 1}</HeartCount>
        </HeartIconBox>
        <PriceBox>
          {discountRate && <DiscountRate>{discountRate}%</DiscountRate>}
          <InstallmentPrice>
            {parseInt(discountPrice / month).toLocaleString()}원
          </InstallmentPrice>
          <InstallmentMonth>({month}개월)</InstallmentMonth>
        </PriceBox>
      </ProductDetailBox>
    </ProductItem>
  );
};

export default Product;

const ProductItem = styled.div`
  background-color: white;
  width: 100%;
  height: 400px;
  cursor: pointer;
`;

const ProductImgBox = styled.div`
  position: relative;
  margin-bottom: 5px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 207px;
  object-fit: cover;
`;

const ProductCoupon = styled.span`
  background-color: red;
  padding: 8px 5px;
  position: absolute;
  left: 10px;
  top: 10px;
  color: white;
  font-weight: 800;
  align-items: center;
`;

const ProductHeartBtn = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const HeartIcon = styled.i`
  font-size: ${props => props.fontSize};
  color: ${props => (props.isLiked ? "red" : "rgb(215, 215, 215)")};
  opacity: 0.7;
  &:hover {
    border-radius: 50%;
    scale: (1.5);
  }
`;

const ProductDetailBox = styled.div`
  padding: 0 10px;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const ProductCreator = styled.p`
  color: black;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 700;
`;

const ProductName = styled.p`
  color: rgb(26, 26, 26);
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 3px;
  overflow: hidden;
  padding: 0 2px;
`;

const HeartIconBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 5px;
`;

const HeartCount = styled.span`
  margin-left: 5px;
  font-size: 15px;
  color: rgb(162, 162, 162);
`;

const PriceBox = styled.div`
  padding-top: 5px;
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

const DiscountRate = styled.span`
  color: #fd3049;
  margin-right: 10px;
  font-size: 20px;
  font-weight: 700;
`;

const InstallmentPrice = styled.span`
  margin-right: 10px;
  color: #101010;
  font-weight: 700;
`;

const InstallmentMonth = styled.span`
  color: #a2a2a2;
  font-weight: 400;
`;
