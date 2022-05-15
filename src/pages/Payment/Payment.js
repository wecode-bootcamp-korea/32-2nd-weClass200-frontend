import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dialog, DialogContentText } from "@mui/material";
import { PRICE_DATA, PAYMENT_DATA } from "./PaymentData";

const Payment = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleCouponClick = () => {
    setIsOpened(!isOpened);
  };

  const handleBankClick = () => {
    alert("은행 점검시간(07:00 ~ 24:00)에는 이용하실 수 없습니다.");
  };

  const handlePointClick = () => {
    alert("포인트가 없네용~~?");
  };

  return (
    <Body>
      <PaymentWrap>
        <Header>
          <Title fontSize fontWeight>
            결제하기
          </Title>
          <Text fontSize="16px" fontWeight="900" color="#FF7129">
            암호화중
          </Text>
        </Header>

        <SectionWrap>
          <Section height="136px">
            <Title>주문 정보</Title>
            <Text fontSize="14px">
              지기성의 쉽다 리액트 클래스 수강권 (20주)
            </Text>
            <Img src="../images/weclass_logo.png" />
          </Section>

          <Section height="136px">
            <Title>쿠폰</Title>
            <Div>
              <CoupontInput value="0원" />
              <Button
                onClick={handleCouponClick}
                width="80px"
                color="white"
                bgColor="black"
              >
                쿠폰 변경
              </Button>
            </Div>
            <Text color="gray" fontSize="14px">
              적용 쿠폰 [타임딜] 신사임당 클래스 할인
            </Text>
          </Section>
          <Dialog open={isOpened}>
            쿠폰 변경
            <DialogContentText>
              {/* {`[타임딜] ${detail[0]?.product_name}`} */}
              [타임딜] 신사임당 클래스 할인 쿠폰
            </DialogContentText>
          </Dialog>

          <Section height="136px">
            <Title>결제 금액</Title>
            {PRICE_DATA.map(price => {
              return (
                <Div key={price.id}>
                  <Text color="gray" gray fontSize="14px">
                    {price.title}
                  </Text>
                  <Text color="gray">{price.price}</Text>
                </Div>
              );
            })}
          </Section>

          <Section row>
            <Div>
              <Text margin="0 8px 0 0" fontSize="14px" fontWeight="700">
                최종 가격
              </Text>
              <Text color="gray" fontSize="12px">
                무이자 할부 가능
              </Text>
            </Div>
            <Div column>
              <Text margin="0 0 8px 0" color="gray" fontSize="11px">
                5개월 할부 시 월 2000원
              </Text>
              <Title fontSize="16px" fontWeight="700">
                1111원
              </Title>
            </Div>
          </Section>

          <Section>
            <Title>결제 방식</Title>
            <Div marginTop>
              {PAYMENT_DATA.map(payment => {
                return (
                  <Div key={payment.id}>
                    <Button
                      onClick={handleBankClick}
                      border
                      bgColor="white"
                      margin
                      width="288px"
                    >
                      {payment.bank}
                    </Button>
                    <Button
                      onClick={handlePointClick}
                      border
                      bgColor="white"
                      margin
                      width="288px"
                    >
                      {payment.point}
                    </Button>
                  </Div>
                );
              })}
            </Div>
          </Section>
          <Button fontWeight color="white" bgColor="#FF7129">
            결제하기
          </Button>
        </SectionWrap>
      </PaymentWrap>
    </Body>
  );
};

const Body = styled.div`
  background-color: #f8f8f9;
`;
const PaymentWrap = styled.div`
  width: 640px;
  height: 1000px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 100px;
  background-color: white;
`;

const SectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 24px;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 84px;
  padding: 24px;
  color: white;
  background-color: black;
`;

const Section = styled.section`
  width: 100%;
  height: ${props => props.height};
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: space-between;
`;

const Div = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? "column" : "row")};
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => (props.marginTop ? "12px" : "0")};
`;

const Img = styled.img`
  width: 90px;
  height: 72px;
  border: 1px solid black;
`;

const Title = styled.h2`
  font-size: ${props => (props.fontSize ? "26px" : "20px")};
  font-weight: ${props => (props.fontWeight ? "700" : "900")};
`;

const Text = styled.span`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  margin: ${props => props.margin};
`;

const CoupontInput = styled.input`
  width: 500px;
  padding: 13px 16px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: black;
  border: ${border => (border ? "1px solid lightgray" : "none")};
  width: ${props => props.width};
  height: 48px;
  font-size: 14px;
  font-weight: ${props => (props.fontWeight ? "700" : null)};
  margin: ${props => (props.margin ? "0 8px 8px 0" : "0")};
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
`;

export default Payment;
