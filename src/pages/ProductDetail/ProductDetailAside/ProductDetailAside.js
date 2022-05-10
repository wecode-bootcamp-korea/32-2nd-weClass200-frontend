import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SIDEBAR_BUTTON } from "../ProductDetailData";
import { Dialog, DialogTitle, DialogContentText } from "@mui/material";
import Button from "@mui/material/Button";
import { DETAIL_API } from "../../../config";

const ProductDetailAside = ({ detail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [likeAmount, setLikeAmount] = useState(0);

  const price = detail[0]?.price;
  const month = detail[0]?.month;
  const coupon = detail[0]?.discount_coupon;
  const discountPrice =
    price * parseFloat(`0.${100 - detail[0]?.discount_rate}`) - coupon;

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleCouponClick = () => {
    setOpenCouponModal(true);
  };

  useEffect(() => {
    setLikeAmount(detail[0]?.like_amount - 1);
  }, [detail]);

  useEffect(() => {
    setLikeAmount(isLiked ? likeAmount + 1 : likeAmount - 1);
    fetch(`${DETAIL_API.like}`, {
      method: "POST",
      body: JSON.stringify({
        user_id: "9",
        product_id: "1",
      }),
    });
  }, [isLiked]);

  return (
    <ProductDetailAsideWrap>
      <SideBar>
        <SideBarTop>
          <ProductInfo>
            <ProductCreator>{detail[0]?.creator_name}</ProductCreator>
            <ProductName>{detail[0]?.content_name}</ProductName>
            <ProductStatus gift>선물하기</ProductStatus>
            <ProductStatus>바로 수강 가능</ProductStatus>
            <ProductPrice>
              <InfoTitle>쿠폰 할인가</InfoTitle>
              <PriceInfo>
                <InstallmentInfo>
                  쿠폰 적용 시, {detail[0]?.month}개월 할부
                </InstallmentInfo>
                <Price>
                  <DiscountRate>{detail[0]?.discount_rate}%</DiscountRate>
                  <MonthPrice>
                    월{(discountPrice / month).toLocaleString()}원
                  </MonthPrice>
                </Price>
              </PriceInfo>
            </ProductPrice>
          </ProductInfo>

          <DiscountInfoWrap>
            <DiscountInfo>
              <InfoTitle fontWeight="600" color="#fd3049">
                총 할인액
              </InfoTitle>
              <DiscountAmount>
                -{(price - discountPrice).toLocaleString()}원
              </DiscountAmount>
            </DiscountInfo>
            <CouponButton onClick={handleCouponClick}>
              할인쿠폰 받기
            </CouponButton>

            <Dialog fullWidth open={openCouponModal}>
              <DialogTitle padding="30px">쿠폰이 발급되었어요!</DialogTitle>
              <DialogContentText padding="30px">
                발급된 쿠폰은 마이페이지에서 확인하실 수 있습니다.
              </DialogContentText>
              <Button
                onClick={() => {
                  setOpenCouponModal(false);
                }}
              >
                확인
              </Button>
            </Dialog>
          </DiscountInfoWrap>

          <ProductTag>
            {SIDEBAR_BUTTON[0].tag.map(tag => {
              return (
                <TagBox key={tag.id}>
                  <TagIcon className={tag.icon} />
                  <InfoTitle>{tag.text}</InfoTitle>
                </TagBox>
              );
            })}
          </ProductTag>
          <ProductBuy>
            <ShareBtnBox>
              {SIDEBAR_BUTTON[0].share_btn.map(btn => {
                return (
                  <ShareBtn
                    key={btn.id}
                    onClick={btn.id === 0 ? handleLikeClick : null}
                  >
                    <ShareBtnIcon
                      className={
                        btn.id === 0
                          ? isLiked === true
                            ? "fa-solid fa-heart isLiked"
                            : btn.icon
                          : btn.icon
                      }
                    />
                    <InfoTitle>
                      {btn.id === 0 ? likeAmount + 1 : btn.text}
                    </InfoTitle>
                  </ShareBtn>
                );
              })}
            </ShareBtnBox>
            <BuyButton>클래스 신청하기</BuyButton>
          </ProductBuy>
        </SideBarTop>

        <SideBarBottom>
          <BannerTextWrap>
            <InfoTitle fontWeight="700">
              준비물까지 챙겨주는 온라인 클래스
            </InfoTitle>
            <InfoTitle
              fontSize="11px"
              fontWeight="500"
              color="rgb(162, 162, 162)"
            >
              위클래스200, 서비스 소개 보기
            </InfoTitle>
          </BannerTextWrap>
          <BannerLogo>200</BannerLogo>
        </SideBarBottom>
      </SideBar>
    </ProductDetailAsideWrap>
  );
};

export default ProductDetailAside;

const ProductDetailAsideWrap = styled.div`
  position: relative;
  width: 368px;
  margin-left: 12px;
`;

const SideBar = styled.div`
  position: sticky;
  top: 115px;
  right: 0px;
  z-index: 10;
`;

const SideBarTop = styled.div`
  width: 100%;
  height: 600px;
  margin-bottom: 12px;
  padding: 24px;
  border: 1px solid lightgray;
  box-shadow: 3px 6px 14px -3px #e9e9e9;
`;

const ProductInfo = styled.div`
  height: 200px;
  border-bottom: 0.5px solid #f8f8f8;
`;

const ProductCreator = styled.p`
  margin-bottom: 4px;
  font-size: 14px;
`;

const ProductName = styled.h2`
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
`;

const ProductStatus = styled.span`
  margin-right: 2px;
  padding: 4px;
  border-radius: 2px;
  color: ${props => (props.gift ? "#fd3049" : "rgb(162, 162, 162)")};
  background-color: #f8f8f8;
  font-size: 11px;
  font-weight: 700;
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 4px;
  padding: 20px 0;
  border-bottom: 1px solid lightgray;
`;

const InfoTitle = styled.div`
  color: ${props => props.color};
  font-size: 14px;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
`;

const PriceInfo = styled.div``;

const InstallmentInfo = styled.span`
  float: right;
  margin-bottom: 4px;
  color: rgb(162, 162, 162);
  font-size: 11px;
`;

const Price = styled.div``;

const DiscountRate = styled.span`
  margin-right: 4px;
  font-size: 16px;
`;

const MonthPrice = styled.span`
  font-size: 18px;
  font-weight: 900;
`;

const DiscountInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 120px;
  border-bottom: 0.5px solid #f8f8f8;
`;

const DiscountInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DiscountAmount = styled(MonthPrice)`
  color: #fd3049;
`;

const CouponButton = styled.button`
  display: flex;
  justify-content: center;
  width: 95%;
  margin: 0 auto;
  padding: 12px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: #fd3049;
  font-weight: 500;
  outline: none;
`;

const ProductTag = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: start;
  height: 120px;
  padding-left: 4px;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
`;

const TagIcon = styled.i`
  margin-right: 4px;
`;

const ProductBuy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 120px;
`;

const ShareBtnBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ShareBtn = styled.button`
  padding: 12px;
  border: none;
  font-weight: 500;
  outline: none;

  &:hover {
    background-color: lightgray;
  }
`;

const ShareBtnIcon = styled.i`
  margin-right: 4px;

  &.isLiked {
    color: #fd3049;
  }
`;

const BuyButton = styled(CouponButton)`
  padding: 16px;
  background-color: rgb(255, 86, 0);
  font-size: 16px;
  font-weight: 700;

  &:hover {
    background-color: #cc4500;
  }
`;

const SideBarBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 75px;
  padding: 16px;
  border: 0.5px solid lightgray;
  box-shadow: 3px 6px 14px -3px #e9e9e9;
  cursor: pointer;
`;

const BannerTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 74px;
  line-height: 1.5;
`;

const BannerLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  color: white;
  background-color: black;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
`;
