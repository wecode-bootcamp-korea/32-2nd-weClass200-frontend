import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MypageCarousel from "./MypageCarousel/MypageCarousel";
import MypageProduct from "./MypageCarousel/MypageProduct";
import { MYPAGE_URL } from "../../config";

function Mypage() {
  const [myPageData, setMyPageData] = useState([]);
  const [myClasses, setMyClasses] = useState([]);

  useEffect(() => {
    fetch(MYPAGE_URL)
      .then(res => res.json())
      .then(data => setMyPageData(data.liked_products));
  }, []);

  useEffect(() => {
    fetch(MYPAGE_URL)
      .then(res => res.json())
      .then(data => setMyClasses(data.myclasses));
  }, []);

  const userName = localStorage.getItem("name");
  const profileImg = localStorage.getItem("img");

  return (
    <Wrapper>
      <MypageMenuList>
        <UserInfo>
          <ProfileImg src={profileImg} />
          <p>{userName}</p>
        </UserInfo>
        <LevelTitle>
          <p>내 등급</p>
        </LevelTitle>
        <LevelBox>
          <p>Lv.Amateur</p>
          <p>혜택보기</p>
        </LevelBox>

        <MyInfoTitle>내 정보</MyInfoTitle>
        <MyInfoList>
          <p>내 캐시</p>
          <p>내 포인트</p>
          <p>내 쿠폰</p>
          <p>내 응원</p>
          <p>주문 내역</p>
          <p>내 후기</p>
        </MyInfoList>

        <MembershipTitle>멤버쉽</MembershipTitle>
        <MembershipList>
          <p>101 Prime</p>
          <p>Money+</p>
        </MembershipList>

        <MenuTitle>메뉴</MenuTitle>
        <MenuList>
          <p>친구 초대하고 30,000원 쿠폰 받기</p>
          <p>클래스 101 앱 설치하기</p>
          <p>크리에이터 지원하기</p>
          <p>로그아웃</p>
        </MenuList>
      </MypageMenuList>

      <MypageContent>
        <MypageContentList>
          <LikeTitle>찜하기</LikeTitle>
          <LikeButton />
          <MypageCarousel>
            {myPageData.length &&
              myPageData.map(products => {
                return (
                  <MypageProduct
                    key={products.id}
                    thumbImg={products.thumb_img}
                    contentName={products.content_name}
                    creatorName={products.creator_name}
                    likeAmount={products.like_amount}
                    discountRate={products.discount_rate}
                    priceAmount={products.price_amount}
                    month={products.month}
                  />
                );
              })}
          </MypageCarousel>
          <MypageCarousel products={myPageData} />
        </MypageContentList>

        <PurchaseTitle>구매내역</PurchaseTitle>
        <MypageCarousel products={myClasses} />
      </MypageContent>
    </Wrapper>
  );
}

export default Mypage;

const Wrapper = styled.div`
  display: flex;
  padding-top: 13%;
  padding-bottom: 15%;
`;

const MypageMenuList = styled.div`
  padding-left: 130px;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-bottom: 60px;
  & :last-child {
    margin-top: 20px;
    margin-left: 20px;
    font-size: 28px;
    font-weight: bold;
    padding-bottom: 10px;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  border-radius: 100%;
`;

const LevelTitle = styled.div`
  font-weight: bold;
  padding-bottom: 20px;
`;

const LevelBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  width: 280px;
  height: 40px;
  background-color: #00b031;
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 12px;
  letter-spacing: 1px;
  align-items: center;
  & :first-child {
    font-weight: bold;
  }
  & :last-child {
    font-weight: lighter;
    font-size: 9px;
  }
`;

const MyInfoTitle = styled.div`
  font-weight: bold;
  padding-bottom: 20px;
  margin-top: 20px;
`;

const MyInfoList = styled.div`
  font-size: 12px;
  padding-bottom: 10px;
  line-height: 24px;
  & :first-child {
    cursor: pointer;
  }
`;

const MembershipTitle = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
  margin-top: 20px;
`;

const MembershipList = styled.div`
  font-size: 12px;
  padding-bottom: 10px;
  line-height: 24px;
`;

const MenuTitle = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
  margin-top: 20px;
`;

const MenuList = styled.div`
  font-size: 12px;
  padding-bottom: 10px;
  line-height: 24px;
`;

const MypageContent = styled.div`
  padding-left: 170px;
  padding-top: 100px;
`;

const MypageContentList = styled.div``;

const LikeButton = styled.div``;

const LikeTitle = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 20px;
`;

const PurchaseTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding-top: 60px;
  padding-bottom: 20px;
`;
