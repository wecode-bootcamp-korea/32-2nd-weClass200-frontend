import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MypageProduct from "./MypageProduct";

function MypageCarousel({ products, type }) {
  const navigate = useNavigate();

  function goToDetail(id) {
    navigate(`/productDetail/${id}`);
  }

  return (
    <ClassCarouselSlide>
      <CarouselWrapper>
        <Carousel {...settingsMain}>
          {products &&
            products.map(data => (
              <ImageWrapper key={data.id}>
                <MypageProduct
                  goToDetail={goToDetail}
                  id={data.id}
                  thumbImg={data.thumb_img}
                  contentName={data.content_name}
                  creatorName={data.creator_name}
                  discountCoupon={data.discount_coupon}
                  likeAmount={data.like_amount}
                  discountRate={data.discount_rate}
                  priceAmount={data.price_amount}
                  month={data.month}
                />
              </ImageWrapper>
            ))}
        </Carousel>
      </CarouselWrapper>
    </ClassCarouselSlide>
  );
}

export default MypageCarousel;

const settingsMain = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
};

const Carousel = styled(Slider)``;

const ClassCarouselSlide = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  width: 800px;

  .slick-prev {
    background: transparent;
    ::before {
      color: black;
      content: "<";
    }
  }

  .slick-next {
    ::before {
      color: black;
      content: ">";
    }
  }
`;

const ClassCoverTitle = styled.h1`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ImageWrapper = styled.div``;
