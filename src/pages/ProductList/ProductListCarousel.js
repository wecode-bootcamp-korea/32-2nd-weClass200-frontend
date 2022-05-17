import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";

const ProductListCarousel = () => {
  return (
    <SliderWrapper>
      <Slider {...settings}>
        {CAROUSEL_IMG_SOURCE.map(image => {
          return (
            <CarouselBackground bgColor={image.bgColor} key={image.id}>
              <Link to={`${image.id}`}>
                <CarouselImage alt={image.alt} src={image.src} />
              </Link>
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
  padding: 0 300px;
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
  height: 320px;
  width: 600px;
  object-fit: contain;

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
    id: 27,
    alt: "풍경사진1",
    src: "https://user-images.githubusercontent.com/95524491/168978602-0d3f6db8-1280-4698-ad17-3f9a704ceb05.png",
    bgColor: "#4B2093",
  },
  {
    id: 3,
    alt: "풍경사진2",
    src: "https://github.com/BDjaekwanee/project-imgaes/blob/master/img_003.png?raw=true",
    bgColor: "#3077D5",
  },
  {
    id: 9,
    alt: "풍경사진3",
    src: "https://github.com/BDjaekwanee/project-imgaes/blob/master/img_011.png?raw=true",
    bgColor: "#1C1C1C",
  },
];
