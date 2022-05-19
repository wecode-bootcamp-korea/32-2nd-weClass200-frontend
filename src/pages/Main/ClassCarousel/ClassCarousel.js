import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainProducts from "../MainProducts/MainProducts";

function ClassCarousel({ products, type, goToDetail }) {
  function selectSettings(type) {
    switch (type) {
      case "Best":
        return settingsMain;
      case "New":
        return settingsNew;
      case "Sale":
        return settingsSale;
      case "Learning":
        return settingsLearning;
      default:
        return;
    }
  }

  const product = products.products || products.myclasses;

  return (
    <ClassCarouselSlide>
      <CarouselWrapper>
        <ClassCoverTitle>
          {type === "Learning"
            ? "현재 수강 중인 강의"
            : `실시간 인기 ${type} 클래스`}
        </ClassCoverTitle>
        {product && (
          <Carousel {...selectSettings(type)}>
            {product.map(data => (
              <ImageWrapper key={data.id}>
                <MainProducts
                  type={type}
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
        )}
      </CarouselWrapper>
    </ClassCarouselSlide>
  );
}

export default ClassCarousel;

const settingsMain = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
};

const settingsNew = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
};

const settingsSale = {
  infinite: true,
  speed: 400,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
};

const settingsLearning = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
};

const Carousel = styled(Slider)``;

const ClassCarouselSlide = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  width: 1176px;

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

const ImageWrapper = styled.div`
  /* width: 276px;
  height: 207px; */
`;
