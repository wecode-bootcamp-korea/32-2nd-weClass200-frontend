import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function MainCarousel() {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    fetch("/data/MainMock/mainCarousel.json")
      .then(res => res.json())
      .then(data => setCarouselData(data.result));
  }, []);
  return (
    <CarouselWrapper>
      <Main>
        <Carousel {...settings}>
          {carouselData.map(caruselData => (
            <MainCarouselContainer
              backColor={caruselData.backColor}
              url={caruselData.url}
              key={caruselData.eventId}
            >
              <MainCarouselBox>
                <MainCarouselWrapper to="/mainCategory">
                  <CarouselImg src={caruselData.url} />
                </MainCarouselWrapper>
                <CarouselTextWrapper>
                  <CarouselText to="/products/main_category" main>
                    {caruselData.title}
                  </CarouselText>
                  <CarouselText to="/products/main_category">
                    {caruselData.subTitle}
                  </CarouselText>
                </CarouselTextWrapper>
              </MainCarouselBox>
            </MainCarouselContainer>
          ))}
        </Carousel>
      </Main>
    </CarouselWrapper>
  );
}

export default MainCarousel;

const settings = {
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  arrows: false,
  cssEase: "Ease",
};

const CarouselWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  margin-top: 140px;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
`;

const Carousel = styled(Slider)``;

const MainCarouselContainer = styled.div`
  position: relative;
  height: 100%;
  background-color: ${props => props.backColor};
`;

const MainCarouselBox = styled.div`
  width: 1176px;
  display: flex;
  margin: 0 auto;
`;

const MainCarouselWrapper = styled(Link)`
  width: 675px;
  height: 415px;
`;

const CarouselImg = styled.img`
  width: 675px;
  height: 415px;
  object-fit: cover;
  border-radius: 30px;
  padding: 20px;
`;

const CarouselTextWrapper = styled.div``;

const CarouselText = styled.div`
  margin-top: ${({ main }) => (main ? "7%" : "10%")};
  margin-left: 10%;
  color: ${({ main }) => (main ? "white" : "whitesmoke")};
  font-size: ${({ main }) => (main ? "36px" : "16px")};
  line-height: 44px;
  font-weight: ${({ main }) => (main ? "bold" : "normal")};
  letter-spacing: -0.02rem;
  word-break: keep-all;
`;
