import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { CLASS_INFO, TAB_MENU } from "../ProductDetailData";
import styled from "styled-components";
import { Dialog, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { config } from "../../../config";

const ProductDetailMain = ({ detail, getData }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewValue, setReviewValue] = useState("");
  const [fileImg, setFileImg] = useState("");
  const [isClickedMore, setIsClickedMore] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const reviewBox = useRef(null);
  const tabMenu = useRef(null);

  const coupon = detail[0]?.discount_coupon;
  const reviewLength = detail[0]?.reviews.length;
  const ratingArr = [];
  const initialValue = 0;

  detail[0]?.reviews.map(review => {
    return ratingArr.push(review.rating);
  });

  const ratingAmount = ratingArr.reduce(
    (prev, curr) => prev + curr,
    initialValue
  );

  const ratingAverage = ratingAmount / detail[0]?.reviews.length;

  const handleTabClick = () => {
    tabMenu.current.style.fontWeight = "700";
    tabMenu.current.style.borderBottom = "2px solid black";
    tabMenu.current.style.color = "black";
  };

  const handleReviewMore = () => {
    setIsClickedMore(!isClickedMore);
  };

  const handleWriteBtn = () => {
    setOpenModal(true);
  };

  const handleRatingInput = e => {
    setRatingValue(e.target.value);
  };

  const handleReviewInput = e => {
    setReviewValue(e.target.value);
  };

  const handleReviewPost = () => {
    fetch(`${config.review}`, {
      method: "POST",
      body: JSON.stringify({
        user_id: "3",
        product_id: "1",
        content: reviewValue,
        rating: Number(ratingValue),
        image_url: fileImg,
      }),
    }).then(res => {
      if (res.status !== 201) {
        alert("후기 등록에 실패했습니다. 다시 시도해주세요");
        return;
      }

      setIsPosted(!isPosted);
      setOpenModal(false);
      setReviewValue("");
      setRatingValue(0);
      setIsClickedMore(true);
      getData();
    });
  };

  const handleImgInput = e => {
    setFileImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleDeleteClick = () => {
    fetch(`${config.review}`, {
      method: "DELETE",
      body: JSON.stringify({
        user_id: "3",
        product_id: "1",
      }),
    }).then(res => getData());
  };

  useEffect(() => {
    isClickedMore
      ? (reviewBox.current.style.overflow = "visible") &&
        (reviewBox.current.style.height = "auto")
      : (reviewBox.current.style.overflow = "hidden") &&
        (reviewBox.current.style.height = "220px");
  }, [isClickedMore]);

  return (
    <LeftSide>
      <ThumbBox>
        <ThumbImg src={detail[0]?.thumb_img} />
        <ThumbCoupon visibility={coupon ? "visible" : "hidden"}>
          {String(coupon)[0]}만원 쿠폰
        </ThumbCoupon>
      </ThumbBox>
      <TabMenus>
        {TAB_MENU.map(menu => {
          return (
            <Link key={menu.id} to={String(menu.id)} spy={true} smooth={true}>
              <TabMenu onClick={handleTabClick} ref={tabMenu}>
                {menu.title}
              </TabMenu>
            </Link>
          );
        })}
      </TabMenus>

      <Banner bgColor="#77B053">
        세대별 TOP 50 클래스 공개!
        <br />
        <Text color="white" margin="8px 0 0 0" $fontSize>
          인기 순위 보기
        </Text>
      </Banner>
      <Banner bgColor="#FB5601">
        댓글 달면 20만원 쿠폰팩 증정!
        <br />
        <Text color="white" margin="8px 0 0 0" $fontSize>
          무려 2천개 할인 혜택 받을 기회
        </Text>
      </Banner>
      <ClassInfo>
        <Title classInfo $fontSize>
          클래스 정보
        </Title>
        <ClassInfoText>
          {CLASS_INFO.map(info => {
            return (
              <Text
                margin={
                  info.id === 0 || info.id === 2 || info.id === 4
                    ? "12px 0px 0px 0px"
                    : "12px 48px 0px 0px"
                }
                color={
                  info.id === 0 || info.id === 2 || info.id === 4
                    ? "rgb(162, 162, 162)"
                    : "black"
                }
                key={info.id}
              >
                {info.text}
              </Text>
            );
          })}
        </ClassInfoText>
      </ClassInfo>

      <LeftSideContent>
        <ContentBox>
          <Title name="0">실제 수강생 후기</Title>
          <ReviewWriteBtn onClick={handleWriteBtn}>
            후기 작성하기
          </ReviewWriteBtn>
          <ReviewRatingBox>
            <Rating size="large" value={Math.floor(ratingAverage)} readOnly />
            <RatingAverage>{ratingAverage.toFixed(1)}</RatingAverage>
            <ReviewAmount>총 {reviewLength}개</ReviewAmount>
          </ReviewRatingBox>
          <ReviewImgBox>
            {detail[0]?.reviews.map(review => {
              return <ReviewImg key={review.id} src={review.review_image} />;
            })}
          </ReviewImgBox>
          <Dialog open={openModal}>
            <DialogTitle fontWeight={700} color="white" backgroundColor="black">
              후기 작성
            </DialogTitle>
            <Rating
              style={{ margin: "19px 0 0 12px" }}
              onChange={handleRatingInput}
              value={ratingValue}
            />
            <DialogWrap>
              <ReviewInput
                onChange={handleReviewInput}
                value={reviewValue}
                placeholder="최소 15자 이상 작성해주세요."
              />
              <ImgPreview
                display={fileImg ? "block" : "none"}
                color="gray"
                src={fileImg ? fileImg : null}
                alt="img"
              />
              <ReviewImgInput
                id="image"
                onChange={handleImgInput}
                type="file"
                accept="image/*"
              />
            </DialogWrap>

            <Button onClick={handleReviewPost}>리뷰 등록</Button>
            <Button
              onClick={() => {
                setOpenModal(false);
                setReviewValue("");
                setRatingValue(0);
                setFileImg("");
              }}
            >
              닫기
            </Button>
          </Dialog>

          <ReviewBox ref={reviewBox}>
            {detail[0]?.reviews.map(review => {
              return (
                <Review key={review.id}>
                  <ReviewInfoBox>
                    <ReviewProfile className="fa-solid fa-user" />
                    <ReviewInfo>
                      <ReviewUserName>{review.user_name}</ReviewUserName>
                      <ReviewStarDateBox>
                        <Rating size="small" readOnly value={review.rating} />
                        <ReviewDate>{review.post_date.slice(0, 10)}</ReviewDate>
                      </ReviewStarDateBox>
                    </ReviewInfo>
                  </ReviewInfoBox>
                  <ReviewContent>{review.content}</ReviewContent>
                  <ReviewDeleteBtn id={review.id} onClick={handleDeleteClick}>
                    삭제
                  </ReviewDeleteBtn>
                </Review>
              );
            })}
          </ReviewBox>
          <ReviewMoreBtn onClick={handleReviewMore}>
            {isClickedMore
              ? "후기 접기"
              : `${reviewLength - 2}개의 후기 더보기`}
          </ReviewMoreBtn>
        </ContentBox>

        {TAB_MENU.filter(section => section.id !== 0).map(section => {
          return (
            <ContentBox key={section.id}>
              <Title name={section.id}>
                {section.id === 1 ? "클래스를 소개합니다." : section.title}
              </Title>
              <ContentDummy>
                {section.id === 5 ? (
                  <RefundBox>
                    환불 정책에 따라 구매일로부터 90일까지 환불 요청이 가능하며,
                    <span className="day">&nbsp;7일 까지&nbsp;</span>전액 환불이
                    가능합니다.
                    <br />
                    <br />
                    <span className="policy">전체 환불 정책 보기</span>
                  </RefundBox>
                ) : (
                  section.title
                )}
              </ContentDummy>
            </ContentBox>
          );
        })}
      </LeftSideContent>
    </LeftSide>
  );
};

export default ProductDetailMain;

const LeftSide = styled.div`
  position: relative;
  width: 776px;
  margin-right: 12px;
`;

const ThumbBox = styled.div`
  position: relative;
  width: 100%;
  height: 582px;
`;

const ThumbImg = styled.img`
  width: 100%;
  height: 582px;
  object-fit: contain;
`;

const ThumbCoupon = styled.p`
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100px;
  height: 40px;
  color: white;
  background-color: #581fcf;
  border-radius: 2px;
  visibility: ${props => props.visibility}
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  `;

const TabMenus = styled.div`
  position: sticky;
  top: 110px;
  display: flex;
  width: 100%;
  height: 47px;
  margin-top: 10px;
  padding-top: 16px;
  background-color: white;
  border-bottom: 0.5px solid lightgray;
  z-index: 1;
`;

const TabMenu = styled.span`
  margin-right: 20px;
  padding: 14px 0 13px 0;
  border-bottom: null;
  color: rgb(162, 162, 162);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const Banner = styled.div`
  width: 100%;
  height: 80px;
  padding: 24px;
  color: white;
  background-color: ${props => props.bgColor};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
  margin-top: 40px;
`;

const ClassInfoText = styled.div`
  display: flex;
`;

const Title = styled.h2`
  padding-top: ${props => (props.classInfo ? "0px" : "180px")};
  font-size: ${props => (props.fontSize ? "16px" : "20px")};
  font-weight: 700;
  line-height: ${props => (props.lineHeight ? "1.5" : null)};
`;

const Text = styled.p`
  margin: ${props => props.margin};
  margin-right: ${props => (props.marginR ? "48px" : "12px")};
  color: ${props => props.color};
  font-size: ${props => (props.fontSize ? "8px" : "14px")};
`;

const LeftSideContent = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.div`
  margin-top: 40px;
  position: relative;
`;

const ContentDummy = styled.div`
  width: 100%;
  height: 500px;
  background-color: beige;
`;

const ReviewRatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 94px;
`;

const RatingAverage = styled.span`
  margin-right: 8px;
  font-size: 26px;
  font-weight: 900;
`;

const ReviewAmount = styled.span`
  color: rgb(162, 162, 162);
  font-size: 14px;
  font-weight: 700;
`;

const ReviewImgBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 144px;
  margin-right: 0;
`;

const ReviewImg = styled.img`
  width: 144px;
  height: 144px;
  cursor: pointer;
`;

const DialogWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewInput = styled.textarea`
  width: 500px;
  height: 200px;
  margin-top: 20px;
  padding-left: 12px;
  resize: none;
  outline: none;
  border: 1px solid lightgray;
`;

const ReviewImgInput = styled.input`
  width: 300px;
  margin-top: 4px;
`;

const ImgPreview = styled.img`
  display: ${props => props.display};
  margin-top: 12px;
  width: 400px;
  height: 300px;
  border: 1px solid lightgray;
`;

const ReviewBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 12px 0;
  overflow: hidden;
`;

const Review = styled.div`
  width: 380px;
  height: 205px;
  padding: 16px;
  box-shadow: 3px 3px 10px -3px #e9e9e9;
`;

const ReviewInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewProfile = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-top: 8px;
  border-radius: 50%;
  color: white;
  background-color: #efefef;
  font-size: 20px;
  text-align: center;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const ReviewUserName = styled.span`
  margin: 8px 0 0 0;
  font-size: 12px;
  font-weight: 700;
`;

const ReviewStarDateBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const ReviewDate = styled.span`
  color: rgb(162, 162, 162);
  font-size: 11px;
`;

const ReviewContent = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

const ReviewMoreBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  border: 0;
  color: black;
  background-color: #efefef;
  opacity: 70%;
  font-weight: 700;
  font-size: 14px;

  &:hover {
    opacity: 100%;
    transition: opacity 100ms ease-in;
  }
`;

const ReviewWriteBtn = styled(ReviewMoreBtn)`
  position: absolute;
  right: 0;
  top: 165px;
  width: 100px;
  border: 1px solid lightgray;
  font-size: 12px;
  font-weight: 700;
  color: black;
  background-color: white;
`;

const ReviewDeleteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  margin: 20% 0 0 85%;
  padding: 4px;
  border: 1px solid lightgray;
  opacity: 20%;
  font-weight: 700;

  &:hover {
    opacity: 80%;
    transition: opacity 100ms ease-in;
  }
`;

const RefundBox = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 24px;
  background-color: #efefef;
  font-size: 14px;

  .day {
    color: rgb(255, 61, 0);
  }

  .policy {
    color: #cacaca;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid gray;
      color: gray;
    }
  }
`;
