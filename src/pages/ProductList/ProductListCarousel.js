import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

const ProductListCarousel = () => {
  return (
    <SliderWrapper>
      <Slider {...settings}>
        {CAROUSEL_IMG_SOURCE.map(image => {
          return (
            <CarouselBackground bgColor={image.bgColor} key={image.id}>
              <CarouselImage alt={image.alt} src={image.src} />
            </CarouselBackground>
          );
        })}
      </Slider>
    </SliderWrapper>
  );
};

export default ProductListCarousel;

const CarouselBackground = styled.div`
  background-color: ${props => props.bgColor};
  padding: 0 27%;
`;

const SliderWrapper = styled.div`
  width: 1179px;
  margin: 0 auto;
  .slick-slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      .slick-prev,
      .slick-next {
        z-index: 1;
      }
    }

    .slick-dots {
      position: absolute;
      bottom: 5%;
      left: -46%;

      li {
        margin: 0;
      }

      .slick-active {
        button::before {
          color: white;
        }
      }
    }
  }
`;

const NextArrow = styled.button`
  position: absolute;
  right: 20px;
  top: 45%;
  z-index: -1;
  ::before {
    background-color: transparent;
    content: ">";
    font-size: 50px;
  }
`;

const PrevArrow = styled.button`
  position: absolute;
  left: 10px;
  top: 45%;
  z-index: -1;
  ::before {
    background-color: transparent;
    content: "<";
    font-size: 50px;
  }
`;

const CarouselImage = styled.img`
  padding: 10px 0;
  height: 200px;
  width: 100%;
  background-color: ${props => props.bgColor};
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const CAROUSEL_IMG_SOURCE = [
  {
    id: 1,
    alt: "풍경사진1",
    src: "https://images.unsplash.com/photo-1619120238346-978e07731e77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    bgColor: "#f3223b",
  },
  {
    id: 2,

    alt: "풍경사진2",
    src: "https://images.unsplash.com/photo-1619120238346-978e07731e77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    bgColor: "#1A1A1A",
  },
  {
    id: 3,

    alt: "풍경사진3",
    src: "https://images.unsplash.com/photo-1463595515259-d8ef281955b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    bgColor: "#00479d",
  },
];
