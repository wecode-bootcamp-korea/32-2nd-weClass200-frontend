import React from "react";
import styled from "styled-components";
import logoImg from "../../assets/images/weclass_logo.png";

function Footer() {
  return (
    <FooterLayout>
      <Wrapper>
        <LogoBox>
          <LogoImg src={logoImg} />
          <LogoText>
            클래스200은 모든 사람이 사랑하는 일을 하며 <br />살 수 있도록 세상을
            바꾸고자 합니다.
          </LogoText>
        </LogoBox>

        <FooterClass>
          <p>클래스</p> <p>홈</p> <p>기업교육</p> <p>채용</p> <p>도움말</p>
        </FooterClass>

        <FooterCreate>
          <p>크리에이터</p> <p>크리에이터센터</p> <p>정규 클래스 지원하기</p>
          <p>도움말</p>
        </FooterCreate>

        <FooterInformationCenter>
          <p>고객센터</p>
          <button>문의하기</button>
          <p>오전 10시 ~ 오후 6시 (주말, 공휴일 제외)</p>
        </FooterInformationCenter>
      </Wrapper>

      <ChannelWrapper>
        <ChannelLink>
          <p>
            CLASS101 - KoreaCLASS101 USA - CLASS101 Japan <br />- Instagram -
            Youtube - Facebook - Naverpost
            <br /> - Naverblog - Playstore - Appstore
          </p>
        </ChannelLink>

        <FooterList>
          <FooterClause>
            <p>
              이용약관 - 개인정보 처리방침 - 정기구독서비스이용약관 - 200프라임
              이용약관 - 기프트카드 및 캐시 이용약관 - 환불 정책 - 사업자 정보
            </p>
            <p>
              확인 - 단체/기업 교육 문의 - 제휴/협력 문의 - PR 관련 문의 -
              지식재산권 침해 신고 센터
            </p>
          </FooterClause>

          <FooterAddress>
            <p>
              주식회사 클래스101 | 대표 황석영 | 서울특별시 강남구 테헤란로 462,
              10층(역삼동, 위워크타워) | ask@101.inc | 전화번호: 1800-2109 |
              클라우드 호스팅: Amazon Web Services Korea LLC
            </p>
            <p>
              사업자등록번호 : 457-81-00277 | 통신판매업신고 :
              2022-서울강남-02525 | 클래스 200은 통신판매중개자로서 중개하는
              거래에 대하여 책임을 부담하지 않습니다.
            </p>
          </FooterAddress>
        </FooterList>
      </ChannelWrapper>
    </FooterLayout>
  );
}

export default Footer;

const FooterLayout = styled.div`
  /* position: fixed; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 1176px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  padding-right: 170px;
  /* justify-content: space-between; */
`;

const LogoBox = styled.div`
  padding-right: 30px;
`;

const LogoImg = styled.img`
  height: 24px;
`;

const LogoText = styled.div`
  font-size: 12px;
  margin-top: 19px;
  line-height: 18px;
  color: black;
`;

const ChannelLink = styled.div`
  font-size: 10px;
  color: gray;
  /* padding-left: 240px; */
  line-height: 18px;
`;

const FooterClass = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: lighter;
  line-height: 30px;

  & :first-child {
    font-weight: bold;
  }
`;

const FooterCreate = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: lighter;
  line-height: 30px;
  padding-left: 70px;

  & :first-child {
    font-weight: bold;
  }
`;

const FooterInformationCenter = styled.div`
  font-weight: bold;
  font-size: 12px;
  font-weight: lighter;
  line-height: 30px;
  padding-left: 30px;
  & :first-child {
    font-weight: bold;
  }
  & :nth-child(2) {
    width: 195px;
    padding: 7px;
    padding-left: 70px;
    border: none;
    color: black;
    font-size: 12px;
    font-weight: bold;
  }
`;

const ChannelWrapper = styled.div`
  display: flex;
  padding-top: 100px;
`;

const FooterList = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  padding-left: 100px;
`;

const FooterClause = styled.div`
  font-size: 8px;
  color: gray;
  padding-bottom: 10px;
  &: first-child {
    line-height: 16px;
  }
`;

const FooterAddress = styled.div`
  font-size: 8px;
  color: gray;
  line-height: 16px;
`;
